import { useState, useRef, useEffect } from 'react'
import { useRecipes } from '@/context/RecipeContext'

function ChevronIcon({ open }) {
    return (
        <svg
            viewBox="0 0 20 20" fill="currentColor"
            style={{
                width: '1rem', height: '1rem', flexShrink: 0,
                transform: open ? 'rotate(180deg)':'rotate(0deg)',
                transition:'transform 0.2s ease',
            }}
            aria-hidden="true"
        >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
    )
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 20 20" fill="currentColor"
            style={{ width: '1rem',height: '1rem', flexShrink: 0 }}
            aria-hidden="true"
        >
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
    )
}

function Dropdown({ label, options, selected, onSelect }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    // close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleSelect(option) {
        onSelect(option)
        setOpen(false) // auto-close on selection
    }

    const displayLabel = selected || label

    return (
        <div ref={ref} style={{ position: 'relative', display: 'inline-block'}}>
            {/* trigger btn */}
            <button
                onClick={() => setOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="font-roboto text-gray-700 bg-white border border-gray-200 rounded-full hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.45rem 1rem',
                    fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)',
                    fontWeight: selected ? '600' : '400',
                    color: selected ? '#1B6D33' : undefined,
                    transition: 'border-color 0.2s ease',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                }}
            >
                {displayLabel}
                <ChevronIcon open={open} />
            </button>

            {/* dropdown panel */}
            {open && (
                <ul
                    role="listbox"
                    aria-label={label}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.4rem)',
                        left: 0,
                        zIndex: 50,
                        minWidth: '11rem',
                        maxHeight: '16rem', // is this too long?
                        overflowY: 'auto',
                        padding: '0.15rem 0',
                    }}
                >
                    {/* clear selection */}
                    <li
                        role="option"
                        aria-selected={!selected}
                        onClick={() => handleSelect(null)}
                        className="font-roboto text-gray-400 hover:bg-gray-50"
                        style={{padding: '0.5rem 1rem', fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)', cursor: 'pointer'}}
                    >
                        Clear filter
                    </li>

                    {options.map((option) => {
                        const isSelected = selected === option
                        return (
                            <li
                                key={option}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleSelect(option)}
                                className="font-roboto hover:bg-green-50 hover:text-green-800"
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)',
                                    cursor: 'pointer',
                                    fontWeight: isSelected ? '600' : '400',
                                    color: isSelected ? '#1B6D33' : '#374151',
                                    backgroundColor: isSelected ? '#f0fdf4' : undefined,
                                }}
                            >
                                {option}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

function FilterBar() {
    // from context
    const {ingredients, 
        selectedCategory, handleCategoryChange, 
        selectedIngredient, setSelectedIngredient,
        searchQuery, setSearchQuery,
        showFavorites, setShowFavorites,
        favorites} = useRecipes()

    return (
        <section className="w-full px-6 sm:px-10 md:px-28 lg:px-40 pb-8" aria-label="Recipe filters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>

                {/* category*/}
                <Dropdown label="Category Filter" options={['All', 'Breakfast', 'Main Dishes', 'Dessert', 'Snack']} selected={selectedCategory} onSelect={handleCategoryChange}/>

                {/* ingredient*/}
                <Dropdown label="Ingredient Filter" options={ingredients} selected={selectedIngredient} onSelect={setSelectedIngredient}/>

                {/* search input */}
                <label
                    className="bg-white border border-gray-200 rounded-full hover:border-gray-400 focus-within:ring-2 focus-within:ring-green-700"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', transition: 'border-color 0.2s ease',
                            cursor: 'text',}}
                >
                    <SearchIcon />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search recipes..."
                        className="font-roboto text-gray-700 bg-transparent focus:outline-none"
                        style={{fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)', width: 'clamp(6rem, 20vw, 10rem)', border: 'none'}}
                        aria-label="Search recipes by title"
                    />
                </label>

                {/* favorites */}
                <button
                    onClick={() => setShowFavorites(prev => !prev)}
                    aria-pressed={showFavorites}
                    aria-label="Show favorites only"
                    className="font-roboto rounded-full border focus:outline-none focus:ring-red-300"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.45rem',
                        padding: '0.45rem 1rem',
                        fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)',
                        fontWeight: showFavorites ? '600' : '400',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                        borderColor: showFavorites ? 'red' : '#e5e7eb',
                        color: showFavorites ? 'white' : '#374151',
                        background: showFavorites ? 'red': 'transparent'
                    }}
                >
                    {/* heart icon */}
                    <svg viewBox="0 0 20 20" aria-hidden="true"
                        fill={showFavorites ? 'white' : 'none'}
                        stroke={showFavorites ? 'red' : 'grey'}
                        strokeWidth="1.5"
                        style={{ width: '1rem', height: '1rem', flexShrink: 0, transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    Favorites ({favorites.length})
                </button>

            </div>
        </section>
    )
}

export default FilterBar;