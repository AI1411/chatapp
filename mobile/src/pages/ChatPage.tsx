import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import type { Message } from "../types";

export function ChatPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (roomId) {
      loadMessages();
    }
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function loadMessages() {
    try {
      setLoading(true);
      const result = await invoke<Message[]>("get_messages", { roomId });
      setMessages(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !roomId) return;

    setSending(true);
    try {
      const message = await invoke<Message>("send_message", {
        roomId,
        content: newMessage.trim(),
      });
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="page chat-page">
        <div className="loading">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="page chat-page">
      <header className="chat-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>Chat Room</h1>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-sender">{message.senderId}</div>
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {new Date(message.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
        />
        <button type="submit" className="btn-primary" disabled={sending || !newMessage.trim()}>
          {sending ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
