// // const apiKey = "AIzaSyCQpwSdKdaban9i2dXh3IK7hRiBxP7zYck";

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyCQpwSdKdaban9i2dXh3IK7hRiBxP7zYck",
// });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//     config: {
//       thinkingConfig: {
//         thinkingBudget: 0, // Disables thinking
//       },
//     },
//   });
//   console.log(response.text);
//   return response;
// }

// await main();
// export default ai;
// File: src/config/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: Replace with your actual API key
const API_KEY = "AIzaSyCQpwSdKdaban9i2dXh3IK7hRiBxP7zYck";

// 1. Initialize the main Google AI client
const genAI = new GoogleGenerativeAI(API_KEY);

// 2. Get the specific generative model you want to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// 3. Export the model instance
export default model;
