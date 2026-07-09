import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
// TODO: Update this import path to point to your actual context file
import { useRecipes } from '../context/RecipeContext'; 

export default function AddRecipe() {
  const navigate = useNavigate();
  
  // 1. Pull the addRecipe function from your Context
  const { addRecipe } = useRecipes();
  
  // 2. Form state (using 'image' to match your data format)
  const [formData, setFormData] = useState({
    title: '',
    image: '', 
    description: '',
    category: 'Main Dishes',
    prepTime: '',
    ingredients: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 3. Format the data to exactly match your Recipe Detail structure
    const newRecipe = {
      id: Date.now().toString(), // Generate a unique ID
      title: formData.title,
      image: formData.image,
      description: formData.description,
      category: formData.category,
      prepTime: formData.prepTime,
      // Convert the comma-separated string into a clean array
      keyIngredients: formData.ingredients
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== ''), // Drop any accidental empty spaces
    };

    // 4. Pass the beautifully formatted object to your context
    addRecipe(newRecipe);
    
    // 5. Navigate back to the recipes list
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8 px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Top Bar with Back Button */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center">
        <button 
          onClick={() => navigate('/recipes')}
          type="button"
          aria-label="Go back"
          className="bg-white hover:bg-gray-100 p-2.5 rounded-full shadow-sm transition-transform active:scale-95 border border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Create New Recipe</h1>
      </div>

      {/* The Form Container */}
      <main className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Recipe Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Herb-Crusted Lemon Chicken"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#236b32] focus:border-transparent transition-all"
            />
          </div>

          {/* Grid for Image URL & Prep Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="image" className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                id="image"
                name="image" // Updated to 'image'
                value={formData.image} // Updated to 'image'
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#236b32] focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="prepTime" className="block text-sm font-bold text-gray-700 mb-2">Prep Time</label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="e.g., 45 min"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#236b32] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#236b32] focus:border-transparent transition-all bg-white"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Main Dishes">Main Dishes</option>
              <option value="Snack">Snack</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          {/* Ingredients Input */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-bold text-gray-700 mb-2">Key Ingredients (Comma Separated)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="2"
              placeholder="e.g., chicken breast, fresh lemon, rosemary, olive oil"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#236b32] focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us a little bit about this recipe..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#236b32] focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#236b32] hover:bg-[#1c5528] text-white font-bold py-4 rounded-xl shadow-md transition-colors active:scale-[0.99] flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Save Recipe
          </button>
          
        </form>
      </main>
    </div>
  );
}