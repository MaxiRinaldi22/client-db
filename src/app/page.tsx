import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <Button variant="default" size="sm">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </section>
  );
}
