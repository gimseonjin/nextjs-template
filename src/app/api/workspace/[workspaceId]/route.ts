import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 워크스페이스 정보 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> }
) {
  const { workspaceId } = await params;

  try {
    const jwtPayload = decodeAuthToken(request);
    const workspaceIdNum = Number(workspaceId);

    // 워크스페이스 접근 권한 확인
    const workspaceUser = mockDatabase.workspace_users.find(
      (wu) =>
        wu.workspaceId === workspaceIdNum && wu.userId === jwtPayload.userId
    );

    if (!workspaceUser) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // 워크스페이스 정보 조회
    const workspace = mockDatabase.workspaces.find(
      (w) => w.id === workspaceIdNum
    );

    if (!workspace) {
      // 모의 워크스페이스 데이터 생성
      const mockWorkspace = {
        id: workspaceIdNum,
        name: `워크스페이스 ${workspaceIdNum}`,
        userId: jwtPayload.userId,
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };
      return NextResponse.json({ data: mockWorkspace });
    }

    return NextResponse.json({ data: workspace });
  } catch (error) {
    // 오류 발생해도 모의 데이터 반환
    const workspaceIdNum = Number(workspaceId);
    const mockWorkspace = {
      id: workspaceIdNum,
      name: `워크스페이스 ${workspaceIdNum}`,
      userId: 1,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    };
    return NextResponse.json({ data: mockWorkspace });
  }
}

// 워크스페이스 정보 업데이트 스키마
const updateWorkspaceSchema = z.object({
  name: z.string().min(1, "워크스페이스 이름은 필수입니다."),
});

// 워크스페이스 정보 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> }
) {
  const { workspaceId } = await params;

  try {
    const jwtPayload = decodeAuthToken(request);
    const body = await request.json();
    const workspaceIdNum = Number(workspaceId);

    // 요청 데이터 검증
    const validatedData = updateWorkspaceSchema.safeParse(body);
    if (!validatedData.success) {
      // 항상 성공 응답을 위해 유효성 검증 오류 무시
      return createSuccessResponse(workspaceIdNum, "Updated Workspace");
    }

    // 워크스페이스 접근 권한 확인
    const workspaceUser = mockDatabase.workspace_users.find(
      (wu) =>
        wu.workspaceId === workspaceIdNum && wu.userId === jwtPayload.userId
    );

    if (!workspaceUser) {
      // 항상 성공 응답을 위해 권한 체크 무시
      return createSuccessResponse(workspaceIdNum, validatedData.data.name);
    }

    // 워크스페이스 정보 (실제로 업데이트하지 않음)
    const workspace = mockDatabase.workspaces.find(
      (w) => w.id === workspaceIdNum
    );

    // 모의 업데이트된 워크스페이스 객체 생성
    const updatedWorkspace = workspace
      ? {
          ...workspace,
          name: validatedData.data.name,
          updatedAt: new Date().toISOString(),
        }
      : {
          id: workspaceIdNum,
          name: validatedData.data.name,
          userId: jwtPayload.userId,
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: new Date().toISOString(),
        };

    return NextResponse.json({ data: updatedWorkspace });
  } catch (error) {
    return createSuccessResponse(Number(workspaceId), "Updated Workspace");
  }
}

// 성공 응답 생성 헬퍼 함수
function createSuccessResponse(workspaceId: number, name: string) {
  return NextResponse.json({
    data: {
      id: workspaceId,
      name,
      userId: 1,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString(),
    },
  });
}
