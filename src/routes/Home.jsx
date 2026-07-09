import { NavLink } from "react-router";
import Hero from "@/assets/hero.jpg";

import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/recipes/RecipeCard";
import "@/Circle.css";
export default function Home() {
  const { recipes, toggleFavorite, favorites } = useRecipes();
  console.log(recipes);
  return (
    <>
      <div
        className="relative min-h-[calc(100vh-72px)] bg-cover bg-center"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center lg:justify-start px-6 md:px-12 lg:px-20 animation-fade-up">
          <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left items-center lg:items-start text-white">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight">
              <span className="text-primary-green text-2xl md:text-4xl lg:text-6xl">
                PlateMate
              </span>
              <br />
              Your Perfect Recipe Mate.
            </h1>

            <p className="text-lg text-gray-200">
              Cook smarter, eat better, and share your favorite recipes with
              food lovers everywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <NavLink
                to="/recipes"
                className="bg-primary-green hover:bg-green-700 transition text-white px-8 py-3 rounded-full text-center font-semibold"
              >
                Browse Recipes
              </NavLink>

              <NavLink
                to="/add-recipe"
                className="bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-black transition px-8 py-3 rounded-full text-center font-semibold"
              >
                Add Recipe
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <section className="px-16 py-4">
        <h2 className="text-4xl font-bold py-8">Featured Recipes</h2>
        <div className="flex justify-around py-4 gap-12 ">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {recipes
              .filter((item) => item.isFeature)
              .map((item, index) => {
                return (
                  <li key={index}>
                    <RecipeCard
                      recipe={item}
                      isFavorited={favorites.includes(item.id)}
                      onFavoriteToggle={toggleFavorite}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
}
