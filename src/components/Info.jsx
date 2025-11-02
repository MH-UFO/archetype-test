import React from 'react';
import StarryBackground from './StarryBackground';
import Header from './header';
import'../styles/Info.css';

const pageData = {
  title: "راهنمای کهن‌الگوها",
  intro: "کهن‌الگوها الگوهای جهانی انرژی و رفتار هستند که در ناخودآگاه جمعی همه‌ی ما وجود دارند. این الگوها آنقدر بنیادین هستند که در طول تاریخ، فرهنگ‌های مختلف برای درک آن‌ها، شخصیت‌های اساطیری را خلق کرده‌اند. در این راهنما، ما از نام خدایان و الهه‌های یونان نه به عنوان باورهای مذهبی، بلکه به عنوان **نمادهای قدرتمند** برای درک عمیق‌تر این نیروهای روانشناختی استفاده می‌کنیم.",
  feminineTitle: "کهن‌الگوهای کلیدی زنانه",
  masculineTitle: "کهن‌الگوهای کلیدی مردانه",
};

const femaleArchetypes = [
  { name: "آتنا", title: "کهن‌الگوی فرزانه/استراتژیست", motto: "حقیقت، شما را آزاد خواهد کرد.", description: "نماد خرد، منطق، استراتژی و دانش. این کهن‌الگو به دنبال درک جهان از طریق تحلیل و تفکر است. او با مهارت و برنامه‌ریزی به اهداف خود می‌رسد و تحت تأثیر احساسات آنی قرار نمی‌گیرد." },
  { name: "آفرودیت", title: "کهن‌الگوی معشوق", motto: "من عشق می‌ورزم و عشق را جذب می‌کنم.", description: "مظهر عشق، زیبایی، خلاقیت و لذت‌های حسی. این کهن‌الگو به دنبال ایجاد رابطه، تجربه زیبایی و لذت بردن از زندگی است. انرژی او دیگران را به خود جذب می‌کند." },
  { name: "آرتمیس", title: "کهن‌الگوی مستقل/شکارچی", motto: "من روی اهدافم متمرکز هستم.", description: "نماد استقلال، تمرکز و رقابت. او یک زن هدف‌گراست که در طبیعت و دنیای خود احساس راحتی می‌کند. به دنبال دستیابی به اهداف خود است و برای موفقیت به دیگران وابسته نیست." },
  { name: "پرسفون", title: "کهن‌الگوی دوشیزه/شهودی", motto: "من پذیرای دنیای درون هستم.", description: "نماد جوانی، پذیرندگی و ارتباط با دنیای ناخودآگاه و شهود. او توانایی درک عوالم پنهان را دارد و اغلب سفری از معصومیت به سوی خرد عمیق‌تر را تجربه می‌کند." },
];

const maleArchetypes = [
  { name: "زئوس", title: "کهن‌الگوی حاکم/پادشاه", motto: "من قلمرو خود را می‌سازم.", description: "نماد قدرت، رهبری، اقتدار و نظم. به دنبال ساختن امپراطوری و برقراری قانون است. او یک استراتژیست بزرگ است که می‌تواند یک چشم‌انداز را به واقعیت تبدیل کند." },
  { name: "آپولو", title: "کهن‌الگوی خردمند/قانون‌گذار", motto: "نظم و شفافیت، راه رسیدن به کمال است.", description: "مظهر منطق، قانون، شفافیت و کمال. او به دنبال دانش، حقیقت و نظم در همه چیز است. هنر و موسیقی برای او ابزاری برای ایجاد هماهنگی در جهان است." },
  { name: "آرس", title: "کهن‌الگوی جنگجو", motto: "من برای چیزی که به آن باور دارم، می‌جنگم.", description: "نماد انرژی خالص، عمل‌گرایی، شجاعت و جسارت. او بدون تردید وارد عمل می‌شود و از رویارویی نمی‌ترسد. انرژی او برای دفاع از مرزها و دستیابی به اهداف ضروری است." },
  { name: "هرمس", title: "کهن‌الگوی پیام‌رسان/دلقک", motto: "ارتباط، کلید همه چیز است.", description: "مظهر ارتباطات، هوش، سرعت و سازگاری. او مرزها را درمی‌نوردد، پیام‌ها را جابجا می‌کند و می‌تواند با همه ارتباط برقرار کند. ذهن سریع و شوخ‌طبعی او به او اجازه می‌دهد تا از موقعیت‌های دشوار عبور کند." },
];

const ArchetypeCard = ({ name, title, motto, description }) => {
  return (
    <div className="archetype-card">
      <h3>{name}</h3>
      <p className="card-title">{title}</p>
      <span className="card-motto">"{motto}"</span>
      <p className="card-description">{description}</p>
    </div>
  );
};

const GuidePage = () => {
  return (
    <div className="guide-page">
      <div className="guide-content">
      <Header />
        <div className='stars'>
          <StarryBackground />
        </div>
        <h1>{pageData.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: pageData.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

        <h2>{pageData.feminineTitle}</h2>
        <div className="archetype-grid">
          {femaleArchetypes.map(archetype => (
            <ArchetypeCard key={archetype.name} {...archetype} />
          ))}
        </div>

        <h2>{pageData.masculineTitle}</h2>
        <div className="archetype-grid">
          {maleArchetypes.map(archetype => (
            <ArchetypeCard key={archetype.name} {...archetype} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;