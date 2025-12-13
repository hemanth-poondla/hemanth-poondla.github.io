import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "@/components/PageTransition";
import { ChatBot } from "@/components/ChatBot";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-1 pt-20">
          {children}
        </main>
      </PageTransition>
      <Footer />
      <ChatBot />
    </div>
  );
}
