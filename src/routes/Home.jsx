import { NavLink } from "react-router";
import Hero from "@/assets/Hero.jpg";
import "@/Circle.css"
export default function Home() {
  return (
    <div
      className="relative min-h-[calc(100vh-72px)] bg-cover bg-center"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center lg:justify-start px-6 md:px-12 lg:px-20 animation-fade-up">
        <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left items-center lg:items-start text-white">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight">
            <span className="text-primary-green text-2xl md:text-4xl lg:text-6xl">PlateMate</span>
            <br />
            Your Perfect Recipe Mate.
          </h1>

          <p className="text-lg text-gray-200">
            Cook smarter, eat better, and share your favorite recipes with food
            lovers everywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <NavLink
              to="/recipe"
              className="bg-primary-green hover:bg-green-700 transition text-white px-8 py-3 rounded-full text-center font-semibold"
            >
              Browse Recipes
            </NavLink>

            <NavLink
              to="/add"
              className="bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-black transition px-8 py-3 rounded-full text-center font-semibold"
            >
              Add Recipe
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}