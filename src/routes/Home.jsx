import { NavLink } from "react-router";
import { useRef } from "react";
import "../Circle.css";
import { useEffect } from "react";
export default function Home() {
    const canvasRef = useRef(null);
    function canvasImage() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createRadialGradient(
            300,
            250,
            0, // Inner circle (center, radius 0)
            300,
            250,
            200, // Outer circle (center, radius 200)
        );

        // Add color stops
        gradient.addColorStop(0.05, "#FFA10A"); // 5%
        gradient.addColorStop(0.35, "#FFBB00"); // 35%
        gradient.addColorStop(0.81, "#EE9300"); // 81%

        ctx.beginPath();
        ctx.arc(250, 250, 200, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'transparent';
        ctx.stroke();

        console.log(ctx);
    }
    useEffect(() => {
        canvasImage();
    }, [canvasRef]);
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
                <canvas ref={canvasRef} width="300px" height={"500px"} />
            </div>
        </div>
    );
}
