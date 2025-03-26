import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import App from './App';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { quizzes } from './src/data/quizzes';

// Test App component renders
test('App renders without crashing', () => {
  render(<App />);
});

// Test HomeScreen displays quizzes
test('HomeScreen shows quiz list', () => {
  render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
  expect(screen.getByText('Quiz Categories')).toBeTruthy();
  quizzes.forEach(quiz => {
    expect(screen.getByText(quiz.title)).toBeTruthy();
  });
});

// Test QuizScreen navigation
test('QuizScreen handles answers', () => {
  const mockNavigate = jest.fn();
  render(
    <QuizScreen 
      route={{ params: { quizId: '1' }}}
      navigation={{ navigate: mockNavigate }}
    />
  );
  
  // Verify first question appears
  const firstQuestion = quizzes[0].questions[0];
  expect(screen.getByText(firstQuestion.question)).toBeTruthy();
  
  // Test answering
  fireEvent.press(screen.getByText(firstQuestion.options[0]));
});

// Test ResultsScreen display
test('ResultsScreen shows score', () => {
  render(
    <ResultsScreen 
      route={{ params: { score: 3, totalQuestions: 5 }}}
      navigation={{ navigate: jest.fn() }}
    />
  );
  expect(screen.getByText('60%')).toBeTruthy();
  expect(screen.getByText('Good job! 👍')).toBeTruthy();
});