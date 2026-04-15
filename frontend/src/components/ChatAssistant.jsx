import React, { useState } from 'react';
import { weatherAPI } from '../services/api';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI Weather Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await weatherAPI.sendMessage(input);
      const botMsg = { role: 'bot', text: response.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card chat-container">
      <div className="chat-header">
        <h3>Assistant</h3>
        <div className="status-dot"></div>
      </div>
      
      <div className="messages-list">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="message bot loading">Typing...</div>}
      </div>

      <form onSubmit={handleSend} className="chat-input-area">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask me something..."
        />
        <button type="submit">↑</button>
      </form>

      <style jsx>{`
        .chat-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
        .chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: #4caf50;
          border-radius: 50%;
        }
        .messages-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .message {
          padding: 10px 14px;
          border-radius: 12px;
          max-width: 85%;
          font-size: 0.9rem;
        }
        .message.bot {
          background: rgba(255, 255, 255, 0.1);
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }
        .message.user {
          background: var(--accent-violet);
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }
        .chat-input-area {
          display: flex;
          gap: 8px;
        }
        .chat-input-area input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--gl-border);
          padding: 10px;
          border-radius: 8px;
          color: white;
          outline: none;
        }
        .chat-input-area button {
          background: var(--accent-cyan);
          border: none;
          color: black;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ChatAssistant;
