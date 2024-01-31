import { useState } from 'react';
import { useRouter } from 'next/router';
import questionnaireData from '../data/questions.json';
import Question from './Question';

const Questionnaire = () => {
    const router = useRouter();
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleContinue = () => {
        debugger
        const currentQuestionId = questionnaireData[currentQuestionIndex].id;
        if (answers[currentQuestionId]) {
            const followUpQuestion = getFollowUpQuestion(currentQuestionId, answers[currentQuestionId]);
            if (followUpQuestion) {
                setAnswers({ ...answers, [followUpQuestion.question.id]: null });
                setCurrentQuestionIndex(followUpQuestion.question.id);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        } else {
            alert('Please answer the current question before continuing.');
        }
    };

    const handleSubmit = () => {
        console.log('Submitted Answers:', answers);
        router.push('/thank-you');
    };

    const getFollowUpQuestion = (questionId, answer) => {
        debugger
        const question = questionnaireData.find(q => q.id === questionId);
        if (question.followUpQuestion) {
            if (Array.isArray(question.followUpQuestion)) {
                // If followUpQuestion is an array, use .find
                return question.followUpQuestion.find(followUp => {
                    const logicalCondition = followUp.condition.replace("answer", answer);
                    return eval(logicalCondition);
                });
            } else {
                // If followUpQuestion is a single object, directly check the condition
                const logicalCondition = question.followUpQuestion.condition.replace("answer", answer);
                if (eval(logicalCondition)) {
                    return question.followUpQuestion;
                }
            }
        }
        return null;
    };

    return (
        <div>
            {currentQuestionIndex < questionnaireData.length ? (
                <Question
                    data={questionnaireData[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    answers={answers}
                />
            ) : (
                <button onClick={handleSubmit}>Submit</button>
            )}
            <button onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default Questionnaire;
