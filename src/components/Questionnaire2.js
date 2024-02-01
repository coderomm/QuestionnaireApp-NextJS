// pages/Questionnaire.js
import React, { useState } from 'react';
import questionsData from '../path-to-your-data/QuestionsData'; // Update the path
import recommendedProducts from '../path-to-your-data/RecommendedProducts'; // Update the path
import Image from 'next/image';
import longevit from '../assets/longevit.jpg'; // Update the path

// Introduction Page Component
const IntroductionPage = ({ onStartQuiz }) => (
    <main id="questionnaireMainOuter" className="questionnaireMainOuter">
      <div className="questionnaire-wrapper">
        <div className="wrapperTop">
          <div className="questionnaire-shape">
            <div className="shape"></div>
          </div>
          <div className="questionnaire-content">
            <h1 tabIndex={0} className="title">
              DecodeAge
            </h1>
          </div>
        </div>
        <div className="wrapperBottom">
          <div className="wrapperBottomImage">
            <div className="background">
              <Image
                alt=""
                role="presentation"
                src="https://d1vo8zfysxy97v.cloudfront.net/images/pages/quizzes/bg-card.png"
              />
            </div>
            <div className="foreground">
              <Image alt="" role="presentation" src={longevit} />
            </div>
            <div className="icon1">
              <span className="icon">
                <i className="fa-solid fa-clipboard" />
              </span>
            </div>
            <div className="icon2">
              <span className="icon">
                <i className="fa-solid fa-check" />
              </span>
            </div>
          </div>
          <div className="wrapperBottomDescription"></div>
          <div className="continue">
            <button className="defaultBtn" onClick={onStartQuiz}>
              Take the questionnaire
              <span className="icon is-small">
                <i className="fas fa-arrow-right" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
  
  const Questionnaire = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [userResponses, setUserResponses] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showIntroduction, setShowIntroduction] = useState(true);
    const [recommendedProduct, setRecommendedProduct] = useState(null);
  
    const handleStartQuiz = () => {
      setShowIntroduction(false);
      setCurrentQuestion(1);
      setIsAnswered(false);
    };
    
    // Handle option select
    const handleOptionSelect = (selectedOption) => {
      setUserResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        updatedResponses[currentQuestion] = selectedOption;
        return updatedResponses;
      });
      setIsAnswered(true);
    };
  
    // Handle moving to the previous question
    const handlePrevQuestion = () => {
      if (currentQuestion > 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion - 1);
        setIsAnswered(!!userResponses[currentQuestion - 1]); // Check if the previous question is answered
      }
    };
  
    // Handle moving to the next question
    const handleNextQuestion = () => {
      if (currentQuestion < questionsData.length) {
        setIsAnswered(!!userResponses[currentQuestion + 1]); // Check if the next question is answered
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      } else if (currentQuestion === questionsData.length) {
        setIsAnswered(true);
        setCurrentQuestion((prevQuestion) => prevQuestion + 1); // Update to the next state
      } else {
      }
    };
  
    // Handle submit
    const handleSubmit = () => {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      console.log("User response on submit : ", userResponses);
      const recommendation = makeProductRecommendation(userResponses);
      setRecommendedProduct(recommendation);
    };
  
    // Handle Multiple Choices Questions
    const handleMultipleChoiceSelect = (selectedOption) => {
      setUserResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        const currentResponse = updatedResponses[currentQuestion] || [];
  
        if (currentResponse.includes(selectedOption)) {
          // Remove the option if already selected
          updatedResponses[currentQuestion] = currentResponse.filter(
            (option) => option !== selectedOption
          );
        } else {
          // Add the option if not selected
          updatedResponses[currentQuestion] = [
            ...currentResponse,
            selectedOption,
          ];
        }
  
        return updatedResponses;
      });
  
      setIsAnswered(true);
    };
  
    console.log("total que length: ", questionsData.length);
    console.log("current que: ", currentQuestion);
    console.log("user res: ", userResponses);
    
    // Handle text input change for text-input questions
    const handleTextInputChange = (event) => {
      const inputValue = event.target.value.trim();
      setUserResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        updatedResponses[currentQuestion] = inputValue;
        return updatedResponses;
      });
      setIsAnswered(!!inputValue); // Set isAnswered based on whether inputValue is truthy (non-empty)
    };
  
    // Handle range input
    const handleRangeChange = (e) => {
      const value = e.target.value;
      setUserResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        updatedResponses[currentQuestion] = value;
        return updatedResponses;
      });
      setIsAnswered(true);
    };
  
    // Utility function to calculate percentage
    const calculatePercentage = (value, min, max) => {
      return ((value - min) / (max - min)) * 100;
    };
  
    // Takes the user responses as input and returns the recommended product
    const makeProductRecommendation = (userResponses) => {
      const productUsedFor = userResponses[1];
  
      if (productUsedFor === "Myself") {
        const recommendation = recommendedProducts.find(
          (product) => product.id === 1
        );
        console.log("Recommendation for Myself:", recommendation);
        return recommendation;
      } else if (productUsedFor === "My Parents") {
        const recommendation = recommendedProducts.find(
          (product) => product.id === 2
        );
        console.log("Recommendation for My Parents:", recommendation);
        return recommendation;
      } else if (productUsedFor === "Partner") {
        const recommendation = recommendedProducts.find(
          (product) => product.id === 3
        );
        console.log("Recommendation for Partner:", recommendation);
        return recommendation;
      } else {
        console.log("No recommendation for other cases");
        return null; // No recommendation for other cases
      }
    };
  
    const renderRecommendedProduct = () => {
      console.log("renderRecommendedProduct called");
      if (recommendedProduct) {
        return (
          <div className="recommended-product">
            <h2>
              &quote; Congratulations on completing the assessment! You&apos;re on the path to
              a healthier lifestyle.&quote; 
            </h2>
            Based on your answers, we recommend:{" "}
            <div className="recommended-product-details">
              <Image
                className="recommended-product-image"
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
              />
              <div className="recommended-product-details-inner">
                <h3 className="recommended-product-name">
                  {recommendedProduct.name}
                </h3>
                <p className="recommended-product-desc">
                  {recommendedProduct.description}
                </p>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };
  
    const renderContent = () => {
      if (showIntroduction) {
        return <IntroductionPage onStartQuiz={handleStartQuiz} />;
      } else if (currentQuestion <= questionsData.length) {
        return (
          <main id="questionnaireMainOuter" className="questionnaireMainOuter">
            <div className="questionnaire-wrapper">
              <div className="wrapperTop">
                <div className="questionnaire-shape">
                  <div className="shape" />
                </div>
                <div className="questionnaire-content">
                  <h1 tabIndex={0} className="title">
                    {questionsData[currentQuestion - 1].question}{" "}
                  </h1>
                </div>
              </div>
              <div className="wrapperBottom">
                <div className="questionnaire-progress">
                  <div className="progress-wrapper">
                    <progress
                      max={100}
                      className="progress is-darkgrey"
                      value={
                        (currentQuestion - 1) * (100 / questionsData.length)
                      }
                    >
                      ${(currentQuestion - 1) * (100 / questionsData.length)}{" "}
                    </progress>
                    <span className="progress-value">
                      <div
                        className="tip-wrapper"
                        style={{
                          left: `${
                            (currentQuestion - 1) * (100 / questionsData.length)
                          }%`,
                        }}
                      >
                        <div className="b-tooltip">
                          <div className="tooltip-content">{`${
                            (currentQuestion - 1) *
                            (100 / questionsData.length).toFixed(2)
                          }%`}</div>
                          <div className="tooltip-trigger" />
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="questions-container">
                  {questionsData[currentQuestion - 1].type === "range" ? (
                    <div className="range-question">
                      <input
                        className={`rangeSlider${
                          questionsData[currentQuestion - 1].type === "range"
                            ? " with-box-shadow"
                            : ""
                        }`}
                        type="range"
                        min={questionsData[currentQuestion - 1].min}
                        max={questionsData[currentQuestion - 1].max}
                        step={questionsData[currentQuestion - 1].step}
                        value={
                          userResponses[currentQuestion] ||
                          questionsData[currentQuestion - 1].min
                        }
                        onChange={(e) => handleRangeChange(e)}
                        style={{
                          background: `linear-gradient(to right, #7fe0a6 0%, #7fe0a6 ${calculatePercentage(
                            userResponses[currentQuestion],
                            questionsData[currentQuestion - 1].min,
                            questionsData[currentQuestion - 1].max
                          )}%, #ddd ${calculatePercentage(
                            userResponses[currentQuestion],
                            questionsData[currentQuestion - 1].min,
                            questionsData[currentQuestion - 1].max
                          )}%, #ddd 100%)`,
                        }}
                      />
                      <span className="userResponseOutputValue">
                        {userResponses[currentQuestion]}
                      </span>
                    </div>
                  ) : questionsData[currentQuestion - 1].type ===
                    "multiple-choice" ? (
                    <div
                      role="group"
                      aria-label="Choose options"
                      className="questionItems is-multiline is-centered"
                    >
                      {questionsData[currentQuestion - 1].options &&
                        questionsData[currentQuestion - 1].options.map(
                          (option, index) => (
                            <div key={index} className="queItem is-4">
                              <label
                                className="b-checkbox checkbox"
                                aria-required="true"
                              >
                                <input
                                  type="checkbox"
                                  name={currentQuestion}
                                  value={option}
                                  onChange={() =>
                                    handleMultipleChoiceSelect(option)
                                  }
                                  checked={
                                    userResponses[currentQuestion] &&
                                    userResponses[currentQuestion].includes(
                                      option
                                    )
                                  }
                                />
                                <span className="check" />
                                <span className="control-label">{option}</span>
                              </label>
                            </div>
                          )
                        )}
                    </div>
                  ) : (
                    <div
                      role="radiogroup"
                      aria-label="Choose an option"
                      className="questionItems is-multiline is-centered"
                    >
                      {questionsData[currentQuestion - 1].options &&
                        questionsData[currentQuestion - 1].options.map(
                          (option, index) => (
                            <div key={index} className="queItem is-4">
                              <label
                                className="b-radio radio"
                                aria-required="true"
                              >
                                <input
                                  type={
                                    questionsData[currentQuestion - 1].type ===
                                    "text-input"
                                      ? "text"
                                      : "radio"
                                  }
                                  placeholder={
                                    questionsData[currentQuestion - 1].type ===
                                    "text-input"
                                      ? "Type here"
                                      : ""
                                  }
                                  name={currentQuestion}
                                  value={option}
                                  onChange={
                                    questionsData[currentQuestion - 1].type ===
                                    "text-input"
                                      ? handleTextInputChange
                                      : () => handleOptionSelect(option)
                                  }
                                  checked={
                                    questionsData[currentQuestion - 1].type ===
                                    "text-input"
                                      ? false
                                      : userResponses[currentQuestion] ===
                                        option
                                  }
                                />
                                <span
                                  className={
                                    questionsData[currentQuestion - 1].type ===
                                    "text-input"
                                      ? ""
                                      : "check"
                                  }
                                />
                                <span className="control-label">{option}</span>
                              </label>
                            </div>
                          )
                        )}
                      {questionsData[currentQuestion - 1].type ===
                        "text-input" && (
                        <div className="queItem is-4">
                          <input
                            type="text"
                            className="text-input with-box-shadow"
                            value={userResponses[currentQuestion] || ""}
                            onChange={handleTextInputChange}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="continue">
                  <button
                    onClick={() => {
                      if (
                        currentQuestion < questionsData.length &&
                        isAnswered
                      ) {
                        handleNextQuestion();
                      } else if (
                        currentQuestion === questionsData.length &&
                        isAnswered
                      ) {
                        handleSubmit();
                      }
                    }}
                    disabled={!isAnswered}
                    className="defaultBtn"
                  >
                    {currentQuestion < questionsData.length
                      ? "Continue"
                      : "Submit"}
                    <span className="icon is-small">
                      <i
                        className={
                          currentQuestion < questionsData.length
                            ? "fas fa-arrow-right"
                            : "fas fa-check"
                        }
                      />
                    </span>
                  </button>
                </div>
                <div className="back">
                  {currentQuestion > 1 && (
                    <button onClick={handlePrevQuestion} className="backBtn">
                      Back
                      <span className="icon is-small">
                        <i className="fas fa-arrow-left" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>
        );
      } else if (currentQuestion === questionsData.length + 1) {
        return (
          <main id="questionnaireMainOuter" className="questionnaireMainOuter">
            <div className="questionnaire-wrapper">
              <div className="wrapperTop">
                <div className="questionnaire-shape">
                  <div className="shape"></div>
                </div>
                <div className="questionnaire-content">
                  <h1 tabIndex={0} className="title">
                    DecodeAge
                  </h1>
                </div>
              </div>
              <div className="wrapperBottom">
                <div className="wrapperBottomDescription">
                  {renderRecommendedProduct()}
                </div>
                <div className="continue">
                  <a href={recommendedProduct.link}>
                    <button className="defaultBtn">
                      Go To The Product
                      <span className="icon is-small">
                        <i className="fas fa-arrow-right" />
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </main>
        );
      } else {
        return null;
      }
    };
  
    // Return the JSX
    return <div>{renderContent()}</div>;
  };

export default Questionnaire2;
