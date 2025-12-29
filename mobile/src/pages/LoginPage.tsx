import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await invoke("login", { email, password });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backButton}>
          ← 戻る
        </Link>

        <div className={styles.header}>
          <div className={styles.logo}>💬</div>
          <h1 className={styles.title}>おかえりなさい</h1>
          <p className={styles.subtitle}>アカウントにログインしましょう</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner} />
                ログイン中...
              </>
            ) : (
              "ログイン"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>アカウントをお持ちでないですか？</p>
          <Link to="/register" className={styles.registerLink}>
            新規登録はこちら
          </Link>
        </div>

        <div className={styles.divider}>
          <span>または</span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <span>🍎</span>
            Appleでログイン
          </button>
          <button type="button" className={styles.socialButton}>
            <span>G</span>
            Googleでログイン
          </button>
        </div>
      </div>
    </div>
  );
}
