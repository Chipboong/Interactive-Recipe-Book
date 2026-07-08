function PageHeader() {
    return(
        <section className="w-full px-6 sm:px-10 md:px-28 lg:px-40 pt-4 pb-6 md:pb-9 lg:pb-12">
            <h2
                className="font-roboto-serif text-primary-green mb-5 mt-10"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
            >
                Discover Recipes that Interest You
            </h2>
            <p 
                className="font-roboto text-gray-700 leading-relaxed"
                style={{fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)', maxWidth: '55ch'}}
            >
                Discover hearty, satisfying main dishes that bring everyone to the table. From quick 
                weeknight dinners to weekend feasts.

            </p>

        </section>
    )
}

export default PageHeader;