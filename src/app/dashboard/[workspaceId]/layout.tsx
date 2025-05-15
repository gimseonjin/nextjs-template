import { DashboardTemplate } from "@/components/templates/dashboard";
import { notFound, redirect } from "next/navigation";
import { createMainServerClient } from "@/lib/remote/main/server";
import { checkAccessToken } from "@/lib/server/hasAccessToken";
import { DashboardProvider } from "@/providers/dashboard";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const hasAccessToken = await checkAccessToken();

  if (!hasAccessToken) {
    console.log("no access token");
    return redirect("/auth/login");
  }

  const apiClient = await createMainServerClient();
  const { hasPermission } = await apiClient.get<{
    hasPermission: boolean;
  }>(`/workspace/${workspaceId}/check-permission`);

  if (!hasPermission) {
    return notFound();
  }

  const user = {
    id: 1,
    name: "홍길동",
    email: "test@example.com",
    passwordHash:
      "$2b$10$mHK1UyWK2xHbZEWGFrG6o.S.A1B/MW1RQrTkGmyH4kxvz13m3fqDq", // 'password123'에 대한 해시
    passwordSalt: "$2b$10$mHK1UyWK2xHbZEWGFrG6o.",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    lastLoginAt: "2023-01-01T00:00:00.000Z",
  };

  const workspace = {
    id: 1,
    name: "기본 워크스페이스",
    userId: 1,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  };

  return (
    <DashboardProvider workspace={workspace} user={user}>
      <DashboardTemplate>{children}</DashboardTemplate>
    </DashboardProvider>
  );
}
