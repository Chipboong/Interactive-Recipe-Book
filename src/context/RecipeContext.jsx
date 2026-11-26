import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import seedRecipes from '@/data/recipes'
import { getRecipe, uploadRecipe } from '@/api/recipe'

const RecipeContext = createContext(null)

export const CATEGORIES = ['All','Breakfast','Main Dishes', 'Dessert','Snack']

// Normalize backend snake_case fields to match seedRecipes
function normalizeRecipe(r) {
    return {
        ...r,
        prepTime: r.prep_time_mins ?? r.prepTime ?? '',
        keyIngredients: Array.isArray(r.keyIngredients)
            ? r.keyIngredients
            : typeof r.ingredient === 'string'
                ? r.ingredient.split(',').map(i => i.trim()).filter(Boolean)
                : [],
    }
}

function extractRecipeList(data) {
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.recipes)) return data.recipes
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data?.data?.recipes)) return data.data.recipes
    if (data?.id) return [data]
    return []
}


export function RecipeProvider({ children }) {
    // seed + user added from localStorage 
    // const [userRecipes, setUserRecipes] = useState(() => {
    //     try {
    //         const stored =localStorage.getItem('platemate_recipes')
    //         return stored ? JSON.parse(stored): []
    //     } catch {
    //         return []
    //     }
    // })

    // then, merge seed recipes with user-added ones
    const [apiRecipes, setApiRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchRecipes = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getRecipe()
            const list = extractRecipeList(data)
            setApiRecipes(list.map(normalizeRecipe))
        } catch (err) {
            console.error('Failed to fetch recipes:', err)
            setError(err.message || 'Failed to load recipes')
        } finally {
            setLoading(false)
        }
    }, [])

    // 1. Fetch recipes once when the app loads
    useEffect(() => {
        fetchRecipes()
    }, [])
    const recipes = useMemo(() => [...apiRecipes], [apiRecipes])

    // sync user recipes to localStorage whenever they change
    // useEffect(() => {localStorage.setItem('platemate_recipes',JSON.stringify(userRecipes))}, [userRecipes])


    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem('platemate_favorites')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })
    // sync favs
    useEffect(() => {localStorage.setItem('platemate_favorites', JSON.stringify(favorites))}, [favorites])

    // filter state 
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedIngredient, setSelectedIngredient] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [showFavorites, setShowFavorites] = useState(false)

    // unique key ingredients SCOPED to each category
    const ingredients = useMemo(() => {
        const source = selectedCategory && selectedCategory !== 'All' ? recipes.filter(r => r.category === selectedCategory): recipes
        return [...new Set(source.flatMap(r => r.keyIngredients ?? []))].sort()
    }, [recipes, selectedCategory])


    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {

            // show only favorited recipes
            if (showFavorites && !favorites.includes(recipe.id)) return false

            // skip if 'All' or nothing selected
            if (selectedCategory && selectedCategory !== 'All') {
                if (recipe.category !== selectedCategory) return false
            }

            // checks keyIngredients only
            if (selectedIngredient) {
                if (!(recipe.keyIngredients ?? []).includes(selectedIngredient)) return false
            }

            // search 4 title only 
            if (searchQuery.trim()) {
                const query = searchQuery.trim().toLowerCase()
                if (!recipe.title.toLowerCase().includes(query)) return false
            }

            return true
        })
    }, [recipes, selectedCategory, selectedIngredient, searchQuery, showFavorites, favorites])




    // ACTION
    // add a new recipe (user-created)
    async function addRecipe(newRecipe) {
        
        try {
            const res = await uploadRecipe(newRecipe)
            await fetchRecipes()
            return res;
        } catch (err) {
            console.error('Failed to upload recipe:', err)
            throw err // Let the form component catch and display the error
        }
    }

    // toggle a recipe in/out of favs
    function toggleFavorite(recipeId) {
        setFavorites(prev => prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
        )
    }

    // change category and reset stale ingredient selection
    function handleCategoryChange(category) {
        setSelectedCategory(category)
        setSelectedIngredient(null)
    }
    async function deleteRecipe(id) {
      const response = await fetch(
        `http://localhost:3000/api/v1/recipes/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
    
      const result = await response.json();
    
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete recipe');
      }
    
      // Refresh your recipe list.
      await fetchRecipes();
    
      return result;
    }

    const value = {
        // data
        recipes,
        filteredRecipes,
        ingredients,
        favorites,
        loading,
        error,

        // filter state
        selectedCategory,
        selectedIngredient,
        searchQuery,
        showFavorites,

        // filter actions
        handleCategoryChange,
        setSelectedIngredient,
        setSearchQuery,
        setShowFavorites,

        // recipe actions
        addRecipe,
        deleteRecipe,
        refreshRecipes: fetchRecipes,
        toggleFavorite,
    }

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    )
}

// lets use this instead of using useContext directly
export function useRecipes() {
    const context = useContext(RecipeContext)
    if (!context) {
        throw new Error('useRecipes must be used inside a RecipeProvider')
    }
    return context
}