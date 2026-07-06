import Button from '@/components/Button'

import ctaBg from '@/assets/about-cta.jpg'

function AboutCTA() {
  return (
    <section className='relative w-full overflow-hidden'>
      <img src={ctaBg} aria-hidden="true" className='absolute inset-0 w-full h-full object-cover object-center select-none'/>

      <div className='relative z-10 px-6 sm:px-10 md:px-28 lg:px-40 py-24 md:py-36'>
        <h2
          className='font-roboto-serif mb-6'
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', letterSpacing: '-0.02em' }}
        >
          The kitchen is waiting.
        </h2>

        <Button to="/recipe">Browse Recipes</Button>
      </div>
    </section>
  )
}

export default AboutCTA;