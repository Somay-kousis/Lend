"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

export default function RequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      item: "Vintage Film Camera",
      requester: "sarah@example.com",
      status: "pending",
      rating: 4.8,
    },
    {
      id: 2,
      item: "Professional Microphone",
      requester: "james@example.com",
      status: "approved",
      rating: 4.6,
    },
  ])

  const handleApprove = (id: number) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "approved" } : r)))
  }

  const handleReject = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id))
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
          </div>
        </nav>
      </header>

      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="fade-in-up mb-12">
          <h1 className="text-5xl font-black text-balance-tight">Requests</h1>
          <p className="text-muted-foreground mt-2">Manage borrow requests</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black">Incoming Requests</h2>
          <div className="space-y-4">
            {requests.map((req, idx) => (
              <div
                key={req.id}
                className="stagger-in border border-border/60 bg-card rounded-2xl p-6 space-y-4"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black">{req.item}</h3>
                    <p className="text-sm text-muted-foreground">{req.requester}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      req.status === "pending" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                    }`}
                  >
                    {req.status === "pending" ? "Pending" : "Approved"}
                  </span>
                </div>

                {req.status === "pending" ? (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      onClick={() => handleApprove(req.id)}
                      className="flex-1 bg-accent text-accent-foreground font-semibold interactive-grow flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(req.id)}
                      variant="outline"
                      className="flex-1 interactive-grow flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
