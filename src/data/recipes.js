import img1 from '@/assets/recipes/id-1.jpg'
import img2 from '@/assets/recipes/id-2.webp'
import img3 from '@/assets/recipes/id-3.jpg'
// all category: 'All', 'Breakfast', 'Main Dishes', 'Dessert', 'Snack'

const seedRecipes = [
    {
        id: '1',
        title: 'Sushi',
        image: img1,
        description: 'A traditional Japanese dish made with vinegared short-grain rice and various ingredient.',
        category: 'Main Dishes',
        keyIngredients: ['rice', 'salmon', 'seafood'],
        prepTime: '60 min',
    },
    {
        id: '2',
        title: 'Pho',
        image: img2,
        description: 'Well-loved Asian breakfast, Pho, with broth, delicated noodle, and meat.',
        category: 'Breakfast',
        keyIngredients: ['noodles', 'salmon', 'broth base', 'beef'],
        prepTime: '20 min',
    },
    {
        id: '3',
        title: 'Ramen',
        image: img3,
        description: 'Iconic Japanese comfort food with rich, savory broth, wheat noodles, and tender toppings.',
        category: 'Snack',
        keyIngredients: ['ramen noodles', 'pork belly', 'broth base', 'soft-boiled egg'],
        prepTime: '25 min',
        
    }
]

export default seedRecipes;