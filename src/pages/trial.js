
import { useState } from 'react';

const Questionnaire = () => {
    const initialQuestionsData = [
        {
            "id": "1",
            "text": "What is your favorite color?",
            "type": "single_choice",
            "options": [
                "Red",
                "Blue",
                "Green",
                "Yellow"
            ]
        },
        {
            "id": "2",
            "text": "How many cups of coffee do you drink per day?",
            "type": "range_input",
            "min": 0,
            "max": 10,
            "followUpQuestion": {
                "condition": "answer > 3",
                "question": {
                    "id": "3",
                    "text": "Do you prefer tea instead?",
                    "type": "single_choice",
                    "options": [
                        "Yes",
                        "No"
                    ]
                }
            }
        },
        {
            "id": "4",
            "text": "Which programming languages do you use?",
            "type": "multiple_choice",
            "options": [
                "JavaScript",
                "Python",
                "Java",
                "C++",
                "Ruby"
            ]
        },
        {
            "id": "5",
            "text": "What is your preferred coding environment?",
            "type": "text_input"
        },
        {
            "id": "6",
            "text": "How many hours do you spend coding per week?",
            "type": "range_input",
            "min": 0,
            "max": 40,
            "followUpQuestions": [
                {
                    "condition": "answer > 20",
                    "question": {
                        "id": "7",
                        "text": "What projects are you currently working on?",
                        "type": "text_input"
                    }
                },
                {
                    "condition": "answer < 10",
                    "question": {
                        "id": "8",
                        "text": "Do you find coding challenging?",
                        "type": "single_choice",
                        "options": [
                            "Yes",
                            "No"
                        ]
                    }
                }
            ]
        }
    ];

    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionsData, setQuestionsData] = useState(initialQuestionsData);

    const handleAnswer = (answer) => {
        const currentQuestion = questionsData[0];
      
        setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion.id]: answer }));
      
        // Check for follow-up questions
        if (currentQuestion.followUpQuestion) {
          const condition = currentQuestion.followUpQuestion.condition.replace("answer", answer);
          console.log("Condition:", condition);
          
          try {
            const isConditionMet = eval(condition);
            console.log("Condition Result:", isConditionMet);
      
            if (isConditionMet) {
              // Condition for the follow-up question is met, add it to the questionsData
              setQuestionsData((prevQuestionsData) => [
                currentQuestion.followUpQuestion.question,
                ...prevQuestionsData.slice(1)
              ]);
            }
          } catch (error) {
            console.error("Error evaluating condition:", error);
          }
        } else {
          setQuestionsData((prevQuestionsData) => prevQuestionsData.slice(1));
        }
      };
      

    const evaluateCondition = (condition) => {
        const answer = answers[questionsData[0].id];

        // Here you can implement a safe and more sophisticated condition evaluation logic
        // For simplicity, we are using a basic check here.
        return answer > 3;
    };


    const renderQuestion = () => {
        const currentQuestion = questionsData[0];

        const handleContinue = () => {
            // Validate if the user has attempted to answer the question
            if (answers[currentQuestion.id] !== undefined || currentQuestion.type === "text_input") {
                // Move to the next question
                setQuestionsData((prevQuestionsData) => prevQuestionsData.slice(1));
            } else {
                // Optionally, you can show an error message or handle it in a way you prefer
                alert("Please answer the question before continuing.");
            }
        };

        switch (currentQuestion.type) {
            case "single_choice":
                return (
                    <div key={currentQuestion.id}>
                        <p>{currentQuestion.text}</p>
                        {currentQuestion.options.map((option) => (
                            <button key={option} onClick={() => handleAnswer(option)}>
                                {option}
                            </button>
                        ))}
                        <button onClick={handleContinue} disabled={answers[currentQuestion.id] === undefined}>
                            Continue
                        </button>
                    </div>
                );

            case "range_input":
                return (
                    <div key={currentQuestion.id}>
                        <p>{currentQuestion.text}</p>
                        <input
                            type="range"
                            min={currentQuestion.min}
                            max={currentQuestion.max}
                            onChange={(e) => handleAnswer(Number(e.target.value))}
                        />
                        <p>{answers[currentQuestion.id]}</p>
                        <button onClick={handleContinue} disabled={answers[currentQuestion.id] === undefined}>
                            Continue
                        </button>
                    </div>
                );

            case "multiple_choice":
                return (
                    <div key={currentQuestion.id}>
                        <p>{currentQuestion.text}</p>
                        {currentQuestion.options.map((option) => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    onChange={() => handleAnswer({
                                        ...answers[currentQuestion.id],
                                        [option]: !answers[currentQuestion.id]?.[option]
                                    })}
                                />
                                {option}
                            </label>
                        ))}
                        <button onClick={handleContinue} disabled={Object.keys(answers[currentQuestion.id] || {}).length === 0}>
                            Continue
                        </button>
                    </div>
                );

            case "text_input":
                return (
                    <div key={currentQuestion.id}>
                        <p>{currentQuestion.text}</p>
                        <input
                            type="text"
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                        <button onClick={handleContinue} disabled={answers[currentQuestion.id] === undefined}>
                            Continue
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };


    return (
        <div>
            {questionsData.length > 0 ? (
                renderQuestion()
            ) : (
                <div>
                    <h2>Thank you for completing the questionnaire!</h2>
                    <pre>{JSON.stringify(answers, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
