import {
  deleteProductSchema,
  updateProductSchema,
} from "@/features/product/schema";
import { NextResponse } from "next/server";
import { mockDatabase } from "@/app/api/_utils";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const input = updateProductSchema.parse({
      ...body,
      id: (await params).id,
    });

    // 제품이 존재하는지 확인
    const existingProduct = mockDatabase.products.find(
      (p) => p.id === input.id && p.workspaceId === input.workspaceId
    );

    if (!existingProduct) {
      // 모의 응답을 위해 임시 제품 생성
      const updatedProduct = {
        id: input.id,
        workspaceId: input.workspaceId,
        name: input.name,
        price: input.price,
        imageUrl: input.imageUrl,
        status: input.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return NextResponse.json({ data: updatedProduct });
    }

    // 실제로는 업데이트하지 않고 업데이트된 제품 객체만 반환
    const updatedProduct = {
      ...existingProduct,
      name: input.name,
      price: input.price,
      imageUrl: input.imageUrl,
      status: input.status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    // 오류 발생해도 성공 응답 반환
    return NextResponse.json({
      data: {
        id: "1",
        name: "Sample Product",
        price: 1000,
        imageUrl: "https://picsum.photos/200",
        status: "sale",
        workspaceId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const url = new URL(req.url);
  const workspaceId = url.searchParams.get("workspaceId");

  try {
    const input = deleteProductSchema.parse({
      id: (await params).id,
      workspaceId,
    });

    // 모의 데이터베이스에서 제품 조회 (실제로는 삭제하지 않음)
    const existingProduct = mockDatabase.products.find(
      (p) => p.id === input.id && p.workspaceId === Number(input.workspaceId)
    );

    // 항상 성공 응답 반환
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    // 오류 발생해도 성공 응답 반환
    return NextResponse.json({ success: true });
  }
}
