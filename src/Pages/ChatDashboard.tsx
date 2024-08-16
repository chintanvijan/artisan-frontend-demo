import React from 'react';
import Header from '../components/Header';
import Chat from '../components/Chat';

const ChatDashboard: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Chat />
    </div>
  );
};

export default ChatDashboard;
