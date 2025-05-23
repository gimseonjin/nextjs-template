import { httpClient } from "@/remote/http-client";

export interface ExampleData {
  id: number;
  title: string;
  description: string;
}

export async function getExampleData(): Promise<ExampleData[]> {
  // 실제 API가 없으므로 더미 데이터를 반환합니다
  return [
    {
      id: 1,
      title: "예시 항목 1",
      description: "이것은 예시 항목 1에 대한 설명입니다.",
    },
    {
      id: 2,
      title: "예시 항목 2",
      description: "이것은 예시 항목 2에 대한 설명입니다.",
    },
  ];
} 