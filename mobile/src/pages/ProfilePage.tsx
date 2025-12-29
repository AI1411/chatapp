import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Tsubuyaki, User } from "../types";
import styles from "./ProfilePage.module.css";

// モックユーザーデータ
const mockUser: User = {
  id: "user1",
  email: "tanaka@example.com",
  displayName: "田中太郎",
  avatarUrl: undefined,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-12-01T15:30:00Z",
};

// モック自分のつぶやきデータ
const mockMyTsubuyakis: Tsubuyaki[] = [
  {
    id: "my1",
    userId: "user1",
    userName: "tanaka_dev",
    userDisplayName: "田中太郎",
    content: "今日からReact勉強始めました！楽しい！",
    likesCount: 12,
    repliesCount: 3,
    isLiked: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "my2",
    userId: "user1",
    userName: "tanaka_dev",
    userDisplayName: "田中太郎",
    content: "TypeScriptの型システム、奥が深い...",
    likesCount: 8,
    repliesCount: 2,
    isLiked: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "my3",
    userId: "user1",
    userName: "tanaka_dev",
    userDisplayName: "田中太郎",
    content: "Tauriでモバイルアプリ作ってます",
    likesCount: 25,
    repliesCount: 5,
    isLiked: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "たった今";
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;
  return date.toLocaleDateString("ja-JP");
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
}

export function ProfilePage() {
  const location = useLocation();
  const [user] = useState<User>(mockUser);
  const [myTsubuyakis] = useState<Tsubuyaki[]>(mockMyTsubuyakis);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>プロフィール</h1>
          <Link to="/settings" className={styles.settingsButton}>
            ⚙️
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>{user.displayName.charAt(0)}</div>
          </div>
          <h2 className={styles.displayName}>{user.displayName}</h2>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.joinDate}>📅 {formatDate(user.createdAt)} から利用</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{myTsubuyakis.length}</span>
              <span className={styles.statLabel}>つぶやき</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>128</span>
              <span className={styles.statLabel}>フォロワー</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>64</span>
              <span className={styles.statLabel}>フォロー中</span>
            </div>
          </div>

          <button type="button" className={styles.editButton}>
            プロフィールを編集
          </button>
        </section>

        <section className={styles.tsubuyakiSection}>
          <h3 className={styles.sectionTitle}>自分のつぶやき</h3>
          {myTsubuyakis.length === 0 ? (
            <div className={styles.emptyState}>
              <p>まだつぶやきがありません</p>
            </div>
          ) : (
            <ul className={styles.tsubuyakiList}>
              {myTsubuyakis.map((tsubuyaki, index) => (
                <li
                  key={tsubuyaki.id}
                  className={styles.tsubuyakiItem}
                  style={{ "--index": index } as React.CSSProperties}
                >
                  <p className={styles.tsubuyakiContent}>{tsubuyaki.content}</p>
                  <div className={styles.tsubuyakiMeta}>
                    <span>{formatTimeAgo(tsubuyaki.createdAt)}</span>
                    <span>❤️ {tsubuyaki.likesCount}</span>
                    <span>💬 {tsubuyaki.repliesCount}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <nav className={styles.bottomNav}>
        <Link to="/" className={styles.navItem}>
          <span className={styles.navIcon}>💭</span>
          <span className={styles.navLabel}>つぶやき</span>
        </Link>
        <Link
          to="/profile"
          className={`${styles.navItem} ${location.pathname === "/profile" ? styles.navItemActive : ""}`}
        >
          <span className={styles.navIcon}>👤</span>
          <span className={styles.navLabel}>プロフィール</span>
        </Link>
      </nav>
    </div>
  );
}
