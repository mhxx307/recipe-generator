import React, { useState } from "react";
import axios from "axios";
import RecipeInput from "./components/RecipeInput";
import ApiKeyInput from "./components/ApiKeyInput";
import RandomRecipe from "./components/RandomRecipe";
import MealPlanner from "./components/MealPlanner";
import RecipeDetail from "./components/RecipeDetail"; // For showing detailed recipe info
import OpenAI from "openai"; // For OpenAI API v4

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [apiKey, setApiKey] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const fetchRecipes = async (ingredients) => {
        if (apiKey) {
            const openai = new OpenAI({ apiKey });
            try {
                const chatCompletion = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content: "You are a culinary expert.",
                        },
                        {
                            role: "user",
                            content: `Give me creative recipes with the ingredients: ${ingredients}`,
                        },
                    ],
                });
                // Process AI-generated recipes
                const aiRecipes = chatCompletion.choices.map(
                    (choice) => choice.message.content
                ); // Adapt this to your AI response structure
                setRecipes(aiRecipes);
            } catch (error) {
                console.error("Error with OpenAI API:", error);
            }
        } else {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/findByIngredients`,
                    {
                        params: {
                            ingredients,
                            number: 5,
                            apiKey: "37b7afc14e844cd29d372c6f6feeb518",
                        },
                    }
                );
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
                Recipe Finder
            </h1>
            <div className="mb-6">
                <ApiKeyInput setApiKey={setApiKey} />
            </div>
            <div className="mb-6">
                <RecipeInput fetchRecipes={fetchRecipes} />
            </div>
            <div className="mb-6">
                <RandomRecipe />
            </div>
            <div className="mb-6">
                <MealPlanner />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        onClick={() => setSelectedRecipe(recipe.id)}
                        className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">
                            {recipe.title}
                        </h3>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="mt-2 rounded-lg"
                        />
                    </div>
                ))}
                {selectedRecipe && <RecipeDetail recipeId={selectedRecipe} />}
            </div>
        </div>
    );
};

export default App;
