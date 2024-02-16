import cleanhero from '../assets/cleanhero.webp'
import './Hero.css'

export function Hero() {
    return (
        <section className="Hero">
            <img className="hero-image" src={cleanhero} alt="clean hero"></img>
        </section>
    )
}
