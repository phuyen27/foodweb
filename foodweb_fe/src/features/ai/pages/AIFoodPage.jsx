import React, {
  useState,
  useRef,
  useEffect
} from "react";

import {
  generateFoodApi,
  saveGeneratedFoodApi
} from "../../food/food.api";

import GeneratedFoodDetail
  from "../components/GeneratedFoodDetail";

import {
  FaRobot,
  FaPaperPlane,
  FaRedo,
  FaCheck
} from "react-icons/fa";

import "./AIFoodPage.css";

const AIFoodPage = () => {

  const [message, setMessage] =
    useState("");

  const [chatList,
          setChatList] =
    useState([]);

  const [generatedFood,
          setGeneratedFood] =
    useState(null);

  const [loading,
          setLoading] =
    useState(false);

  // Auto scroll

  const chatEndRef =
    useRef(null);

  useEffect(() => {

    chatEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [chatList, generatedFood, loading]);

  // SEND MESSAGE

  const handleSend =
    async () => {

      if (!message.trim())
        return;

      const userMsg = {
        role: "user",
        text: message
      };

      setChatList(prev => [
        ...prev,
        userMsg
      ]);

      setLoading(true);

      try {

        const res =
          await generateFoodApi(
            message
          );

        setGeneratedFood(
          res.data
        );

        setChatList(prev => [
          ...prev,
          {
            role: "ai",
            text:
              "I created a recipe for you! Please check below 👇"
          }
        ]);

      }
      catch {

        setChatList(prev => [
          ...prev,
          {
            role: "ai",
            text:
"🤖 Sorry, system error. Please try again..."
          }
        ]);

      }

      setMessage("");
      setLoading(false);

    };

  // SAVE FOOD

  const handleSave =
    async () => {

      try {

        await saveGeneratedFoodApi(
          generatedFood
        );

        setChatList(prev => [
          ...prev,
          {
            role: "ai",
            text:
              "✅ Food added successfully!"
          }
        ]);

        setGeneratedFood(null);

      }
      catch {

        setChatList(prev => [
          ...prev,
          {
            role: "ai",
            text:
              "❌ Failed to save food."
          }
        ]);

      }

    };

  // REGENERATE

  const handleRegenerate =
    async () => {

      if (!chatList.length)
        return;

      const lastUserMsg =
        chatList
          .filter(c =>
            c.role === "user"
          )
          .slice(-1)[0];

      if (!lastUserMsg)
        return;

      setLoading(true);

      try {

        const res =
          await generateFoodApi(
            lastUserMsg.text
          );

        setGeneratedFood(
          res.data
        );

      }
      catch {

        setChatList(prev => [
          ...prev,
          {
            role: "ai",
            text:
"🤖 AI error. Try again later."
          }
        ]);

      }

      setLoading(false);

    };

  return (

    <div className="ai-container">

      {/* TITLE */}

      <h1 className="title">

        <FaRobot />

        AI Food Creator

      </h1>

      {/* CHAT */}

      <div className="chat-box">

        {chatList.map(
          (msg, index) => (

          <div
            key={index}
            className={
              msg.role === "user"
                ? "chat user"
                : "chat ai"
            }
          >

            {msg.text}

          </div>

        ))}

        {loading && (

          <div className="chat ai">

            🤖 Thinking...

          </div>

        )}

        {/* PREVIEW INSIDE CHAT */}

        {generatedFood && (

          <div className="preview">

            <GeneratedFoodDetail
              food={generatedFood}
            />

            <div className="preview-actions">

              <button
                className="confirm-btn"
                onClick={handleSave}
              >
                <FaCheck />
                OK Add
              </button>

              <button
                className="regen-btn"
                onClick={handleRegenerate}
              >
                <FaRedo />
                Generate Again
              </button>

            </div>

          </div>

        )}

        <div ref={chatEndRef} />

      </div>

      {/* INPUT FIXED */}

      <div className="chat-input">

        <input
          type="text"
          placeholder="Describe food you want..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (e.key === "Enter")
              handleSend();

          }}
        />

        <button
          onClick={handleSend}
        >

          <FaPaperPlane />

        </button>

      </div>

    </div>

  );

};

export default AIFoodPage;