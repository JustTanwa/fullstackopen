import React from 'react';

export default function Notification({ message, messageStyle }) {
  const successStyle = {
    border: '2px green solid',
    background: '#eee',
    color: 'green',
    fontSize: '1.25em',
    fontWeight: '600',
    padding: '10px 10px',
    margin: '10px 0',
  };

  const failedStyle = {
    border: '2px red solid',
    background: '#eee',
    color: 'red',
    fontSize: '1.25em',
    fontWeight: '600',
    padding: '10px 10px',
    margin: '10px 0',
  };

  const styles = {
    success: successStyle,
    failed: failedStyle,
  };
  if (message === null) {
    return null;
  }
  return <div className="notification-message" style={styles[messageStyle]}>{message}</div>;
}
