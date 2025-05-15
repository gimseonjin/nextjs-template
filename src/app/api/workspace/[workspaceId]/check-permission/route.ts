import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> }
) {
  try {
    const { workspaceId } = await params;
    const jwtPayload = decodeAuthToken(request);

    // 모의 데이터베이스에서 워크스페이스 사용자 권한 확인
    const workspaceUser = mockDatabase.workspace_users.find(
      (wu) =>
        wu.workspaceId === Number(workspaceId) &&
        wu.userId === jwtPayload.userId
    );

    if (!workspaceUser) {
      return NextResponse.json({ data: { hasPermission: false } });
    }

    return NextResponse.json({ data: { hasPermission: true } });
  } catch (error) {
    console.error("권한 확인 오류:", error);
    return NextResponse.json({ data: { hasPermission: false } });
  }
}
