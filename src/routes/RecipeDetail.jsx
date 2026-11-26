import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useRecipes } from "@/context/RecipeContext";
import { getRecipe } from "@/api/recipe";
import NotFound from "./NotFound.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function HeartIcon({ filled }) {
    return (
        <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill={filled ? "red" : "none"}
            stroke={filled ? "red" : "grey"}
            strokeWidth="1.5"
            style={{
                width: "1rem",
                height: "1rem",
                flexShrink: 0,
                transition: "fill 0.2s ease, stroke 0.2s ease",
            }}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
        </svg>
    );
}

export default function RecipeDetail() {
    const { id } = useParams();
    const {
        recipes,
        favorites,
        toggleFavorite,
        deleteRecipe,
    } = useRecipes();

    const navigate = useNavigate();
    const { user } = useAuth();

    const cachedRecipe = recipes.find(
        (recipe) => String(recipe.id) === String(id)
    );

    const [fetchedRecipe, setFetchedRecipe] = useState(null);
    const [loading, setLoading] = useState(!cachedRecipe);
    const [notFound, setNotFound] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch recipe if it isn't already in context
    useEffect(() => {
        if (cachedRecipe) {
            setFetchedRecipe(null);
            setLoading(false);
            setNotFound(false);
            return;
        }

        let cancelled = false;

        async function fetchSingleRecipe() {
            try {
                setLoading(true);
                setNotFound(false);

                const raw = await getRecipe(id);
                const item = Array.isArray(raw)
                    ? raw[0]
                    : raw?.recipe ?? raw?.data ?? raw;

                if (!cancelled) {
                    if (item && item.id) {
                        setFetchedRecipe(item);
                    } else {
                        setNotFound(true);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch recipe:", err);
                if (!cancelled) setNotFound(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchSingleRecipe();

        return () => {
            cancelled = true;
        };
    }, [id, cachedRecipe]);

    // Escape key navigates back
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") navigate("/recipes");
        }

        document.addEventListener("keydown", handleKeyDown);

        return () =>
            document.removeEventListener("keydown", handleKeyDown);
    }, [navigate]);

    const data = cachedRecipe || fetchedRecipe;

    if (!data && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
                Loading recipe...
            </div>
        );
    }

    if (notFound || !data) return <NotFound />;

    const isFavorited = favorites.includes(data.id);

    const isOwner =
        user &&
        Number(user.user_id ?? user.id) === Number(data.user_id);

    function handleFavoriteClick(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(data.id);
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${data.title}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setIsDeleting(true);
            await deleteRecipe(id);
            navigate("/recipes", { replace: true });
        } catch (err) {
            alert(err.message || "Failed to delete recipe.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-roboto pb-20">
            {/* Hero Image */}
            <div className="relative w-full h-80 sm:h-96 md:h-[400px]">
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-0 w-full p-4 sm:p-6 flex justify-between items-center z-10">
                    <button
                        type="button"
                        aria-label="Go back"
                        title="Go back (Esc key)"
                        className="bg-white/90 hover:bg-white backdrop-blur-sm p-2.5 rounded-full shadow-sm transition-transform active:scale-95"
                        style={{ border: "none", cursor: "pointer" }}
                        onClick={() => navigate("/recipes")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-800"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={handleFavoriteClick}
                        aria-label={
                            isFavorited
                                ? `Remove ${data.title} from favorites`
                                : `Add ${data.title} to favorites`
                        }
                        aria-pressed={isFavorited}
                        className="rounded-full flex items-center justify-center hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                        style={{
                            width: "2rem",
                            height: "2rem",
                            backgroundColor: "white",
                            border: "none",
                            cursor: "pointer",
                            transition:
                                "background-color 0.2s ease, transform 0.15s ease",
                        }}
                    >
                        <HeartIcon filled={isFavorited} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <main className="relative bg-white rounded-t-[3rem] -mt-16 px-6 sm:px-12 pt-10 pb-12 max-w-4xl mx-auto shadow-sm min-h-[50vh]">
                <div className="flex flex-col gap-4 mb-8">
                    <h1
                        className="font-roboto font-bold text-gray-900 leading-tight"
                        style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                    >
                        {data.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-4 py-1.5 bg-[#236b32] text-white text-sm font-bold rounded-full shadow-sm">
                            {data.category}
                        </span>

                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-400 text-sm font-bold rounded-full">
                            {data.prepTime ?? data.prep_time_mins}
                        </span>
                    </div>

                    {isOwner && (
                        <div className="flex flex-wrap gap-3 mb-6">
                            <button
                                onClick={() =>
                                    navigate(`/update-recipe/${id}`)
                                }
                                className="px-5 py-2 bg-[#236b32] text-white rounded-xl font-semibold hover:bg-green-800 transition"
                            >
                                Edit Recipe
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-5 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 disabled:bg-gray-400 transition"
                            >
                                {isDeleting
                                    ? "Deleting..."
                                    : "Delete Recipe"}
                            </button>
                        </div>
                    )}
                </div>

                <hr className="border-gray-100 mb-8" />

                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">
                        About this recipe
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {data.description}
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Key Ingredients
                    </h2>

                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {(data.keyIngredients || data.ingredient?.split(",") || []).map(
                            (ingredient, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-green-50/50 border border-green-100 rounded-2xl text-gray-800 font-medium capitalize"
                                    style={{
                                        fontSize:
                                            "clamp(0.8rem, 1.05vw, 0.95rem)",
                                    }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#236b32] shrink-0" />
                                    {String(ingredient)
                                        .replace(/[\[\]"*]/g, "")
                                        .trim()}
                                </li>
                            )
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
}
