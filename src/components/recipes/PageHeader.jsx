function PageHeader() {
    return(
        <section className="w-full px-2 sm:px-10 md:px-2 lg:px-2 pt-4 pb-16 md:pb-24 lg:pb-32">
            <h2
                className="font-roboto-serif text-primary-green font-bold mb-5 mt-10"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
            >
                Main Dishes
            </h2>
            <p 
                className="font-roboto text-gray-700 leading-relaxed"
                style={{fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)', maxWidth: '55ch'}}
            >
                Discover hearty, satisfying main courses that bring everyone to the table. From quick 
                weeknight dinners to weekend feasts.

            </p>

        </section>
    )
}

export default PageHeader;