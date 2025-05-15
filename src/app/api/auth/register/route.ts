import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerPayloadSchema } from "@/features/auth/schema";
import { createAuthToken, mockDatabase } from "../../_utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedBody = registerPayloadSchema.parse(body);
    const { email, password, name } = validatedBody;

    // 비밀번호 암호화 (실제 저장은 하지 않음)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 새 사용자 ID 생성 (실제로는 데이터베이스에 저장되지 않음)
    const newUserId = Math.max(...mockDatabase.users.map((u) => u.id), 0) + 1;

    // 새 워크스페이스 ID 생성 (실제로는 데이터베이스에 저장되지 않음)
    const newWorkspaceId =
      Math.max(...mockDatabase.workspaces.map((w) => w.id), 0) + 1;

    // 항상 성공 응답 생성
    const accessToken = createAuthToken({
      userId: newUserId,
      email,
    });

    return NextResponse.json(
      {
        data: {
          accessToken,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
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
      { status: 201 }
    );
  }
}
