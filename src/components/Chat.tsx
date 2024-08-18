import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';

const Chat: React.FC = () => {
    const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState<any[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = chatRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleGetChatBotResponse = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("https://artisan-demo-backend.onrender.com/answer-query", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query: userQuery}),
        })

    let botMessage = await response.json();


    let newMessages = [{message:userQuery , sender:"user"}, {message:botMessage?.response , sender:"assistant"}]
    
    setMessages( messages => messages.concat(newMessages));
    setUserQuery("");
    
    
  }

  const handleDeleteMessage = (index: number, e: React.SyntheticEvent) => {
    e.stopPropagation();
    let updatedMessages = [...messages];
    updatedMessages.splice(index,1)
    setMessages(updatedMessages)
  }

  const handleUpdateMessage = (index: number) => {
    

    let updatedMessages = [...messages];
    let updatedMessage = prompt("Please enter message", updatedMessages[index]?.message);
    if(updatedMessage){
        updatedMessages[index] = {...updatedMessages[index], message:updatedMessage}
        setMessages(updatedMessages)
    }
    
  }

  return (
    <>
    <div className="chat" ref={chatRef}>
      {messages?.map((msg, index) => (
        <>
        <ChatBubble key={index} message={msg.message} sender={msg.sender} onDelete={(e) => handleDeleteMessage(index,e)} onUpdate={() => handleUpdateMessage(index)} />  
        </>
      ))}
     
     
    </div>
    <form onSubmit={handleGetChatBotResponse}>
        <input type="text" className="question-input-box" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder="Enter Question"  />
      </form>
    </>
  );
};

export default Chat;
