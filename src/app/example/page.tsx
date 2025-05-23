import { ExampleComponent } from "@/features/example/components/example-component";
import { getExampleData } from "@/features/example/api";

export default async function ExamplePage() {
  const exampleData = await getExampleData();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">예시 페이지</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {exampleData.map((item) => (
          <ExampleComponent key={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
} 