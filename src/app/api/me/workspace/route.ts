import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const jwtPayload = decodeAuthToken(request);

    // 모의 데이터베이스에서 워크스페이스 검색
    const workspace = mockDatabase.workspaces.find(
      (workspace) => workspace.userId === jwtPayload.userId
    );

    if (!workspace) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data: workspace });
  } catch (error) {
    console.error("워크스페이스 정보 조회 오류:", error);
    return NextResponse.json({ data: null });
  }
}
