import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/config';

const Alert = ({ type = 'info', title, message, dismissible = true, onDismiss }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#d1fae5';
      case 'error':
        return '#fee2e2';
      case 'warning':
        return '#fef3c7';
      case 'info':
      default:
        return '#dbeafe';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return '#065f46';
      case 'error':
        return '#7f1d1d';
      case 'warning':
        return '#92400e';
      case 'info':
      default:
        return '#1e40af';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return '#6ee7b7';
      case 'error':
        return '#fca5a5';
      case 'warning':
        return '#fcd34d';
      case 'info':
      default:
        return '#93c5fd';
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderLeftColor: getBorderColor(),
        },
      ]}
    >
      <View style={styles.content}>
        {title && <Text style={[styles.title, { color: getTextColor() }]}>{title}</Text>}
        {message && <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>}
      </View>
      {dismissible && onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Text style={{ color: getTextColor() }}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderRadius: 6,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default Alert;
