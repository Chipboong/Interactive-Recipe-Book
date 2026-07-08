import PageHeader from "@/components/recipes/PageHeader";
import Card from "@/components/recipes/Card.jsx"
import SideBar from "@/components/recipes/sideBar.jsx"

function Recipes() {
    return(
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
  <SideBar className="hidden md:flex shrink-0" />
  
  <main aria-label="The Recipe Page" className="flex flex-col flex-1 min-w-0 h-screen overflow-y-auto">
    
    <div className="flex justify-start w-full p-4 sm:p-6 lg:p-8">
      <PageHeader />
    </div> 
    
    {/* THE FIX: Replaced manual breakpoints with an auto-fit grid */}
    <div className="px-4 pb-12 sm:px-6 lg:px-8 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
      {Array.from({length:5}).map((_, index) => <Card key={index}/> )}
    </div>
    
  </main>
</div>
    )
}

export default Recipes;