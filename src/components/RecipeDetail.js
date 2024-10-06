import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipeDetail = ({ recipeId }) => {
    const [recipeDetail, setRecipeDetail] = useState(null);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${recipeId}/information`,
                    {
                        params: { apiKey: "37b7afc14e844cd29d372c6f6feeb518" },
                    }
                );
                setRecipeDetail(response.data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
        fetchRecipeDetail();
    }, [recipeId]);

    return (
        <div>
            {recipeDetail ? (
                <div>
                    <h2>{recipeDetail.title}</h2>
                    <img src={recipeDetail.image} alt={recipeDetail.title} />
                    <p>Ready in {recipeDetail.readyInMinutes} minutes</p>
                    <p>Servings: {recipeDetail.servings}</p>
                    <h4>Ingredients:</h4>
                    <ul>
                        {recipeDetail.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                    <h4>Instructions:</h4>

                    <div
                        className="mt-2 text-gray-600"
                        dangerouslySetInnerHTML={{
                            __html: recipeDetail.instructions,
                        }}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeDetail;
