import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../../src/components/LoginScreen';
import ChatScreen from '../../src/components/ChatScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (newUsername: string) => {
    try {
      await AsyncStorage.setItem('username', newUsername);
      setUsername(newUsername);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setUsername('');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      {isLoggedIn ? (
        <ChatScreen username={username} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </>
  );
}