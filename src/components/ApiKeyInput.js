import React, { useState } from "react";

const ApiKeyInput = ({ setApiKey }) => {
    const [inputKey, setInputKey] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setApiKey(inputKey);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mb-4"
        >
            <input
                type="text"
                placeholder="Enter your OpenAI API key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full max-w-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2 w-full max-w-md hover:bg-blue-600 transition"
            >
                Submit API Key
            </button>
        </form>
    );
};

export default ApiKeyInput;
