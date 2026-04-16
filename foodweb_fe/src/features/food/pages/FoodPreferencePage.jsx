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
      text: "👋 Hi! Bạn muốn ăn gì hôm nay? (Italian / Asian / Dessert / Breakfast)"
    }
  ]);

  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    category: "",
    difficulty: "",
    maxCookingTime: "",
    maxCalories: ""
  });

  // UI STATES
  const [isTyping, setIsTyping] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");

  // =========================
  // TYPEWRITER EFFECT
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
  // HANDLE USER ANSWER
  // =========================
  const handleUserAnswer = (value) => {
    const newForm = { ...form };

    if (step === 0) newForm.category = value;
    if (step === 1) newForm.difficulty = value;
    if (step === 2) newForm.maxCookingTime = value;
    if (step === 3) newForm.maxCalories = value;

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
        botText = "Bạn muốn mức độ khó như thế nào? (easy / medium / hard)";
        break;

      case 2:
        botText = "Bạn có bao nhiêu thời gian để nấu? (15 / 30 / 60 phút)";
        break;

      case 3:
        botText = "Bạn muốn tối đa bao nhiêu calories?";
        break;

      case 4:
        botText = "Đang tìm món phù hợp cho bạn... 🍜";
        shouldSearch = true;
        break;

      default:
        break;
    }

    // typing indicator
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (shouldSearch) {
        setStreaming(true);
        setStreamText("");

        typeMessage(botText, () => {
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: botText }
          ]);

          setStreaming(false);
        });

        dispatch(recommendByPreference(updatedForm));
      } else {
        setStreaming(true);
        setStreamText("");

        typeMessage(botText, () => {
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: botText }
          ]);

          setStreaming(false);
        });
      }
    }, 700);
  };

  // =========================
  // QUICK REPLIES
  // =========================
  const getReplies = () => {
    if (step === 0) return ["Italian", "Asian", "Dessert", "Breakfast"];
    if (step === 1) return ["easy", "medium", "hard"];
    if (step === 2) return ["15", "30", "60"];
    if (step === 3) return ["300", "500", "800"];
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

      {/* CHAT BOX */}
      <div className="chat-container">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.role}`}
          >
            {msg.text}
          </div>
        ))}

        {/* STREAMING TEXT */}
        {streaming && (
          <div className="chat-bubble bot">
            {streamText}
          </div>
        )}

        {/* TYPING INDICATOR */}
        {isTyping && (
          <div className="chat-bubble bot typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {/* LOADING FROM API */}
        {status === "loading" && (
          <div className="chat-bubble bot">
            <FaSpinner className="spin" /> Đang tìm món...
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