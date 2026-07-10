import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useRecipes } from '@/context/RecipeContext'; 

export default function AddRecipe() {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  
  // Added an "isCompressing" state to show a loading indicator during compression
  const [isCompressing, setIsCompressing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    image: '', // This will now hold our compressed Base64 string
    description: '',
    category: 'Main Dishes',
    prepTime: '',
    ingredients: '', 
  });

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
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

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

        // 4. Export as a compressed JPEG Base64 string (0.7 = 70% quality)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        // 5. Save to state and turn off loading
        setFormData((prev) => ({ ...prev, image: compressedBase64 }));
        setIsCompressing(false);
      };
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure they uploaded an image
    if (!formData.image) {
      alert("Please upload an image first!");
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title: formData.title,
      image: formData.image,
      description: formData.description,
      category: formData.category,
      prepTime: formData.prepTime,
      keyIngredients: formData.ingredients
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== ''), 
    };

    addRecipe(newRecipe);
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8 px-4 sm:px-6 lg:px-8 pb-20">
      
      <div className="max-w-3xl mx-auto mb-6 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          type="button"
          className="bg-white hover:bg-gray-100 p-2.5 rounded-full shadow-sm border border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Create New Recipe</h1>
      </div>

      <main className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Recipe Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32]" />
          </div>

          {/* Grid for Image Upload & Prep Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* The New Image Uploader */}
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-bold text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#236b32] hover:file:bg-green-100 transition-colors"
              />
              
              {/* Status or Preview */}
              {isCompressing ? (
                <div className="text-sm text-blue-600 font-medium animate-pulse">Compressing image...</div>
              ) : formData.image ? (
                <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-gray-200" />
              ) : null}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Prep Time</label>
              <input type="text" name="prepTime" value={formData.prepTime} onChange={handleChange} placeholder="e.g., 45 min" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32]" />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32] bg-white">
              <option value="Breakfast">Breakfast</option>
              <option value="Main Dishes">Main Dishes</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          {/* Ingredients Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Key Ingredients (Comma Separated)</label>
            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows="2" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32]"></textarea>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#236b32]"></textarea>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isCompressing}
            className="w-full bg-[#236b32] hover:bg-[#1c5528] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
          >
            Save Recipe
          </button>
          
        </form>
      </main>
    </div>
  );
}