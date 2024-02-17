import cleanhero from '../assets/cleanhero.webp';
import smallhero from '../assets/smallhero.webp';
import './Hero.css';

export function Hero() {
  return (
    <section className="Hero">
      <picture>
        <source 
          media="(min-width: 1020px)"
          srcSet={cleanhero} 
        />
        <img 
          srcSet={smallhero}
          alt="hero image"
        />
      </picture>
    </section>
  )
}

