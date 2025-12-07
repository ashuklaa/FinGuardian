import { ThemeToggle } from "@/components/themeToggle";
import Link from "next/link";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="text-2xl font-semibold">FinGuardian</div>
          <nav className="flex gap-4">
            <Link href={'/dashboard'}>Dashboard</Link>
          </nav>
          <ThemeToggle />
        </header>
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
