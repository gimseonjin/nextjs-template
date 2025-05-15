import "server-only";

import jwt from "jsonwebtoken";

export type JwtPayload = {
  userId: number;
  email: string;
};

// 모의 데이터베이스 객체
export const mockDatabase = {
  users: [
    {
      id: 1,
      name: "홍길동",
      email: "test@example.com",
      passwordHash:
        "$2b$10$mHK1UyWK2xHbZEWGFrG6o.S.A1B/MW1RQrTkGmyH4kxvz13m3fqDq", // 'password123'에 대한 해시
      passwordSalt: "$2b$10$mHK1UyWK2xHbZEWGFrG6o.",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      lastLoginAt: "2023-01-01T00:00:00.000Z",
    },
  ],
  workspaces: [
    {
      id: 1,
      name: "기본 워크스페이스",
      userId: 1,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
  ],
  workspace_users: [
    {
      id: 1,
      workspaceId: 1,
      userId: 1,
      role: "owner",
      createdAt: "2023-01-01T00:00:00.000Z",
    },
  ],
  products: [],
  // 더 많은 테이블을 필요에 따라 추가
};

export function decodeAuthToken(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key"
  ) as JwtPayload;

  return decoded;
}

export function createAuthToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "1d",
  });
}
