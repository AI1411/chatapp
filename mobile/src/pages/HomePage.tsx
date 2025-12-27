import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import type { Room } from "../types";

export function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      setLoading(true);
      const result = await invoke<Room[]>("get_rooms");
      setRooms(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error">{error}</div>
        <button onClick={loadRooms}>Retry</button>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <h1>ChatApp</h1>
        <Link to="/login" className="btn-secondary">
          Login
        </Link>
      </header>
      <main className="main">
        <h2>Chat Rooms</h2>
        {rooms.length === 0 ? (
          <p className="empty-state">No rooms available</p>
        ) : (
          <ul className="room-list">
            {rooms.map((room) => (
              <li key={room.id}>
                <Link to={`/chat/${room.id}`} className="room-item">
                  <span className="room-name">{room.name}</span>
                  <span className="room-description">{room.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
