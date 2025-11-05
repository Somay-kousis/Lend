"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Package, Clock } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { icon: Package, label: "Items Shared", value: "4", color: "bg-primary/10 text-primary" },
    { icon: Users, label: "Followers", value: "23", color: "bg-accent/10 text-accent" },
    { icon: TrendingUp, label: "Times Lent", value: "12", color: "bg-secondary/10 text-secondary" },
    { icon: Clock, label: "Active Loans", value: "2", color: "bg-primary/10 text-primary" },
  ]

  const recentActivity = [
    { type: "borrowed", item: "Professional Microphone", date: "2 days ago" },
    { type: "lent", item: "Vintage Film Camera", date: "1 week ago" },
    { type: "completed", item: "Premium Tent", date: "2 weeks ago" },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg transition-transform hover:scale-110 duration-300" />
            <span className="text-xl font-black tracking-tight">BORROW</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/explore">
              <Button variant="ghost" className="text-sm font-medium">
                Explore
              </Button>
            </Link>
            <Link href="/my-items">
              <Button variant="ghost" className="text-sm font-medium">
                My Items
              </Button>
            </Link>
            <Link href="/requests">
              <Button variant="ghost" className="text-sm font-medium">
                Requests
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="fade-in-up mb-12">
          <h1 className="text-5xl font-black text-balance-tight">Your Dashboard</h1>
          <p className="text-muted-foreground mt-2">Track your borrowing and lending activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="stagger-in border border-border/60 bg-card rounded-2xl p-6 space-y-4 hover-lift transition-all duration-300"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-black">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Loans */}
          <div className="border border-border/60 bg-card rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-black">Active Loans</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4 space-y-2">
                <p className="font-semibold">Professional Microphone</p>
                <p className="text-sm text-muted-foreground">From Jordan Park • Due Dec 8</p>
              </div>
              <div className="border-l-2 border-primary pl-4 space-y-2">
                <p className="font-semibold">Premium Camping Tent</p>
                <p className="text-sm text-muted-foreground">Lent to Maya Rodriguez • Due Dec 15</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-border/60 bg-card rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-black">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="border-l-2 border-accent pl-4 space-y-1">
                  <p className="font-semibold">{activity.item}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
