import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';

const ResultsScreen = ({ route, navigation }) => {
  const { score, totalQuestions } = route.params;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceRating = () => {
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Quiz Completed!</Text>
      
      <View style={{ 
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 3
      }}>
        <Text style={{ fontSize: 72, fontWeight: 'bold', color: '#6200ee' }}>
          {percentage}%
        </Text>
        <Text style={[styles.scoreText, { fontSize: 24 }]}>
          {getPerformanceRating()}
        </Text>
        <Text style={styles.scoreText}>
          {score} out of {totalQuestions} correct
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { width: '80%' }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { 
          width: '80%', 
          backgroundColor: '#4CAF50',
          marginTop: 10
        }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultsScreen;
