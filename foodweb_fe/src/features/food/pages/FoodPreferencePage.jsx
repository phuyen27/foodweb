import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommendByPreference } from "../foodSlice";
import FoodCard from "../components/FoodCard";
import { FaRobot, FaSpinner } from "react-icons/fa";
import "./FoodPreferencePage.css";

const FoodPreferencePage = () => {
  const dispatch = useDispatch();

  const { preferenceResults, status, error } = useSelector(
    (state) => state.food
  );

  // =========================
  // CHAT STATE
  // =========================
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! What would you like to eat today? (All / Italian / Asian / Dessert / Breakfast)"
    }
  ]);

  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    category: "",
    difficulty: "",
    maxCookingTime: "",
    maxCalories: ""
  });

  const [isTyping, setIsTyping] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");

  // =========================
  // TYPEWRITER
  // =========================
  const typeMessage = (text, callback) => {
    let i = 0;
    let temp = "";

    const interval = setInterval(() => {
      temp += text[i];
      i++;
      setStreamText(temp);

      if (i === text.length) {
        clearInterval(interval);
        callback && callback();
      }
    }, 15);
  };

  // =========================
  // HANDLE ANSWER
  // =========================
  const handleUserAnswer = (value) => {
    const newForm = { ...form };

    // 🔥 convert "All" → null
    const finalValue = value === "All" ? null : value;

    if (step === 0) newForm.category = finalValue;
    if (step === 1) newForm.difficulty = finalValue;
    if (step === 2) newForm.maxCookingTime = finalValue;
    if (step === 3) newForm.maxCalories = finalValue;

    setForm(newForm);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: value }
    ]);

    nextStep(newForm, step + 1);
  };

  // =========================
  // BOT FLOW
  // =========================
  const nextStep = (updatedForm, next) => {
    setStep(next);

    let botText = "";
    let shouldSearch = false;

    switch (next) {
      case 1:
        botText = "What difficulty level do you prefer? (All / easy / medium / hard)";
        break;

      case 2:
        botText = "How much cooking time do you have? (All / 15 / 30 / 60 minutes)";
        break;

      case 3:
        botText = "What is your maximum calories? (All / 300 / 500 / 800)";
        break;

      case 4:
        botText = "Finding the best recipes for you... 🍜";
        shouldSearch = true;
        break;

      default:
        break;
    }

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      setStreaming(true);
      setStreamText("");

      typeMessage(botText, () => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: botText }
        ]);

        setStreaming(false);
      });

      if (shouldSearch) {
        dispatch(recommendByPreference(updatedForm));
      }
    }, 700);
  };

  // =========================
  // QUICK REPLIES
  // =========================
  const getReplies = () => {
    if (step === 0) return ["All", "Italian", "Asian", "Dessert", "Breakfast"];
    if (step === 1) return ["All", "easy", "medium", "hard"];
    if (step === 2) return ["All", "15", "30", "60"];
    if (step === 3) return ["All", "300", "500", "800"];
    return [];
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="chat-page">

      {/* HEADER */}
      <h1 className="title">
        <FaRobot /> Smart Food AI
      </h1>

      {/* CHAT */}
      <div className="chat-container">

        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            {msg.text}
          </div>
        ))}

        {streaming && (
          <div className="chat-bubble bot">
            {streamText}
          </div>
        )}

        {isTyping && (
          <div className="chat-bubble bot typing">
            <span></span><span></span><span></span>
          </div>
        )}

        {status === "loading" && (
          <div className="chat-bubble bot">
            <FaSpinner className="spin" /> Searching recipes...
          </div>
        )}
      </div>

      {/* QUICK REPLIES */}
      {step < 4 && status !== "loading" && (
        <div className="quick-replies">
          {getReplies().map((item) => (
            <button
              key={item}
              onClick={() => handleUserAnswer(item)}
              className="reply-btn"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* RESULT */}
      {preferenceResults.length > 0 && (
        <div className="food-grid">
          {preferenceResults.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodPreferencePage;