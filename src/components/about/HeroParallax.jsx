import { Link } from 'react-router'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'

import Button from '@/components/Button'
import heroImage from '@/assets/about-hero.jpg'
// import heroImage from '@/assets/about-hero-2.jpg'

const CONFIG = {
  image: { alt: '', objectPosition: 'center center' },
  sectionHeightVh: 160,
  imageHeightPercent: 130, 
  parallaxRange: 0.25,
  beats: [
    { id: 'beat-hero', topVh: -30, title: null, heading: ['Good food, Good life.'], body: null, align: 'left'},
    { id: 'beat-manifesto', topVh: 32, title: 'Manifesto', heading: null,
      body: [
        "We believe cooking shouldn’t be a stressful chore or a pursuit of picture-perfect perfection. It’s a chance to slow down, make something tasty, and bring people together. Good food is great, but sharing it with the people you love is everything.",
        "PlateMate is where craving meets company. We strip away the kitchen snobbery to deliver foolproof, flavor-packed recipes designed for real life, real budgets, and real kitchens.",
      ],
      align: 'right',                   
    },
  ],
  lenis: { duration: 1.2, smoothWheel: true },
}

function HeroParallax() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis(CONFIG.lenis)
    let frameId

    function raf(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  const { scrollYProgress } = useScroll({target: sectionRef, offset: ['start start', 'end end'],})

  // one continuous img. translate, like drifting upwards as user scrolls down
  const y = useTransform(
    scrollYProgress, [0,1], ['0%', `-${CONFIG.parallaxRange * 100}%`]
  )


  return (
    <article>
      <section
        ref={sectionRef} className='hero-parallax-section relative overflow-hidden'
        style={{ height: `${CONFIG.sectionHeightVh}vh` }}
        aria-label="PlateMate Manifesto"
        
      >
        {/* bg image, full bleed*/}
        <motion.div style={{ y, height: `${CONFIG.imageHeightPercent}%` }} className='absolute inset-x-0 top-0 w-full' aria-hidden="true">
          <img
            src={heroImage}
            alt={CONFIG.image.alt}
            className='h-full w-full object-cover select-none'
            // loading='eager'
            // fetchPriority='high'
            style={{ objectPosition: CONFIG.image.objectPosition }}
          />
        </motion.div>

        {/*overlay since we're using img with white bg */}
        <div
          className='pointer-events-none absolute inset-0'
          style={{background: 'linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.6) 100%, rgba(255,255,255,0.45) 100%)'}}
          aria-hidden="true"
        />

        {CONFIG.beats.map((beat) => (
          <div
            key={beat.id}
            className='absolute left-0 flex h-screen w-full flex-col justify-center px-6 sm:px-10 md:px-[6vw]'
            style={{ top: `${beat.topVh}vh` }}
          >
            {/* inner wrapper */}
            <div className={beat.align === 'right' ? 'ml-auto' : ''} style={{ maxWidth: beat.body ? 'clamp(40ch, 36vw, 55ch)' : 'none' }}>

              {beat.title && (
                <p className='font-roboto-serif'
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                  {beat.title}
                </p>
              )}

              {beat.heading && (
                <h1 className='font-roboto-serif leading-[1.05]'
                  style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}>
                  {beat.heading.map((line, i) => (
                    <span key={i}>{line}</span>   
                  ))}
                </h1>
              )}

              {beat.body && (
                <div className='beat-body space-y-4' style={{ paddingTop: '1rem' }}>
                  {beat.body.map((para, i) => (
                    <p key={i} className='font-roboto leading-relaxed text-gray-800'
                      style={{ fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)' }}>
                      {para}
                    </p>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}

        <div
          className='story-cta-section absolute bottom-[15vh] left-0 px-6 sm:px-10 md:px-[6vw]'
          aria-label="Share your recipe"
        >
          <p
            className='font-roboto-serif'
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', letterSpacing: '-0.02em', textAlign: 'left', paddingBottom: '1rem'}}>
            Every recipe has a story. What’s yours?
          </p>

          <div className='text-left'>
            {/* <Link
              to="/" // LETS NOT FORGET HERE
              className='bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
            >
              Add Recipes
            </Link> */}
            <Button to="/">Add Recipes</Button> 
          </div>
        </div>
      </section>
    </article>
  )
}

export default HeroParallax