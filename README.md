# ChatApp

Tauri v2 ベースのモバイルチャットアプリケーション

## 技術スタック

### フロントエンド（モバイル UI）
- React (TypeScript)
- Vite
- Tauri v2
- WebView (iOS / Android)

### モバイルアプリ内バックエンド（ホスト）
- Rust (stable)
- Tauri Core
- gRPC クライアント: tonic
- Protocol Buffers

### バックエンド API（サーバ）
- Rust
- gRPC サーバ: tonic
- Protocol Buffers
- PostgreSQL
- DB アクセス: sqlx

### インフラ
- Docker / Docker Compose
- PostgreSQL (Docker コンテナ)

## プロジェクト構造

```
chatapp/
├── Cargo.toml              # Cargo workspace 設定
├── crates/
│   ├── api-server/         # バックエンド API サーバ
│   └── shared/             # 共通コード（Proto 生成コード等）
├── proto/                  # Protocol Buffers 定義
├── mobile/                 # Tauri v2 モバイルアプリ
│   ├── src/                # React フロントエンド
│   └── src-tauri/          # Tauri Rust コード
├── docker/                 # Docker 設定
└── .github/workflows/      # CI 設定
```

## 開発環境のセットアップ

### 必要条件

- Rust (stable)
- Node.js 22+
- Docker & Docker Compose
- Protocol Buffers コンパイラ (`protoc`)

#### macOS
```bash
brew install protobuf
```

#### Ubuntu/Debian
```bash
sudo apt-get install protobuf-compiler
```

### 環境変数の設定

```bash
cp .env.example .env
# .env ファイルを編集して適切な値を設定
```

### データベースの起動

開発用 PostgreSQL を起動:
```bash
docker compose up -d
```

### API サーバの起動

```bash
cargo run --package api-server
```

### モバイルアプリの起動

```bash
cd mobile
npm install
npm run tauri:dev
```

### モバイル（Android/iOS）での起動

```bash
cd mobile

# Android
npm run tauri:android

# iOS (macOS のみ)
npm run tauri:ios
```

## 本番ビルド

### Docker での API サーバビルド

```bash
docker compose build api-server
docker compose up -d
```

### モバイルアプリのビルド

```bash
cd mobile
npm run tauri:build
```

## 開発コマンド

### Rust

```bash
# フォーマット
cargo fmt

# Lint
cargo clippy

# テスト
cargo test
```

### フロントエンド

```bash
cd mobile

# Lint + フォーマットチェック（Biome）
npm run check

# Lint + フォーマット自動修正
npm run check:fix

# Lint のみ
npm run lint

# フォーマットのみ
npm run format

# 型チェック
npm run typecheck
```

## ライセンス

MIT License
