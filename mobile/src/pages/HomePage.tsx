import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Tsubuyaki } from "../types";
import styles from "./HomePage.module.css";

// モックデータ
const mockTsubuyakis: Tsubuyaki[] = [
  {
    id: "1",
    userId: "user1",
    userName: "tanaka_dev",
    userDisplayName: "田中太郎",
    content: "今日からReact勉強始めました！楽しい！",
    likesCount: 12,
    repliesCount: 3,
    isLiked: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    userId: "user2",
    userName: "sato_design",
    userDisplayName: "佐藤花子",
    userAvatarUrl: undefined,
    content: "新しいデザインツール試してみたけど、めっちゃ使いやすい！みんなにもおすすめしたい",
    likesCount: 45,
    repliesCount: 8,
    isLiked: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "3",
    userId: "user3",
    userName: "yamada_code",
    userDisplayName: "山田一郎",
    content: "TypeScriptの型パズル、解けた時の達成感がすごい",
    likesCount: 28,
    repliesCount: 5,
    isLiked: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "4",
    userId: "user4",
    userName: "suzuki_pm",
    userDisplayName: "鈴木美咲",
    content: "チームミーティング終わった！今日も良い議論ができた。プロジェクト順調に進んでる",
    likesCount: 15,
    repliesCount: 2,
    isLiked: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "5",
    userId: "user5",
    userName: "kobayashi_infra",
    userDisplayName: "小林健太",
    content: "Dockerのマルチステージビルド、最適化したらイメージサイズ半分になった",
    likesCount: 67,
    repliesCount: 12,
    isLiked: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
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

export function HomePage() {
  const location = useLocation();
  const [tsubuyakis, setTsubuyakis] = useState<Tsubuyaki[]>(mockTsubuyakis);

  function handleLike(id: string) {
    setTsubuyakis((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isLiked: !t.isLiked,
              likesCount: t.isLiked ? t.likesCount - 1 : t.likesCount + 1,
            }
          : t
      )
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
              つぶやく
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
          <h2 className={styles.sectionTitle}>みんなのつぶやき</h2>
          <span className={styles.roomCount}>{tsubuyakis.length} posts</span>
        </div>

        {tsubuyakis.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💭</div>
            <h3 className={styles.emptyTitle}>まだつぶやきがありません</h3>
            <p className={styles.emptyDescription}>最初のつぶやきを投稿してみましょう！</p>
            <button type="button" className="btn-primary">
              つぶやく
            </button>
          </div>
        ) : (
          <ul className={styles.tsubuyakiList}>
            {tsubuyakis.map((tsubuyaki, index) => (
              <li
                key={tsubuyaki.id}
                className={styles.tsubuyakiItem}
                style={{ "--index": index } as React.CSSProperties}
              >
                <div className={styles.tsubuyakiCard}>
                  <div className={styles.tsubuyakiHeader}>
                    <div className={styles.userAvatar}>{tsubuyaki.userDisplayName.charAt(0)}</div>
                    <div className={styles.userInfo}>
                      <span className={styles.userDisplayName}>{tsubuyaki.userDisplayName}</span>
                      <span className={styles.userMeta}>
                        @{tsubuyaki.userName} · {formatTimeAgo(tsubuyaki.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className={styles.tsubuyakiContent}>{tsubuyaki.content}</p>
                  <div className={styles.tsubuyakiActions}>
                    <button type="button" className={styles.actionButton} aria-label="返信">
                      <span className={styles.actionIcon}>💬</span>
                      <span className={styles.actionCount}>{tsubuyaki.repliesCount}</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.actionButton} ${tsubuyaki.isLiked ? styles.liked : ""}`}
                      onClick={() => handleLike(tsubuyaki.id)}
                      aria-label="いいね"
                    >
                      <span className={styles.actionIcon}>{tsubuyaki.isLiked ? "❤️" : "🤍"}</span>
                      <span className={styles.actionCount}>{tsubuyaki.likesCount}</span>
                    </button>
                    <button type="button" className={styles.actionButton} aria-label="シェア">
                      <span className={styles.actionIcon}>🔗</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <nav className={styles.bottomNav}>
        <Link
          to="/"
          className={`${styles.navItem} ${location.pathname === "/" ? styles.navItemActive : ""}`}
        >
          <span className={styles.navIcon}>💭</span>
          <span className={styles.navLabel}>つぶやき</span>
        </Link>
        <Link to="/profile" className={styles.navItem}>
          <span className={styles.navIcon}>👤</span>
          <span className={styles.navLabel}>プロフィール</span>
        </Link>
      </nav>
    </div>
  );
}
