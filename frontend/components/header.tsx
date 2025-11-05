"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  // Only show header on authenticated pages
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return null
  }

  const navItems = [
    { label: "Explore", href: "/explore" },
    { label: "My Items", href: "/my-items" },
    { label: "Requests", href: "/requests" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/explore" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg transition-transform hover:scale-110 duration-300" />
          <span className="text-xl font-black tracking-tight">BORROW</span>
        </Link>
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant={pathname === item.href ? "default" : "ghost"} className="text-sm font-medium">
                {item.label}
              </Button>
            </Link>
          ))}
          <Button variant="ghost" className="text-sm font-medium" onClick={() => router.push("/")}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  )
}
