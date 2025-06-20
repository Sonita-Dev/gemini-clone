import { createContext, useState } from "react";
import ai from "../config/gemini"; // Imports the configured model from the file above

export const Context = createContext();

export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 5 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);

    // Use the 'prompt' argument if it exists, otherwise use the 'input' state.
    const promptToSend = prompt !== undefined ? prompt : input;
    setRecentPrompt(promptToSend);

    // Add prompt to history if it's from user input
    if (prompt === undefined) {
      setPrevPrompts((prev) => [...prev, input]);
    }

    setResultData(""); // Clear previous result

    // Call the correct method on the model object
    // We use generateContentStream for the typing effect
    const result = await ai.generateContentStream([promptToSend]);

    let responseText = "";
    // Loop through the streaming response
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      responseText += chunkText;
    }

    // Format the streaming text with basic markdown
    let formattedResponse = responseText
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
      .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics
      .replace(/\n/g, "<br/>"); // Newlines

    // Typing effect
    let formattedArray = formattedResponse.split("");
    setResultData(""); // Clear before typing effect
    for (let i = 0; i < formattedArray.length; i++) {
      const nextChar = formattedArray[i];
      delayPara(i, nextChar);
    }

    setLoading(false);
    setInput("");
  };

  // const newChat = () => {
  //   setLoading(false);
  //   setShowResult(false);
  // };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
