const VALUES = [
  {
    id: 'simplicity',
    title: 'Simplicity in the kitchen',
    body: 'A recipe should feel like a friend explaining something to you, not a textbook testing your patience. Every recipe on PlateMate is written to be followed by a real person in a real kitchen with real time constraints.',
  },
  {
    id: 'authentic',
    title: 'Authentic over aesthetic',
    body: 'We are not here to make food look unreachable. Imperfect food that tastes incredible will always win over something beautiful that nobody actually knows how to make.',
  },
  {
    id: 'connection',
    title: 'Cooking as connection',
    body: "Food has always been how people show up for each other. A pot of soup dropped at a neighbor's door. A birthday cake made from scratch. A late night meal shared with someone you love. That is what we are really about.",
  },
]

function OurValues() {
  return (
    <section className='w-full px-6 sm:px-10 md:px-28 lg:px-40 pt-4 pb-16 md:pb-24 lg:pb-32'>
      <h2
        className='font-roboto-serif text-gray-900 mb-5'
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
      >
        Our Values
      </h2>

      <dl>
        {VALUES.map((value) => (
          <div key={value.id}>
            {/* top divider */}
            <div className='border-t border-gray-200' aria-hidden="true"/>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-12 py-8'>

              {/* title */}
              <dt
                className='font-roboto font-semibold sm:w-[28%] shrink-0'
                style={{ fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)'}}  
              >
                {value.title}
              </dt>

              {/* description */}
              <dd
                className='font-roboto text-gray-700 leading-relaxed flex-1'
                style={{ fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)' }}  
              >
                {value.body}
              </dd>

            </div>
          </div>
        ))}

        {/* btm divider after last item */}
        <div className='border-t border-gray-200' aria-hidden="true" />
      </dl>
    </section>
  )
}

export default OurValues;