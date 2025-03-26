import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { quizzes } from '../data/quizzes';
import styles from '../styles/globalStyles';

const QuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const quiz = quizzes.find(q => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = `${currentQuestionIndex + 1}/${quiz.questions.length}`;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    
    setTimeout(() => {
      if (isCorrect) setScore(score + 1);
      
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        navigation.navigate('Results', { 
          score: isCorrect ? score + 1 : score, 
          totalQuestions: quiz.questions.length 
        });
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>Question: {progress}</Text>
      
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      
      {currentQuestion.options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === currentQuestion.correctAnswer;
        let buttonStyle = styles.button;
        
        if (selectedAnswer) {
          buttonStyle = isCorrect 
            ? [styles.button, { backgroundColor: '#4CAF50' }]
            : isSelected 
              ? [styles.button, { backgroundColor: '#F44336' }]
              : styles.button;
        }

        return (
          <TouchableOpacity
            key={index}
            style={buttonStyle}
            onPress={() => !selectedAnswer && handleAnswer(option)}
            disabled={selectedAnswer}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default QuizScreen;
