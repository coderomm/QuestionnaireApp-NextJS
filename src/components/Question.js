import React from 'react';

const Question = ({ data, onAnswer, answers }) => {
  debugger
  // Check if 'data' is defined before attempting to destructure
  if (!data) {
    // You can handle the case when 'data' is undefined, e.g., by rendering an error message
    return <div>Error: Question data is undefined</div>;
  }

  // Destructure properties from the 'data' prop
  const { id, text, type, options, min, max, followUpQuestions } = data;

  // Event handlers for different question types
  const handleOptionChange = (e) => {
    onAnswer(id, e.target.value);
  };

  const handleTextInputChange = (e) => {
    onAnswer(id, e.target.value);
  };

  const handleRangeInputChange = (e) => {
    onAnswer(id, parseInt(e.target.value));
  };

  // JSX structure for rendering the question
  return (
    <div>
      <h3>{text}</h3>

      {/* Render options for single choice questions */}
      {type === 'single_choice' && (
        <ul>
          {options.map((option) => (
            <li key={option}>
              <input
                type="radio"
                name={`question_${id}`}
                value={option}
                onChange={handleOptionChange}
              />
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Render options for multiple choice questions */}
      {type === 'multiple_choice' && (
        <ul>
          {options.map((option) => (
            <li key={option}>
              <input
                type="checkbox"
                value={option}
                onChange={handleOptionChange}
              />
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Render a range input for range input questions */}
      {type === 'range_input' && (
        <input
          type="range"
          value={answers[id] || min}
          min={min}
          max={max}
          onChange={handleRangeInputChange}
        />
      )}

      {/* Render a text input for text input questions */}
      {type === 'text_input' && (
        <input
          type="text"
          value={answers[id] || ''}
          onChange={handleTextInputChange}
        />
      )}

      {/* Render follow-up questions recursively */}
      {followUpQuestions && followUpQuestions.map((followUp, index) => (
        <Question
          key={`followUp_${index}`}
          data={followUp.question}
          onAnswer={onAnswer}
          answers={answers} //{/* Pass answers prop to the follow-up questions */}
        />
      ))}
    </div>
  );
};

export default Question;
