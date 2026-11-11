import { createFileRoute } from "@tanstack/react-router";
import { LearnApp } from "@/components/learn-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LearnApp />;
}
