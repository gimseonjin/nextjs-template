import { Button } from "@/components/ui/button";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/app";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {APP_NAME}
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
            {APP_DESCRIPTION}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <Link href="/example">
                예시 페이지 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/vercel/next.js" target="_blank">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
