
import '../styles/StarryBackground.css';

const StarryBackground = () => {
  const stars = Array.from({ length: 150 }).map((_, i) => {
    const style = {
      width: `${Math.random() * 2 + 1}px`,
      height: 'auto',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      aspectRatio: '1/1'
    };
    return <div key={i} className="star" style={style} />;
  });

  return <div className="starry-background">{stars}</div>;
};

export default StarryBackground;
