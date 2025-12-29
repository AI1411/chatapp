// User types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Room types
export interface Room {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}

// Message types
export type MessageType = "text" | "image" | "file";

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: MessageType;
  createdAt: string;
}

// Tsubuyaki (Tweet) types
export interface Tsubuyaki {
  id: string;
  userId: string;
  userName: string;
  userDisplayName: string;
  userAvatarUrl?: string;
  content: string;
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
  createdAt: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
