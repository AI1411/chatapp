.PHONY: help dev stop logs clean build test lint fmt check docker-build docker-up docker-down docker-logs grpc-list grpc-describe mobile-dev mobile-android mobile-ios proto

# Default target
help:
	@echo "ChatApp Development Commands"
	@echo ""
	@echo "Docker:"
	@echo "  make up              - Start all services (PostgreSQL + API server)"
	@echo "  make down            - Stop all services"
	@echo "  make logs            - Show API server logs"
	@echo "  make logs-all        - Show all container logs"
	@echo "  make rebuild         - Rebuild and restart all services"
	@echo ""
	@echo "Development:"
	@echo "  make dev             - Run API server locally (requires local DB)"
	@echo "  make build           - Build all Rust crates"
	@echo "  make test            - Run all tests"
	@echo "  make lint            - Run clippy linter"
	@echo "  make fmt             - Format all Rust code"
	@echo "  make check           - Run fmt check + clippy + test"
	@echo ""
	@echo "Mobile:"
	@echo "  make mobile-dev      - Run mobile app in development mode"
	@echo "  make mobile-android  - Run mobile app on Android"
	@echo "  make mobile-ios      - Run mobile app on iOS (macOS only)"
	@echo "  make mobile-build    - Build mobile app for production"
	@echo "  make mobile-lint     - Lint frontend code"
	@echo "  make mobile-check    - Check frontend (lint + typecheck)"
	@echo ""
	@echo "gRPC:"
	@echo "  make grpc-list       - List available gRPC services"
	@echo "  make grpc-describe   - Describe all gRPC services"
	@echo ""
	@echo "Utilities:"
	@echo "  make proto           - Regenerate proto files"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make db-shell        - Connect to PostgreSQL shell"

# =============================================================================
# Docker Commands
# =============================================================================

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f api-server

logs-all:
	docker compose logs -f

rebuild:
	docker compose down
	docker compose up -d --build

# =============================================================================
# Development Commands
# =============================================================================

dev:
	cargo run --package api-server

build:
	cargo build --all

test:
	cargo test --all

lint:
	cargo clippy --all-targets --all-features -- -D warnings

fmt:
	cargo fmt --all

fmt-check:
	cargo fmt --all -- --check

check: fmt-check lint test

# =============================================================================
# Mobile Commands
# =============================================================================

mobile-dev:
	cd mobile && npm run tauri:dev

mobile-android:
	cd mobile && npm run tauri:android

mobile-ios:
	cd mobile && npm run tauri:ios

mobile-build:
	cd mobile && npm run tauri:build

mobile-install:
	cd mobile && npm install

mobile-lint:
	cd mobile && npm run check

mobile-check:
	cd mobile && npm run check && npm run typecheck

# =============================================================================
# gRPC Commands
# =============================================================================

grpc-list:
	grpcurl -plaintext localhost:50051 list

grpc-describe:
	@echo "=== ChatService ==="
	@grpcurl -plaintext localhost:50051 describe chat.ChatService
	@echo ""
	@echo "=== UserService ==="
	@grpcurl -plaintext localhost:50051 describe user.UserService

# =============================================================================
# Utility Commands
# =============================================================================

proto:
	cargo build --package shared

clean:
	cargo clean
	cd mobile && rm -rf node_modules dist

db-shell:
	docker compose exec postgres psql -U chatapp -d chatapp
