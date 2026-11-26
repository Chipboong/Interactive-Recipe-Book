import React, { useState, useContext, useEffect } from "react";
import { useRecipes } from "@/context/RecipeContext";
import { useParams, useNavigate } from "react-router";
export default function AddRecipe() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { addRecipe, recipes } = useRecipes();

    const recipe = isEditMode
        ? recipes.find((item) => Number(item.id) === Number(id))
        : null;

    // Added an "isCompressing" state to show a loading indicator during compression
    const [isCompressing, setIsCompressing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        category: "Main Dishes",
        prepTime: "",
        ingredients: "",
    });
    // Clean up the object URL when the preview changes or component unmounts
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);
    useEffect(() => {
        if (!recipe) return;

        
        let ingredients = recipe.keyIngredients ?? recipe.ingredient ?? [];
        
        if (typeof ingredients === 'string') {
          try {
            const parsed = JSON.parse(ingredients);
        
            ingredients = Array.isArray(parsed)
              ? parsed
              : [parsed];
          } catch {
            ingredients = ingredients.split(',');
          }
        }
        
        const formattedIngredients = Array.isArray(ingredients)
          ? ingredients.map(item => String(item).replace(/["[\]]/g, '').trim()).join(', ')
          : String(ingredients);
        setFormData({
            title: recipe.title || "",
            image: recipe.image || "",
            description: recipe.description || "",
            category: recipe.category || "Main Dishes",
            prepTime: recipe.prepTime ?? recipe.prep_time_mins ?? "",
            ingredients: formattedIngredients,
        });
    }, [recipe]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- THE COMPRESSION MAGIC ---
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsCompressing(true);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                // 1. Create a hidden canvas
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;

                // 2. Resize the image
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;

                canvas.width = width;
                canvas.height = height;

                // 3. Draw the resized image onto the canvas
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            setIsCompressing(false);
                            return;
                        }

                        setImageFile(blob);
                        setImagePreview(URL.createObjectURL(blob));

                        setIsCompressing(false);
                    },
                    "image/jpeg",
                    0.7,
                );

                //   // 4. Export as a compressed JPEG Base64 string (0.7 = 70% quality)
                //   const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

                //   // 5. Save to state and turn off loading
                //   setFormData((prev) => ({ ...prev, image: compressedBase64 }));
                //   setIsCompressing(false);
            };
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditMode && !imageFile) {
            alert("Please upload an image first!");
            return;
        }

        if (isCompressing) return;

        const payload = new FormData();

        payload.append("title", formData.title.trim());
        payload.append("description", formData.description.trim());
        payload.append("category", formData.category);
        payload.append("prep_time_mins", formData.prepTime.trim());

        payload.append(
            "ingredient",
            formData.ingredients
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .join(", "),
        );

        payload.append("status", "published");

        // Only upload an image if the user selected a new one.
        if (imageFile) {
            payload.append("image", imageFile, "recipe.jpg");
        }

        try {
            setIsSubmitting(true);

            if (isEditMode) {
                const response = await fetch(
                    `http://localhost:3000/api/v1/recipes/${id}`,
                    {
                        method: "PUT",
                        credentials: "include",
                        body: payload,
                    },
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to update recipe");
                }

                alert("Recipe updated successfully!");
            } else {
                await addRecipe(payload);
                alert("Recipe created successfully!");
            }

            navigate(isEditMode ? `/recipes/${id}` : "/recipes");
        } catch (err) {
            alert(err.message || "Failed to save recipe. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-roboto py-8 px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-3xl mx-auto mb-6 flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    type="button"
                    aria-label="Go back"
                    className="bg-white hover:bg-gray-100 p-2.5 rounded-full shadow-sm border border-gray-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 ml-4">
                    Create New Recipe
                </h1>
            </div>

            <main className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 sm:p-10">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    aria-label="Add new recipe form"
                >
                    {/* Title Input */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Recipe Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Creamy Tomato Basil Pasta"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32] text-sm"
                        />
                    </div>

                    {/* Grid for Image Upload & Prep Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* The New Image Uploader */}
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="image"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Upload Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                aria-label="Upload recipe image"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#236b32] hover:file:bg-green-100 transition-colors"
                            />

                            {/* Status or Preview — announced to screen readers via role="status" */}
                            <div role="status" aria-live="polite">
                                {isCompressing ? (
                                    <p className="text-sm text-blue-600 font-medium animate-pulse">
                                        Compressing image...
                                    </p>
                                ) : (
                                    (imagePreview || formData.image) && (
                                        <img
                                            src={imagePreview || formData.image}
                                            alt="Recipe image preview"
                                            className="w-full h-32 object-cover rounded-xl border border-gray-200"
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="prepTime"
                                className="block text-sm font-bold text-gray-700 mb-2"
                            >
                                Prep Time
                            </label>
                            <input
                                id="prepTime"
                                type="text"
                                name="prepTime"
                                value={formData.prepTime}
                                onChange={handleChange}
                                placeholder="e.g., 45 min"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32] text-sm"
                            />
                        </div>
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32] text-sm bg-white"
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Main Dishes">Main Dishes</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack">Snack</option>
                        </select>
                    </div>

                    {/* Ingredients Input */}
                    <div>
                        <label
                            htmlFor="ingredients"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Key Ingredients (Comma Separated)
                        </label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            rows="2"
                            required
                            placeholder="e.g., chicken, garlic, lemon"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32] text-sm"
                        ></textarea>
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            placeholder="Describe your recipe in a few sentences..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32] text-sm"
                        ></textarea>
                    </div>

                    <hr className="border-gray-100 my-2" />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isCompressing || isSubmitting}
                        className="w-full bg-[#236b32] hover:bg-[#1c5528] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? "Saving..." : "Save Recipe"}
                    </button>
                </form>
            </main>
        </div>
    );
}
