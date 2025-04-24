import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageItem = ({ message, isOwnMessage }) => {
  return (
    <View style={[
      styles.messageContainer,
      isOwnMessage ? styles.ownMessage : styles.otherMessage
    ]}>
      <Text style={styles.username}>{message.username}</Text>
      <Text style={styles.messageText}>{message.text}</Text>
      {message.timestamp && (
        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 12,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#777',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default MessageItem;