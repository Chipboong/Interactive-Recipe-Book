import {useState,createContext} from "react";

export const RecipeContext = createContext();

export default function RecipeContextProvider({children}){
    const [recipes, setRecipe] = useState([])

    return(
        <RecipeContext.Provider value={{recipes, setRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}

// Data format : {
//     id: string,
//     title: string,
//     description: string,
//     ingredients: string[],
//     instructions: string[]
// }