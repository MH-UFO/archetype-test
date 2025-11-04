import { useMemo, useRef, useEffect, useState } from 'react';
import StarryBackground from './StarryBackground';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Results.css';

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Result({ answers = [], gender }) {
  const ENGLISH_CATEGORIES = ['dominance', 'strategy', 'creativity', 'independence', 'emotion', 'cunning', 'depth'];
  const PERSIAN_CATEGORIES = ['تسلط', 'استراتژی', 'خلاقیت', 'استقلال', 'احساسات', 'زیرکی', 'عمق'];
  const CATEGORIES = PERSIAN_CATEGORIES;

  const PERSIAN_TO_ENGLISH_CATEGORY_MAP = {
    'تسلط': 'dominance',
    'استراتژی': 'strategy',
    'خلاقیت': 'creativity',
    'استقلال': 'independence',
    'احساسات': 'emotion',
    'زیرکی': 'cunning',
    'عمق': 'depth',
  };

  const GODS = [
    {
      name: 'زئوس',
      englishName: 'Zeus',
      gender: 'male',
      scores: { dominance: 20, strategy: 12, creativity: 8, independence: 10, emotion: 15, cunning: 5, depth: -5 },
    },
    {
      name: 'آپولو',
      englishName: 'Apollo',
      gender: 'male',
      scores: { dominance: 5, strategy: 10, creativity: 20, independence: 12, emotion: 8, cunning: -10, depth: 10 },
    },
    {
      name: 'آرس',
      englishName: 'Ares',
      gender: 'male',
      scores: { dominance: 18, strategy: -5, creativity: -15, independence: 8, emotion: 20, cunning: -8, depth: -10 },
    },
    {
      name: 'هرمس',
      englishName: 'Hermes',
      gender: 'male',
      scores: { dominance: -5, strategy: 15, creativity: 12, independence: 18, emotion: -5, cunning: 20, depth: 5 },
    },
    {
      name: 'آتنا',
      englishName: 'Athena',
      gender: 'female',
      scores: { dominance: 12, strategy: 20, creativity: 15, independence: 10, emotion: -10, cunning: 8, depth: 12 },
    },
    {
      name: 'آفرودیت',
      englishName: 'Aphrodite',
      gender: 'female',
      scores: { dominance: -8, strategy: 5, creativity: 18, independence: -5, emotion: 20, cunning: 15, depth: 8 },
    },
    {
      name: 'آرتمیس',
      englishName: 'Artemis',
      gender: 'female',
      scores: { dominance: 8, strategy: 10, creativity: 5, independence: 20, emotion: -15, cunning: 12, depth: 15 },
    },
    {
      name: 'پرسفونه',
      englishName: 'Persephone',
      gender: 'female',
      scores: { dominance: -10, strategy: 8, creativity: 10, independence: -12, emotion: 12, cunning: -5, depth: 20 },
    },
  ];

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const normalize01 = (arr, min = -2, max = 2) => {
    const range = max - min || 1;
    return arr.map(v => (v - min) / range);
  };
  const zScore = (arr) => {
    const mean = arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
    const variance = arr.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (arr.length || 1);
    const std = Math.sqrt(Math.max(variance, 1e-8));
    return arr.map(v => (v - mean) / std);
  };
  const cosineSimilarity = (a, b) => {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    const denom = Math.sqrt(na) * Math.sqrt(nb) || 1e-8;
    return dot / denom;
  };

  const userCategoryAverages = useMemo(() => {
    const sums = Object.fromEntries(ENGLISH_CATEGORIES.map(c => [c, 0]));
    const counts = Object.fromEntries(ENGLISH_CATEGORIES.map(c => [c, 0]));
    for (const item of answers) {
      if (!item) continue;
      const persianCat = String(item.answer_category || '').trim();
      const cat = PERSIAN_TO_ENGLISH_CATEGORY_MAP[persianCat];
      const val = Number(item.answer);
      if (!Number.isFinite(val)) continue;
      if (cat && ENGLISH_CATEGORIES.includes(cat)) {
        sums[cat] += clamp(val, -2, 2);
        counts[cat] += 1;
      }
    }
    return ENGLISH_CATEGORIES.map(c => (counts[c] ? sums[c] / counts[c] : 0));
  }, [answers]);

  const godProfiles = useMemo(() => {
    const pool = gender ? GODS.filter(g => g.gender === gender) : GODS;
    return pool.map(g => ({
      ...g,
      vec: ENGLISH_CATEGORIES.map(c => (Number(g.scores[c]) || 0) / 10),
    }));
  }, [gender]);

  const ranking = useMemo(() => {
    if (!userCategoryAverages.length || !godProfiles.length) return [];
    const userZ = zScore(userCategoryAverages);
    const results = godProfiles.map(g => {
      const gZ = zScore(g.vec);
      const sim = cosineSimilarity(userZ, gZ); // -1..1
      return { name: g.name, gender: g.gender, sim, vec: g.vec };
    });
    results.sort((a, b) => b.sim - a.sim);
    return results;
  }, [userCategoryAverages, godProfiles]);

  const top = ranking[0];

  const userPlot = useMemo(() => normalize01(userCategoryAverages, -2, 2), [userCategoryAverages]);
  const topGodPlot = useMemo(() => (top ? normalize01(top.vec, -2, 2) : []), [top]);
  const similarityPercent = top ? Math.round(((top.sim + 1) / 2) * 100) : 0;

  const COLORS = {
    user: '#63b3ed',
    god: 'var(--secondary-accent-color)',
    textMuted: 'var(--primary-text-color-transparent)',
    border: 'rgba(255, 255, 255, 0.2)',
  };
  const navigate = useNavigate();

  function handleLinkClick(targetPath) {
    return (e) => {
      e.preventDefault();
      if (window.confirm('آیا مطمئنید که میخواهید خارج شوید؟')) {
        navigate(targetPath);
      }
    };
  }

  return (
    <div className="results-page">
      <Link onClick={handleLinkClick('/')} className="btn btn-danger leave-exam-button" to="/">خروج</Link>
      <StarryBackground />
      {!answers || answers.length === 0 ? (
        <p className="no-answers-message">لطفا برای شناختن کهن الگوی خود اول به سوالات پاسخ</p>
      ) : !top ? (
        <p className="loading-message"> ...در حال محاسبه نتیجه</p>
      ) : (
        <>
          <div className="page-heading">
            <h3>
              شما بیشترین شباهت را به {top.name} {top.gender ? `(${capitalize(top.gender === 'male' ? 'مرد' : 'زن')})` : ''} دارید
            </h3>
            <p>{similarityPercent}% شباهت</p>
          </div>

          <div className="card">
            <div style={{ padding: 16 }}>
              <RadarChart
                categories={CATEGORIES.map(capitalize)}
                series={[
                  {
                    id: 'you',
                    label: 'شما',
                    values: userPlot,
                    color: COLORS.user,
                  },
                  {
                    id: 'god',
                    label: top.name,
                    values: topGodPlot,
                    color: COLORS.god,
                  },
                ]}
                levels={5}
                borderColor={COLORS.border}
                textColor={COLORS.textMuted}
              />
            </div>
          </div>
          <div className='link-to-gods'><Link to="/guid" onClick={handleLinkClick('/guid')}>راهنمای خدایان</Link></div>


          <div className="comparison-table-container">
            <SmallComparisonTable
              categories={CATEGORIES}
              user={userCategoryAverages}
              god={top.vec}
              textColor={COLORS.textMuted}
              borderColor={COLORS.border}
            />
          </div>
        </>
      )}
    </div>
  );
}

function RadarChart({ categories, series, levels = 5, borderColor = '#e5e7eb', textColor = '#6b7280' }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState(400);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const RO = window.ResizeObserver || null;
    if (!RO) return;
    const ro = new RO(entries => {
      const cr = entries[0].contentRect;
      const s = Math.floor(Math.min(cr.width, 640));
      setSize(Math.max(260, s));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const W = size;
  const H = size;
  const cx = W / 2;
  const cy = H / 2;
  const pad = 90;
  const R = Math.min(cx, cy) - pad;
  const N = categories.length;

  const angleFor = i => (-Math.PI / 2) + (i * 2 * Math.PI / N);
  const pointFor = (i, t) => {
    const a = angleFor(i);
    const r = t * R;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const grid = Array.from({ length: levels }, (_, k) => {
    const t = (k + 1) / levels;
    const pts = categories.map((_, i) => pointFor(i, t));
    const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z';
    return <path key={`g-${k}`} d={d} fill="none" stroke={borderColor} opacity="0.7" />;
  });

  const axes = categories.map((label, i) => {
    const [x, y] = pointFor(i, 1);
    const lx = cx + (x - cx) * 1.1;
    const ly = cy + (y - cy) * 1.1;
    const anchor = Math.abs(lx - cx) < 4 ? 'middle' : (lx < cx ? 'end' : 'start');
    return (
      <g key={`axis-${i}`}>
        <line x1={cx} y1={cy} x2={x} y2={y} stroke={borderColor} opacity="0.8" />
        <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" style={{ fontSize: 12, fill: textColor }}>
          {label}
        </text>
      </g>
    );
  });

  const polygonPath = values => {
    const d = values
      .map((v, i) => pointFor(i, v))
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`)
      .join(' ') + ' Z';
    return d;
  };

  return (
    <figure ref={containerRef} style={{ width: '100%' }} aria-label="Archetype similarity radar chart">
      <svg width={W} height={H} role="img">
        <g>
          {grid}
          {axes}
          {series.map(s => (
            <g key={s.id}>
              <path
                d={polygonPath(s.values)}
                fill={s.color}
                fillOpacity={0.15}
                stroke={s.color}
                strokeWidth={2}
                opacity={0.95}
              />
              {s.values.map((v, i) => {
                const [x, y] = pointFor(i, v);
                return <circle key={`${s.id}-${i}`} cx={x} cy={y} r="2.8" fill={s.color} />;
              })}
            </g>
          ))}
        </g>
      </svg>
      <figcaption style={{ marginTop: 8, display: 'flex', gap: 12, flexWrap: 'wrap', color: textColor }}>
        {series.map(s => (
          <span key={`legend-${s.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, background: s.color, borderRadius: 3, display: 'inline-block' }} />
            <span style={{ fontSize: 12 }}>{s.label}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function SmallComparisonTable({ categories, user, god }) {
  const toFixed = (n) => (Math.round(n * 100) / 100).toFixed(2);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="comparison-table">
        <thead>
          <tr>
            <th></th>
            <th>شما (میانگین)</th>
            <th>کهن الگو (مقیاس)</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c}>
              <th>{c}</th>
              <td>{toFixed(user[i])}/2</td>
              <td>{toFixed(god[i])}/2</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
