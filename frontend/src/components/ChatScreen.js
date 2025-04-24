import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MessageItem from './MessageItem';
import socketService from '../utils/socket';

const ChatScreen = ({ username, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    // Connect to socket server
    socketService.connect();
    
    // Listen for incoming messages
    socketService.onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    // Listen for previous messages
    socketService.onPreviousMessages((prevMessages) => {
      setMessages(prevMessages);
    });
    
    // Cleanup on component unmount
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      username: username,
      text: messageText,
      timestamp: new Date().toISOString(),
    };
    
    socketService.sendMessage(newMessage);
    setMessageText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat App</Text>
        <View style={styles.userInfo}>
          <Text style={styles.usernameDisplay}>Logged in as: {username}</Text>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        renderItem={({ item }) => (
          <MessageItem 
            message={item} 
            isOwnMessage={item.username === username} 
          />
        )}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#075E54',
    padding: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  usernameDisplay: {
    color: '#ECECEC',
    fontSize: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatScreen;