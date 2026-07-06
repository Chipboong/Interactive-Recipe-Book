import { NavLink } from "react-router";
import "../Circle.css";
export default function Home() {
    return (
        <div>
            <div className="h-[calc(100vh-72.8px)]  justify-center lg:justify-normal items-center flex">
                <div className="flex flex-col  px-12 gap-4">
                    <h1 className="text-4xl font-semibold">
                        <span className="text-primary-green font-roboto-serif font-bold text-5xl">
                            PlateMate
                        </span>
                        ,<br></br> Where Plates is your MATE!
                    </h1>

                    <div className="flex gap-12">
                        <NavLink
                            className="bg-primary-green text-white px-5 py-2 rounded-4xl font-semibold"
                            to={"/recipe"}
                        >
                            Browse Recipes
                        </NavLink>
                        <NavLink
                            className=" font-semibold border-gray-500 border-3 text px-5 py-2 bg-white rounded-4xl"
                            to={"/add"}
                        >
                            Add Recipes
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="absolute top-[calc(50%-250px)] right-0 w-[300px] h-[500px] overflow-hidden">
                <div className="outside__circle"></div>
            </div>
        </div>
    );
}
