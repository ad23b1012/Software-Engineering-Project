import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAXjLl-vHglLPk7bMY3EnXV5TM-yiBKw8o",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const rawAnswer = response.data.candidates[0].content.parts[0].text;

      // Format the answer for neat display
      const formattedAnswer = rawAnswer
        .split("\n")
        .map((line, index) => <p key={index} className="mb-2">{line.trim()}</p>);

      setAnswer(formattedAnswer);
    } catch (error) {
      setAnswer(
        <p className="text-red-600">Error generating response. Please try again later.</p>
      );
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-4 bg-white rounded shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold p-3 rounded text-center">
        Chat AI
      </h1>
      <textarea
        className="border rounded w-full mt-4 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="5"
        placeholder="Ask me anything..."
      ></textarea>
      <button
        onClick={generateAnswer}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Generate Answer
      </button>
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <div className="text-gray-800">{answer}</div>
      </div>
    </div>
  );
}

export default Chatbot;
