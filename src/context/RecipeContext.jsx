import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import seedRecipes from '@/data/recipes'

const RecipeContext = createContext(null)

export const CATEGORIES = ['All','Breakfast','Main Dishes', 'Dessert','Snack']



export function RecipeProvider({ children }) {
    // seed + user added from localStorage 
    const [userRecipes, setUserRecipes] = useState(() => {
        try {
            const stored =localStorage.getItem('platemate_recipes')
            return stored ? JSON.parse(stored): []
        } catch {
            return []
        }
    })

    // then, merge seed recipes with user-added ones
    const recipes = useMemo(() => [...seedRecipes, ...userRecipes], [userRecipes])

    // sync user recipes to localStorage whenever they change
    useEffect(() => {localStorage.setItem('platemate_recipes',JSON.stringify(userRecipes))}, [userRecipes])


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
    function addRecipe(newRecipe) {
        const recipe = {
            ...newRecipe, id: `user-${Date.now()}`,  //use unique id based on timestamp
            // AI suggested this over counter id where have to be stored somewhere persistent, also prone to duplicate ID
            // another way is to use Math.random()
        }
        setUserRecipes(prev => [...prev, recipe])
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

    const value = {
        // data
        recipes,
        filteredRecipes,
        ingredients,
        favorites,

        // filter state
        selectedCategory,
        selectedIngredient,
        searchQuery,
        showFavorites,

        // filter actions
        handleCategoryChange, // use this instead of setSelectedCategory directly
        setSelectedIngredient,
        setSearchQuery,
        setShowFavorites,

        // recipe actions
        addRecipe,
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