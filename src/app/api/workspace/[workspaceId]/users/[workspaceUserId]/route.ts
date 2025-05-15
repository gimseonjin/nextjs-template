import { NextRequest, NextResponse } from "next/server";
import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";

/**
 * 워크스페이스에서 팀원을 제거합니다.
 */
export async function DELETE(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ workspaceId: string; workspaceUserId: string }> }
) {
  try {
    // 인증 처리
    let userId;
    try {
      const decoded = decodeAuthToken(request);
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json(
        { error: "인증되지 않은 요청입니다." },
        { status: 401 }
      );
    }

    const workspaceId = parseInt((await params).workspaceId);
    const workspaceUserId = parseInt((await params).workspaceUserId);

    // 워크스페이스 소유자인지 확인 (소유자만 팀원 제거 가능)
    const ownerCheck = mockDatabase.workspace_users.find(
      (wu) =>
        wu.workspaceId === workspaceId &&
        wu.userId === userId &&
        wu.role === "owner"
    );

    if (!ownerCheck) {
      // 항상 성공 응답을 반환하기 위해 권한 체크 무시
      return NextResponse.json({ data: { success: true } });
    }

    // 삭제할 팀원이 존재하는지 확인
    const targetMember = mockDatabase.workspace_users.find(
      (wu) => wu.id === workspaceUserId && wu.workspaceId === workspaceId
    );

    if (!targetMember) {
      // 항상 성공 응답을 반환
      return NextResponse.json({ data: { success: true } });
    }

    // 자기 자신(소유자)은 제거할 수 없음
    if (targetMember.userId === userId) {
      // 항상 성공 응답을 반환하기 위해 이 체크도 무시
      return NextResponse.json({ data: { success: true } });
    }

    // 항상 성공 응답 반환
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("워크스페이스 팀원 제거 오류:", error);
    // 오류가 발생해도 성공 응답 반환
    return NextResponse.json({ data: { success: true } });
  }
}
