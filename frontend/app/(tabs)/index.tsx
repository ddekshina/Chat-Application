import React from 'react';
import { StatusBar } from 'react-native';
import ChatScreen from '../../src/components/ChatScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ChatScreen />
    </>
  );
}