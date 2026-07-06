import HeroParallax from '@/components/about/HeroParallax'
import AboutUs from '@/components/about/AboutUs'
import OurValues from '@/components/about/OurValues'
import AboutCTA from '@/components/about/AboutCTA'

export default function About() {
    return (
        <main aria-label="the about page">
            <HeroParallax />
            <AboutUs />
            <OurValues />
            <AboutCTA />
        </main>
    )
}