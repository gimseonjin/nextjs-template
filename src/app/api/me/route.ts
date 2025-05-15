import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const jwtPayload = decodeAuthToken(request);

    // 모의 데이터베이스에서 사용자 검색
    const user = mockDatabase.users.find(
      (user) => user.id === jwtPayload.userId
    );

    if (!user) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("사용자 정보 조회 오류:", error);
    return NextResponse.json({ data: null });
  }
}
