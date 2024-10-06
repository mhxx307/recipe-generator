import React, { useState } from "react";
import axios from "axios";

const RandomRecipe = () => {
    const [recipe, setRecipe] = useState(null);

    const fetchRandomRecipe = async () => {
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/random`,
                {
                    params: { apiKey: "37b7afc14e844cd29d372c6f6feeb518" },
                }
            );
            setRecipe(response.data.recipes[0]);
        } catch (error) {
            console.error("Error fetching random recipe:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <button
                onClick={fetchRandomRecipe}
                className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition"
            >
                Get Random Recipe
            </button>
            {recipe && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {recipe.title}
                    </h3>
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="mt-2 rounded-lg"
                    />
                    <div
                        className="mt-2 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: recipe.summary }}
                    />
                </div>
            )}
        </div>
    );
};

export default RandomRecipe;
