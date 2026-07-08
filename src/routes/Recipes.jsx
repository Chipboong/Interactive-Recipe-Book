import PageHeader from '@/components/recipes/PageHeader'
import FilterBar from '@/components/recipes/FilterBar'
import RecipeGrid from '@/components/recipes/RecipeGrid'

function Recipes() {
    return (
        <main aria-label="The Recipe Page">
            <PageHeader />
            <FilterBar />
            <RecipeGrid />
        </main>
    )
}

export default Recipes;