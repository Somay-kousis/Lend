"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function LoansPage() {
  const loans = [
    {
      id: 1,
      item: "4K Projector System",
      owner: "Jordan Park",
      status: "active",
      startDate: "Dec 1",
      endDate: "Dec 8",
      daysLeft: 4,
      ownerRating: 5.0,
    },
    {
      id: 2,
      item: "Professional Microphone",
      owner: "Alex Chen",
      status: "active",
      startDate: "Nov 28",
      endDate: "Dec 5",
      daysLeft: 1,
      ownerRating: 4.8,
    },
    {
      id: 3,
      item: "Premium Camping Tent",
      owner: "Maya Rodriguez",
      status: "returned",
      startDate: "Nov 15",
      endDate: "Nov 22",
      daysLeft: 0,
      ownerRating: 4.9,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent/10 text-accent"
      case "returned":
        return "bg-primary/10 text-primary"
      case "overdue":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "returned":
        return <CheckCircle className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

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
            <Link href="/dashboard">
              <Button variant="ghost" className="text-sm font-medium">
                Dashboard
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="ghost" className="text-sm font-medium">
                Explore
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="fade-in-up mb-12">
          <h1 className="text-5xl font-black text-balance-tight">My Loans</h1>
          <p className="text-muted-foreground mt-2">Track all your active and completed loans</p>
        </div>

        <div className="space-y-4">
          {loans.map((loan, idx) => (
            <div
              key={loan.id}
              className="stagger-in border border-border/60 bg-card rounded-2xl p-6 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-black">{loan.item}</h3>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(loan.status)}`}
                    >
                      {getStatusIcon(loan.status)}
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">From</p>
                      <p className="font-semibold">{loan.owner}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Period</p>
                      <p className="font-semibold">
                        {loan.startDate} - {loan.endDate}
                      </p>
                    </div>
                    {loan.status === "active" && (
                      <div>
                        <p className="text-muted-foreground">Due in</p>
                        <p className="font-semibold text-accent">{loan.daysLeft} days</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right space-y-4">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Lender Rating</p>
                    <p className="text-lg font-black">★ {loan.ownerRating}</p>
                  </div>

                  {loan.status === "active" && (
                    <Button className="w-full bg-primary text-primary-foreground font-semibold interactive-grow">
                      Mark Returned
                    </Button>
                  )}
                  {loan.status === "returned" && (
                    <Button className="w-full bg-accent text-accent-foreground font-semibold interactive-grow">
                      Leave Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
