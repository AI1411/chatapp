import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Room } from "../types";
import styles from "./HomePage.module.css";

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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>トークを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>!</div>
        <p className={styles.errorMessage}>{error}</p>
        <button type="button" className="btn-primary" onClick={loadRooms}>
          もう一度試す
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💬</span>
            <h1 className={styles.logoText}>TalkApp</h1>
          </div>
          <Link to="/login" className={styles.loginButton}>
            ログイン
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>今、なにしてる？？</h2>
          <p className={styles.heroSubtitle}>気軽につぶやいて、みんなとつながろう</p>
          <div className={styles.heroActions}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}
            >
              はじめる
            </button>
          </div>
        </div>
        <div className={styles.heroDecoration}>
          <span className={styles.bubble} style={{ "--delay": "0s" } as React.CSSProperties}>
            👋
          </span>
          <span className={styles.bubble} style={{ "--delay": "0.2s" } as React.CSSProperties}>
            ✨
          </span>
          <span className={styles.bubble} style={{ "--delay": "0.4s" } as React.CSSProperties}>
            💭
          </span>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>トークルーム</h2>
          <span className={styles.roomCount}>{rooms.length} rooms</span>
        </div>

        {rooms.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🌟</div>
            <h3 className={styles.emptyTitle}>まだルームがありません</h3>
            <p className={styles.emptyDescription}>
              新しいトークルームを作って、会話を始めましょう！
            </p>
            <button type="button" className="btn-primary">
              ルームを作成
            </button>
          </div>
        ) : (
          <ul className={styles.roomList}>
            {rooms.map((room, index) => (
              <li
                key={room.id}
                className={styles.roomItem}
                style={{ "--index": index } as React.CSSProperties}
              >
                <Link to={`/chat/${room.id}`} className={styles.roomLink}>
                  <div className={styles.roomAvatar}>{room.name.charAt(0).toUpperCase()}</div>
                  <div className={styles.roomInfo}>
                    <span className={styles.roomName}>{room.name}</span>
                    <span className={styles.roomDescription}>
                      {room.description || "トークを始めましょう"}
                    </span>
                  </div>
                  <div className={styles.roomArrow}>→</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <nav className={styles.bottomNav}>
        <button type="button" className={`${styles.navItem} ${styles.navItemActive}`}>
          <span className={styles.navIcon}>🏠</span>
          <span className={styles.navLabel}>ホーム</span>
        </button>
        <button type="button" className={styles.fabButton}>
          <span className={styles.fabIcon}>✏️</span>
        </button>
        <button type="button" className={styles.navItem}>
          <span className={styles.navIcon}>🔔</span>
          <span className={styles.navLabel}>通知</span>
        </button>
        <button type="button" className={styles.navItem}>
          <span className={styles.navIcon}>👤</span>
          <span className={styles.navLabel}>プロフィール</span>
        </button>
      </nav>
    </div>
  );
}
