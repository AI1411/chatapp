# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Tauri v2-based mobile chat application with a Rust gRPC backend. The app uses React/TypeScript for the UI, communicates via Protocol Buffers, and stores data in PostgreSQL.

## Development Commands

### Prerequisites
- Rust (stable), Node.js 22+, Docker, `protoc` (Protocol Buffers compiler)
- Copy `.env.example` to `.env` and configure

### Database
```bash
docker compose up -d postgres          # Start PostgreSQL
```

### API Server
```bash
cargo run --package api-server         # Run API server (port 50051)
cargo build --release --package api-server  # Release build
```

### Mobile App
```bash
cd mobile
npm install
npm run tauri:dev                      # Desktop development
npm run tauri:android                  # Android development
npm run tauri:ios                      # iOS development (macOS only)
npm run tauri:build                    # Production build
```

### Linting & Testing

**Rust:**
```bash
cargo fmt                              # Format all Rust code
cargo fmt -- --check                   # Check formatting
cargo clippy --all-targets --all-features -- -D warnings  # Lint
cargo test --all                       # Run all tests
cargo test --package api-server        # Test specific crate
```

**Frontend (from mobile/):**
```bash
npm run check                          # Biome lint + format check
npm run check:fix                      # Auto-fix lint/format issues
npm run typecheck                      # TypeScript type checking
```

### Proto Generation
Proto files are auto-compiled on Rust build via `crates/shared/build.rs`. Generated code goes to `crates/shared/src/proto/`.

## Architecture

### Workspace Structure
- **Cargo workspace** with three members: `api-server`, `shared`, `mobile/src-tauri`
- Shared dependencies defined in root `Cargo.toml` via workspace dependencies

### Data Flow
```
React UI (mobile/src/)
    ↓ Tauri commands
Rust Host (mobile/src-tauri/)
    ↓ gRPC client (tonic)
API Server (crates/api-server/)
    ↓ sqlx
PostgreSQL
```

### Key Crates
- **crates/shared**: Proto-generated code (chat, user, common services) - used by both api-server and mobile
- **crates/api-server**: gRPC server implementation with PostgreSQL backend
- **mobile/src-tauri**: Tauri app host with gRPC client

### Protocol Buffers
- Definitions in `proto/`: `user.proto` (auth), `chat.proto` (rooms/messages), `common.proto` (shared types)
- Uses idempotency keys (`request_id`) for mutations
- Pagination via `PaginationRequest` in common.proto

### Frontend
- React with react-router-dom for routing
- Tauri plugins: fs, notification (shell on desktop only)
- Biome for linting/formatting (replaces ESLint/Prettier)

## Code Style

### Rust
- Max line width: 100 chars
- Imports: grouped by std/external/crate, module granularity
- Clippy: cognitive-complexity-threshold=25, too-many-lines=100
- `allow-unwrap-in-tests = true`

### TypeScript
- Biome with recommended rules
- 2-space indent, double quotes, trailing commas (ES5), semicolons required
- Strict: `noUnusedImports`, `noUnusedVariables` as errors
