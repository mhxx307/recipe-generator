import React, { useState } from "react";
import axios from "axios";

const MealPlanner = () => {
    const [mealPlan, setMealPlan] = useState(null);
    const [calories, setCalories] = useState(2000);
    const [diet, setDiet] = useState("vegetarian");
    const [timeFrame, setTimeFrame] = useState("week");

    const generateMealPlan = async () => {
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/mealplanner/generate`,
                {
                    params: {
                        timeFrame: timeFrame,
                        targetCalories: calories,
                        diet: diet,
                        apiKey: "37b7afc14e844cd29d372c6f6feeb518",
                    },
                }
            );
            setMealPlan(response.data.week); // Set the week object directly
        } catch (error) {
            console.error("Error generating meal plan:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-2xl font-bold mb-4">Meal Planner</h2>
            <div className="mb-4">
                <label className="block mb-2">Select Calorie Target:</label>
                <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Select Diet Type:</label>
                <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="paleo">Paleo</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="none">None</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Select Time Frame:</label>
                <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                >
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                </select>
            </div>
            <button
                onClick={generateMealPlan}
                className="bg-green-500 text-white rounded-lg p-2 w-full hover:bg-green-600 transition"
            >
                Generate Meal Plan
            </button>
            {mealPlan && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Meal Plan for the{" "}
                        {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
                    </h3>
                    {timeFrame === "week" ? (
                        Object.entries(mealPlan).map(
                            ([day, { meals }], index) => (
                                <div key={index} className="mt-2">
                                    <h4 className="text-lg font-semibold capitalize">
                                        {day}
                                    </h4>
                                    {meals.map((meal) => (
                                        <div key={meal.id} className="mt-1">
                                            <h5 className="text-md font-medium">
                                                {meal.title}
                                            </h5>
                                            <img
                                                src={meal.image}
                                                alt={meal.title}
                                                className="mt-1 rounded-lg"
                                            />
                                            <p className="text-sm text-gray-600">
                                                Ready in {meal.readyInMinutes}{" "}
                                                minutes, serves {meal.servings}.
                                            </p>
                                            <a
                                                href={meal.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                View Recipe
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )
                        )
                    ) : (
                        <div className="mt-2">
                            <h4 className="text-lg font-semibold capitalize">
                                Meal Plan for Today
                            </h4>
                            {mealPlan[Object.keys(mealPlan)[0]].meals.map(
                                (meal) => (
                                    <div key={meal.id} className="mt-1">
                                        <h5 className="text-md font-medium">
                                            {meal.title}
                                        </h5>
                                        <p className="text-sm text-gray-600">
                                            Ready in {meal.readyInMinutes}{" "}
                                            minutes, serves {meal.servings}.
                                        </p>
                                        <a
                                            href={meal.sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Recipe
                                        </a>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MealPlanner;
