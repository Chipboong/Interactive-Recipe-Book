import {useRecipes} from '@/context/RecipeContext'
import { createContext } from 'react'
import {Link} from "react-router"

import RecipeCard from './RecipeCard'

function RecipeGrid() {
    const {filteredRecipes, favorites, toggleFavorite} = useRecipes()
    
    if (filteredRecipes.length === 0) {
        return(
            <section className='w-full px-6 sm:px-10 md:px-28 lg:px-40 pb-16' aria-label='Recipe results'>
                <p className='font-roboto text-gray-400 text-center' style={{padding: '4rem 0', fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)'}}>
                    No recipes found.
                </p>

            </section>
        )
    }

    return(
        <section className="w-full px-6 sm:px-10 md:px-28 lg:px-40 pb-16 md:pb-24" aria-label='Recipe results'>
            <ol style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
                gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}
                aria-label={`${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? 's' : ''} found`}
            >
                {filteredRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                        <RecipeCard recipe={recipe} 
                                    isFavorited={favorites.includes(recipe.id)}
                                    onFavoriteToggle={toggleFavorite}
                        />
                        </Link>
                    </li>
                ))}
            </ol>

        </section>
    )

}

export default RecipeGrid;