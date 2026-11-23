import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Send, Bot, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { sendAIMessage } from '../services/aiService';
import { setRobotState as setGlobalRobotState } from '../services/robotStateStore';

function AIInterface({ onRobotStateChange }) {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'robot',
      text: "Hello! I am your Robot Head AI companion. Ask me anything about artificial intelligence, modern engineering, or our 3D kinematics.",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatMessagesAreaRef = useRef(null);
  const msgCounterRef = useRef(1);

  const quickPrompts = [
    'Who are you?',
    'What can you do?',
    'Tell me about AI',
    'Help me learn React',
  ];

  // Auto-scroll ONLY inside the chat messages container, never scrolling the browser window
  const scrollToBottom = useCallback(() => {
    if (chatMessagesAreaRef.current) {
      chatMessagesAreaRef.current.scrollTo({
        top: chatMessagesAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1 || isThinking) {
      scrollToBottom();
    }
  }, [messages, isThinking, scrollToBottom]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isThinking) return;

    msgCounterRef.current += 1;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 1. Add user message
    const userMsg = {
      id: `usr-${msgCounterRef.current}`,
      sender: 'user',
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // 2. Set Robot State to THINKING
    setGlobalRobotState('THINKING');
    if (onRobotStateChange) {
      onRobotStateChange('THINKING');
    }

    try {
      // 3. Call AI Service
      const botResponse = await sendAIMessage(query);

      // 4. Set Robot State to RESPONDING
      setGlobalRobotState('RESPONDING');
      if (onRobotStateChange) {
        onRobotStateChange('RESPONDING');
      }

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error('Chat error:', err);
      msgCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${msgCounterRef.current}`,
          sender: 'robot',
          text: "I experienced a brief synchronization delay. Please ask again!",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsThinking(false);
      // Return to IDLE after brief pause
      setTimeout(() => {
        setGlobalRobotState('IDLE');
        if (onRobotStateChange) {
          onRobotStateChange('IDLE');
        }
      }, 1200);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="section-container" id="chat">
      <div className="section-head-minimal" data-reveal-stagger>
        <div className="section-tag">
          <MessageSquare size={12} />
          <span>CONVERSATION</span>
        </div>
        <h2 className="section-headline-editorial">
          Talk to Your Robot
        </h2>
        <p className="section-description-minimal">
          Experience conversational intelligence mirrored by our 3D humanoid avatar in real time.
        </p>
      </div>

      <div className="chat-layout-minimal" data-reveal-stagger>
        {/* Left Side: Status & Suggested Inquiries */}
        <div className="chat-sidebar-luxury">
          {/* Status Box */}
          <div className="chat-status-indicator-box">
            <span className="status-box-title">ROBOT TELEMETRY</span>
            <div className="status-live-row">
              <span className={`status-dot-circle ${isThinking ? 'thinking' : 'online'}`} />
              <span className="status-live-label">
                {isThinking ? 'THINKING' : 'ONLINE & READY'}
              </span>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="chat-prompts-group">
            <span className="chat-prompts-title">SUGGESTED INQUIRIES</span>
            <div className="chat-prompts-list">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  className="chat-prompt-pill"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isThinking}
                >
                  <Sparkles size={13} className="pill-sparkle-icon" />
                  <span>{prompt}</span>
                  <ArrowUpRight size={12} className="pill-arrow-icon" />
                </button>
              ))}
            </div>
          </div>

          {/* Minimal Explainer */}
          <div className="chat-context-note">
            <strong className="note-accent-heading">Neural Mirroring:</strong> Every inquiry triggers physical cognitive states in the 3D robot head above—observe it search and nod as answers are synthesized.
          </div>
        </div>

        {/* Right Side: Chat Window Card */}
        <div className="chat-terminal-card">
          {/* Top Bar */}
          <div className="chat-terminal-topbar">
            <div className="chat-terminal-identity">
              <div className="chat-avatar-frame">
                <Bot size={16} />
              </div>
              <div className="chat-title-group">
                <span className="chat-title-main">Robot Head Intelligence</span>
                <span className="chat-title-sub">NLP v5.0 Connected</span>
              </div>
            </div>
            <div className="chat-terminal-lights" aria-hidden="true">
              <span className="t-dot" />
              <span className="t-dot" />
              <span className="t-dot" />
            </div>
          </div>

          {/* Messages Stream */}
          <div className="chat-messages-container" ref={chatMessagesAreaRef} aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${msg.sender === 'user' ? 'row-user' : 'row-robot'}`}
              >
                {msg.sender === 'robot' && (
                  <div className="chat-bubble-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className={`chat-bubble-body ${msg.sender === 'user' ? 'bubble-user' : 'bubble-robot'}`}>
                  <p className="bubble-text">{msg.text}</p>
                  <span className="bubble-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="chat-bubble-row row-robot">
                <div className="chat-bubble-avatar">
                  <Bot size={14} />
                </div>
                <div className="chat-bubble-body bubble-robot bubble-thinking">
                  <div className="typing-indicator-dots">
                    <span className="t-dot-anim" />
                    <span className="t-dot-anim" />
                    <span className="t-dot-anim" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="chat-input-text"
              placeholder="Ask anything... (e.g. 'Tell me about AI')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isThinking}
              aria-label="Chat query input"
            />
            <button
              type="submit"
              className="btn-chat-submit"
              disabled={!inputText.trim() || isThinking}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default memo(AIInterface);
