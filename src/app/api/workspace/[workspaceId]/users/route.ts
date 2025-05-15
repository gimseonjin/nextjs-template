import { NextRequest, NextResponse } from "next/server";
import { addWorkspaceUserSchema } from "@/features/workspace/schema";
import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";

/**
 * 워크스페이스의 팀원 목록을 조회합니다.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> }
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

    // 워크스페이스 접근 권한 체크
    const permissionCheck = mockDatabase.workspace_users.find(
      (wu) => wu.workspaceId === workspaceId && wu.userId === userId
    );

    if (!permissionCheck) {
      return NextResponse.json(
        { error: "워크스페이스에 접근할 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 팀원 목록 조회 (유저 정보 포함)
    const teamMembers = mockDatabase.workspace_users
      .filter((wu) => wu.workspaceId === workspaceId)
      .map((wu) => {
        const user = mockDatabase.users.find((u) => u.id === wu.userId);
        return {
          id: wu.id,
          userId: wu.userId,
          workspaceId: wu.workspaceId,
          name: user?.name || "Unknown User",
          email: user?.email || "unknown@example.com",
          role: wu.role,
          createdAt: wu.createdAt,
        };
      });

    return NextResponse.json({ data: teamMembers });
  } catch (error) {
    console.error("워크스페이스 팀원 목록 조회 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 워크스페이스에 새 팀원을 추가합니다.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> }
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

    // 워크스페이스 소유자인지 확인 (소유자만 팀원 추가 가능)
    const ownerCheck = mockDatabase.workspace_users.find(
      (wu) =>
        wu.workspaceId === workspaceId &&
        wu.userId === userId &&
        wu.role === "owner"
    );

    if (!ownerCheck) {
      return NextResponse.json(
        { error: "팀원을 추가할 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 요청 데이터 검증
    const body = await request.json();
    const validationResult = addWorkspaceUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "잘못된 요청 형식입니다.",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, role } = validationResult.data;

    // 이메일로 사용자 검색
    const userToAdd = mockDatabase.users.find((u) => u.email === email);

    // 이미 존재하는 사용자가 없다면 모의 사용자 생성
    const userIdToAdd = userToAdd?.id || mockDatabase.users.length + 1;

    // 이미 팀원으로 등록되어 있는지 확인
    const existingMember = mockDatabase.workspace_users.find(
      (wu) => wu.workspaceId === workspaceId && wu.userId === userIdToAdd
    );

    if (existingMember) {
      return NextResponse.json(
        { error: "이미 등록된 팀원입니다." },
        { status: 409 }
      );
    }

    // 새 팀원 생성 (실제로는 저장되지 않음)
    const newMemberId =
      Math.max(...mockDatabase.workspace_users.map((wu) => wu.id), 0) + 1;
    const newMember = {
      id: newMemberId,
      workspaceId,
      userId: userIdToAdd,
      role,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newMember });
  } catch (error) {
    console.error("워크스페이스 팀원 추가 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
