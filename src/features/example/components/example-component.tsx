"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ExampleComponentProps {
  title: string;
}

export function ExampleComponent({ title }: ExampleComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">현재 카운트: {count}</p>
      <div className="flex gap-2">
        <Button onClick={() => setCount(count + 1)}>증가</Button>
        <Button variant="outline" onClick={() => setCount(count - 1)}>감소</Button>
        <Button variant="secondary" onClick={() => setCount(0)}>초기화</Button>
      </div>
    </div>
  );
} 