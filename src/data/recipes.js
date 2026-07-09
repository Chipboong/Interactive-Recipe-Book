import img1 from "@/assets/recipes/id-1.jpg";
import img2 from "@/assets/recipes/id-2.webp";
import img3 from "@/assets/recipes/id-3.jpg";
import img4 from "@/assets/steak.png";
import img5 from "@/assets/spaghetti.jpg";
import img6 from "@/assets/chicken.jpg";

// all category: 'All', 'Breakfast', 'Main Dishes', 'Dessert', 'Snack'

const seedRecipes = [
  {
    id: "1",
    title: "Sushi",
    image: img1,
    description:
      "A traditional Japanese dish made with vinegared short-grain rice and various ingredient.",
    category: "Main Dishes",
    keyIngredients: ["rice", "salmon", "seafood"],
    prepTime: "60 min",
    isFeature: true,
  },
  {
    id: "2",
    title: "Pho",
    image: img2,
    description:
      "Well-loved Asian breakfast, Pho, with broth, delicated noodle, and meat.",
    category: "Breakfast",
    keyIngredients: ["noodles", "salmon", "broth base", "beef"],
    prepTime: "20 min",
    isFeature: false,
  },
  {
    id: "3",
    title: "Ramen",
    image: img3,
    description:
      "Iconic Japanese comfort food with rich, savory broth, wheat noodles, and tender toppings.",
    category: "Snack",
    keyIngredients: [
      "ramen noodles",
      "pork belly",
      "broth base",
      "soft-boiled egg",
    ],
    prepTime: "25 min",
    isFeature: true,
  },
  {
      id: "4",
      title: "Steak",
      image: img4,
      description:
        "A juicy grilled steak seasoned with herbs and spices, served with vegetables or sides.",
      category: "Main Dishes",
      keyIngredients: ["beef", "salt", "pepper", "butter"],
      prepTime: "30 min",
      isFeature: true,
    },
    {
      id: "5",
      title: "Spaghetti",
      image: img5,
      description:
        "Classic Italian pasta dish with rich tomato sauce, herbs, and perfectly cooked spaghetti.",
      category: "Main Dishes",
      keyIngredients: ["spaghetti", "tomato sauce", "garlic", "parmesan"],
      prepTime: "35 min",
      isFeature: true,
    },
    {
      id: "6",
      title: "Chicken Roast",
      image: img6,
      description:
        "Tender roasted chicken marinated with herbs and spices, cooked until golden and flavorful.",
      category: "Main Dishes",
      keyIngredients: ["chicken", "herbs", "garlic", "olive oil"],
      prepTime: "90 min",
      isFeature: true,
    },
];

export default seedRecipes;
