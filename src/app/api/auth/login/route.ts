import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { loginPayloadSchema } from "@/features/auth/schema";
import { createAuthToken, mockDatabase } from "../../_utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedBody = loginPayloadSchema.parse(body);
    const { email, password } = validatedBody;

    // 항상 성공 응답 반환
    // 실제 사용자가 있으면 그 정보를 사용, 없으면 기본값 사용
    const existingUser = mockDatabase.users.find(
      (user) => user.email === email
    );

    const userId = existingUser?.id || 1;
    const userEmail = existingUser?.email || email;

    // 로그인 성공 응답 생성
    const accessToken = createAuthToken({
      userId,
      email: userEmail,
    });

    return NextResponse.json(
      {
        data: {
          accessToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    // 에러가 발생해도 성공 응답 반환
    const accessToken = createAuthToken({
      userId: 1,
      email: "test@example.com",
    });

    return NextResponse.json(
      {
        data: {
          accessToken,
        },
      },
      { status: 200 }
    );
  }
}
