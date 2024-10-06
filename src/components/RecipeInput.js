// RecipeInput.js
import React, { useState } from "react";

const RecipeInput = ({ fetchRecipes }) => {
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const handleAddIngredient = () => {
        if (ingredientInput.trim() !== "") {
            setIngredients((prev) => [...prev, ingredientInput.trim()]);
            setIngredientInput("");
        }
    };

    const handleFetchRecipes = () => {
        fetchRecipes(ingredients.join(", "));
        setIngredients([]); // Clear ingredients after fetching
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Enter Ingredients</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Add an ingredient"
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                />
                <button
                    onClick={handleAddIngredient}
                    className="bg-blue-500 text-white rounded-lg p-2 ml-2 hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </div>
            <div>
                <h3 className="font-semibold">Ingredients:</h3>
                <ul className="list-disc pl-5">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <button
                onClick={handleFetchRecipes}
                className="bg-green-500 text-white rounded-lg p-2 mt-4 w-full hover:bg-green-600 transition"
            >
                Find Recipes
            </button>
        </div>
    );
};

export default RecipeInput;
