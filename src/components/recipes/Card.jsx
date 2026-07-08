export default function Card() {
    return (
//         <div className="w-[220px] min-h-[260px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
//   {/* Image Container */}
//   <div className="h-36 w-full bg-gray-100 shrink-0">
//     <img 
//       src="/favicon.svg" 
//       alt="Recipe" 
//       className="w-full h-full object-cover"
//     />
//   </div>

//   {/* Content Container */}
//   <div className="p-4 font-roboto flex flex-col flex-grow">
//     <h1 className="text-lg font-bold text-gray-900 line-clamp-1">
//       Name
//     </h1>
//     <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//       Description
//     </p>
//   </div>
// </div>
<div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col font-sans group">
      
      {/* --- Image Section --- */}
      <div className="relative h-56 w-full">
        <img 
          src="/chicken.jpg" // Replace with your actual image path
          alt="Herb-Crusted Lemon Chicken" 
          className="w-full h-full object-cover"
        />
        
        {/* Favorite Icon Button (Top Right) */}
        <button 
          type="button"
          aria-label="Save to favorites"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm p-2.5 rounded-full shadow-sm transition-transform active:scale-95"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Tags / Badges (Bottom Left Overlay) */}
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
          {/* Prep Time Tag */}
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-full shadow-sm">
            🕒 45 Min
          </span>
          {/* Category/Dietary Tags */}
          <span className="px-3 py-1.5 bg-[#236b32] text-white text-xs font-bold rounded-full shadow-sm">
            Gluten-Free
          </span>
          <span className="px-3 py-1.5 bg-[#236b32] text-white text-xs font-bold rounded-full shadow-sm">
            Dinner
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col">
        <h2 className="text-[26px] font-bold text-gray-900 leading-tight mb-2">
          Herb-Crusted<br />Lemon Chicken
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          A vibrant and juicy chicken roast infused with fresh lemon and aromatic herbs, perfect for a cozy dinner.
        </p>
      </div>
      
    </div>
    )
}