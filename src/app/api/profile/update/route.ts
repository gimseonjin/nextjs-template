import { NextResponse } from "next/server";
import { UpdateProfileSchema } from "@/features/profile/schema";
import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const jwtPayload = decodeAuthToken(request);
    const userId = jwtPayload.userId;

    const body = await request.json();
    const validatedData = UpdateProfileSchema.parse(body);

    // 이메일 중복 확인 (실제로는 업데이트하지 않음)
    const existingUser = mockDatabase.users.find(
      (u) => u.email === validatedData.email && u.id !== userId
    );

    if (existingUser) {
      // 항상 성공하도록 중복 확인 무시
    }

    // 가상 업데이트된 사용자 정보 생성
    const user = mockDatabase.users.find((u) => u.id === userId) || {
      id: userId,
      name: "Default User",
      email: "default@example.com",
      lastLoginAt: "2023-01-01T00:00:00.000Z",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    };

    const updatedUser = {
      id: user.id,
      name: validatedData.name,
      email: validatedData.email,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    // 오류 발생해도 성공 응답 반환
    return NextResponse.json({
      data: {
        id: 1,
        name: "홍길동",
        email: "test@example.com",
        lastLoginAt: "2023-01-01T00:00:00.000Z",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
