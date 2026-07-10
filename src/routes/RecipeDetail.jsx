import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useRecipes } from '@/context/RecipeContext';
import { useNavigate, Navigate } from "react-router";

function HeartIcon({filled}) {
    return(
        <svg viewBox="0 0 20 20" aria-hidden="true"
                        fill={filled ? 'red' : 'none'}
                        stroke={filled ? 'red' : 'grey'}
                        strokeWidth="1.5"
                        style={{ width: '1rem', height: '1rem', flexShrink: 0, transition: 'fill 0.2s ease, stroke 0.2s ease' }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
    )
}

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes,favorites,toggleFavorite} = useRecipes();
  const navigate = useNavigate();

  const isFavorited = favorites.includes(id);
  const data = recipes.find((recipe) => recipe.id === id);
  if (!data) return <Navigate to="*" replace />

  function handleFavoriteClick(e) {
        e.stopPropagation()
        e.preventDefault()
        toggleFavorite(id)
  }

  useEffect(() => {
    function handleKeyDown(e) { if (e.key === 'Escape') navigate('/recipes')}
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  

  return (
    <div className="min-h-screen bg-gray-50 font-roboto pb-20">
      
      {/* --- Hero Image Section --- */}
      <div className="relative w-full h-80 sm:h-96 md:h-[400px]">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Top Navigation Bar (Overlaid) */}
        <div className="absolute top-0 w-full p-4 sm:p-6 flex justify-between items-center z-10">
          {/* Back Button */}
          <button 
            type="button"
            aria-label="Go back"
            title='Go back (Esc key)'
            className="bg-white/90 hover:bg-white backdrop-blur-sm p-2.5 rounded-full shadow-sm transition-transform active:scale-95"
            style={{border: 'none', cursor: 'pointer'}}
            onClick={() => navigate('/recipes')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Favorite Button */}
          <button onClick={handleFavoriteClick}
                        aria-label={isFavorited ? `Remove ${data.title} from favorites` : `Add ${data.title} to favorites`}
                        aria-pressed={isFavorited}
                        className="rounded-full flex items-center justify-center hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                        style={{ width: '2rem', height: '2rem', backgroundColor: 'white', border: 'none', cursor: 'pointer',
                            transition: 'background-color 0.2s ease, transform 0.15s ease',
                        }}
                >
                    <HeartIcon filled={isFavorited} />
                </button>
        </div>
      </div>

      {/* --- Content Section (Overlaps the image) --- */}
      <main className="relative bg-white rounded-t-[3rem] -mt-16 px-6 sm:px-12 pt-10 pb-12 max-w-4xl mx-auto shadow-sm min-h-[50vh]">
        
        {/* Title & Badges */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="font-roboto font-bold text-gray-900 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' }}>
            {data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Badge */}
            <span className="px-4 py-1.5 bg-[#236b32] text-white text-sm font-bold rounded-full shadow-sm">
              {data.category}
            </span>
            
            {/* Prep Time Badge */}
            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-400 text-sm font-bold rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {data.prepTime}
            </span>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About this recipe</h2>
          <p className="text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </section>

        {/* Key Ingredients */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Key Ingredients</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.keyIngredients.map((ingredient, index) => (
              <li 
                key={index}
                className="flex items-center gap-3 p-3 bg-green-50/50 border border-green-100 rounded-2xl text-gray-800 font-medium capitalize"
                style={{fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)'}}
              >
                <div className="w-2 h-2 rounded-full bg-[#236b32] shrink-0" />
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}