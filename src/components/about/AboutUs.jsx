import cookingImg from '@/assets/about-about.avif'

const CONFIG = {
    heading: { fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', letterSpacing: '-0.02em' },
    body: { fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)' },
    image: { aspectRatio: '4 / 5' },
}

function AboutUs() {
    return (
        <section className="w-full py-16 md:py-24 lg:py-32">
            <div className="flex flex-col-reverse md:flex-row md:items-center w-full gap-10 md:gap-0">

                {/* text block */}
                <div className="flex-1 px-6 sm:px-10 md:px-16 lg:px-28 xl:px-40">
                    <h2 className="font-roboto-serif mb-5"
                        style={{ fontSize: CONFIG.heading.fontSize, letterSpacing: CONFIG.heading.letterSpacing }}
                    >
                        About Us
                    </h2>
                    <p
                        className="font-roboto text-gray-800 leading-relaxed"
                        style={{ fontSize: CONFIG.body.fontSize, maxWidth: '55ch' }}
                    >
                        PlateMate is a community recipe book where anyone can contribute to
                        and enjoy. Whether you are a seasoned home cook or someone who
                        recently figured out how to boil water without burning it, this is
                        your space. You can browse recipes by category or ingredient, save
                        the ones you want to come back to, and upload your own when you make
                        something worth remembering. Our focus has always been the food and
                        the people behind it.
                    </p>
                </div>

                
                <div className="flex-none w-full md:w-[45%] lg:w-[40%] px-6 sm:px-10 md:pl-0 md:pr-14 lg:pr-20">
                    <div
                        className="w-full overflow-hidden"
                        style={{
                            aspectRatio: CONFIG.image.aspectRatio,
                            maxHeight: '35vw', 
                        }}
                    >
                        <img
                            src={cookingImg}
                            alt="A cook preparing a pasta dish."
                            className="w-full h-full object-cover object-center block"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default AboutUs