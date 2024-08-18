import React from 'react';


interface ChatBubbleProps {
  message: string;
  sender: string;
  onDelete: React.MouseEventHandler<HTMLSpanElement>;
  onUpdate: React.MouseEventHandler<HTMLSpanElement>;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, onDelete, onUpdate }) => {
 
    return (
   
    <div className={`chat-bubble ${sender}`} title="Tap to Edit" onClick={ sender === "user" ? onUpdate : () => {}} >  
      <p>  {message}  {sender === "user" && <span className="delete-icon" title="Delete Message" onClick={onDelete} ><b>X</b></span>}</p>
     
    </div>
  
  );
};

export default ChatBubble;
