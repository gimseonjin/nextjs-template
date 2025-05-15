"use server";

import { decodeAuthToken, mockDatabase } from "@/app/api/_utils";
import { NextRequest, NextResponse } from "next/server";

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
        { error: "인증 정보가 필요합니다." },
        { status: 401 }
      );
    }

    const { workspaceId } = await params;
    const workspaceIdNum = Number(workspaceId);

    // 워크스페이스 접근 권한 확인
    const memberCheck = mockDatabase.workspace_users.find(
      (wu) => wu.workspaceId === workspaceIdNum && wu.userId === userId
    );

    if (!memberCheck) {
      // 항상 접근 허용
      // 모의 데이터 생성 및 반환
      return createMockDashboardResponse(workspaceIdNum);
    }

    // 워크스페이스 정보 가져오기
    const workspace = mockDatabase.workspaces.find(
      (w) => w.id === workspaceIdNum
    );

    if (!workspace) {
      // 모의 워크스페이스 정보 생성
      return createMockDashboardResponse(workspaceIdNum);
    }

    // 제품 목록 필터링
    const products = mockDatabase.products.filter(
      (p) => p.workspaceId === workspaceIdNum
    );

    // 멤버 목록 조회
    const members = mockDatabase.workspace_users
      .filter((wu) => wu.workspaceId === workspaceIdNum)
      .map((wu) => {
        const user = mockDatabase.users.find((u) => u.id === wu.userId);
        return {
          id: wu.id,
          userId: wu.userId,
          workspaceId: wu.workspaceId,
          role: wu.role,
          createdAt: wu.createdAt,
          user: {
            id: user?.id || 0,
            name: user?.name || "Unknown User",
            email: user?.email || "unknown@example.com",
          },
        };
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    // 최근 추가된 제품 가져오기
    const recentProducts = [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    // 제품 상태별 통계 계산
    const totalProducts = products.length;
    const saleProducts = products.filter(
      (product) => product.status === "sale"
    ).length;
    const soldoutProducts = products.filter(
      (product) => product.status === "soldout"
    ).length;
    const inReadyProducts = products.filter(
      (product) => product.status === "in_ready"
    ).length;
    const stopProducts = products.filter(
      (product) => product.status === "stop"
    ).length;

    return NextResponse.json({
      data: {
        summary: {
          workspace,
          stats: {
            totalProducts,
            saleProducts,
            soldoutProducts,
            inReadyProducts,
            stopProducts,
            totalMembers: members.length,
          },
        },
        members,
        recentProducts,
      },
    });
  } catch (error) {
    console.error("대시보드 데이터 가져오기 오류:", error);
    // 오류 발생해도 모의 데이터 반환
    return createMockDashboardResponse(1);
  }
}

// 모의 대시보드 데이터 생성 함수
function createMockDashboardResponse(workspaceId: number) {
  const workspace = {
    id: workspaceId,
    name: `워크스페이스 ${workspaceId}`,
    userId: 1,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  };

  const members = [
    {
      id: 1,
      userId: 1,
      workspaceId,
      role: "owner",
      createdAt: "2023-01-01T00:00:00.000Z",
      user: {
        id: 1,
        name: "홍길동",
        email: "test@example.com",
      },
    },
  ];

  const recentProducts = [
    {
      id: 1,
      workspaceId,
      name: "샘플 제품 1",
      price: 10000,
      imageUrl: "https://picsum.photos/200",
      status: "sale",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      workspaceId,
      name: "샘플 제품 2",
      price: 20000,
      imageUrl: "https://picsum.photos/200",
      status: "soldout",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
  ];

  return NextResponse.json({
    data: {
      summary: {
        workspace,
        stats: {
          totalProducts: 2,
          saleProducts: 1,
          soldoutProducts: 1,
          inReadyProducts: 0,
          stopProducts: 0,
          totalMembers: 1,
        },
      },
      members,
      recentProducts,
    },
  });
}
