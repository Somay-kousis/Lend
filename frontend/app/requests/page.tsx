"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Clock, Package } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { requestsService, type BorrowRequest } from "@/lib/requests"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function RequestsContent() {
  const { user } = useAuth()
  const [incomingRequests, setIncomingRequests] = useState<BorrowRequest[]>([])
  const [outgoingRequests, setOutgoingRequests] = useState<BorrowRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    loadRequests()
  }, [user])

  const loadRequests = async () => {
    if (!user) return

    setLoading(true)

    // Load incoming requests (for items I own)
    const incomingResponse = await requestsService.getRequestsByOwnerId(user.id)
    if (incomingResponse.success && incomingResponse.requests) {
      setIncomingRequests(incomingResponse.requests)
    }

    // Load outgoing requests (items I requested)
    const outgoingResponse = await requestsService.getRequestsByRequesterId(user.id)
    if (outgoingResponse.success && outgoingResponse.requests) {
      setOutgoingRequests(outgoingResponse.requests)
    }

    setLoading(false)
  }

  const handleApprove = async (id: string) => {
    setProcessingId(id)
    const response = await requestsService.approveRequest(id)
    
    if (response.success) {
      setIncomingRequests(
        incomingRequests.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
      )
    }
    
    setProcessingId(null)
  }

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this request?")) return

    setProcessingId(id)
    const response = await requestsService.rejectRequest(id)
    
    if (response.success) {
      setIncomingRequests(incomingRequests.filter((r) => r.id !== id))
    }
    
    setProcessingId(null)
  }

  const handleCancelRequest = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this request?")) return

    setProcessingId(id)
    const response = await requestsService.deleteRequest(id)
    
    if (response.success) {
      setOutgoingRequests(outgoingRequests.filter((r) => r.id !== id))
    }
    
    setProcessingId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-primary/20 text-primary"
      case "approved":
        return "bg-accent/20 text-accent"
      case "rejected":
        return "bg-destructive/20 text-destructive"
      case "completed":
        return "bg-secondary/20 text-secondary"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "completed":
        return <Package className="w-4 h-4" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg transition-transform hover:scale-110 duration-300" />
              <span className="text-xl font-black tracking-tight">BORROW</span>
            </Link>
          </nav>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="space-y-4 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading requests...</p>
          </div>
        </div>
      </main>
    )
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
          <p className="text-muted-foreground mt-2">Manage borrow requests for your items</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Incoming Requests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Incoming Requests</h2>
              {incomingRequests.length > 0 && (
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                  {incomingRequests.filter(r => r.status === "pending").length} pending
                </span>
              )}
            </div>

            {incomingRequests.length === 0 ? (
              <div className="border border-border/60 bg-card rounded-2xl p-12 text-center space-y-3">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-semibold">No incoming requests</p>
                <p className="text-sm text-muted-foreground">
                  Requests for your items will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((req, idx) => (
                  <div
                    key={req.id}
                    className="stagger-in border border-border/60 bg-card rounded-2xl p-6 space-y-4"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black">{req.itemName}</h3>
                        <p className="text-sm text-muted-foreground">{req.requesterName}</p>
                        <p className="text-xs text-muted-foreground">{req.requesterEmail}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(req.status)}`}
                      >
                        {getStatusIcon(req.status)}
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </div>
                    </div>

                    {req.rating > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Urgency:</span>
                        <div className="flex gap-1">
                          {Array.from({ length: req.rating }).map((_, i) => (
                            <span key={i} className="text-primary">★</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {req.status === "pending" && (
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          onClick={() => handleApprove(req.id)}
                          disabled={processingId === req.id}
                          className="flex-1 bg-accent text-accent-foreground font-semibold interactive-grow flex items-center justify-center gap-2"
                        >
                          {processingId === req.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" /> Approve
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleReject(req.id)}
                          disabled={processingId === req.id}
                          variant="outline"
                          className="flex-1 interactive-grow flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </Button>
                      </div>
                    )}

                    {req.status === "approved" && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-accent font-semibold">
                          ✓ Approved - Contact the requester to arrange pickup
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outgoing Requests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">My Requests</h2>
              {outgoingRequests.length > 0 && (
                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
                  {outgoingRequests.length} total
                </span>
              )}
            </div>

            {outgoingRequests.length === 0 ? (
              <div className="border border-border/60 bg-card rounded-2xl p-12 text-center space-y-3">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-semibold">No outgoing requests</p>
                <p className="text-sm text-muted-foreground">
                  Items you request will appear here
                </p>
                <Link href="/explore">
                  <Button className="bg-primary text-primary-foreground font-semibold interactive-grow mt-4">
                    Explore Items
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {outgoingRequests.map((req, idx) => (
                  <div
                    key={req.id}
                    className="stagger-in border border-border/60 bg-card rounded-2xl p-6 space-y-4"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black">{req.itemName}</h3>
                        <p className="text-sm text-muted-foreground">From: {req.ownerName}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(req.status)}`}
                      >
                        {getStatusIcon(req.status)}
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </div>
                    </div>

                    {req.status === "pending" && (
                      <div className="pt-4 border-t border-border">
                        <Button
                          onClick={() => handleCancelRequest(req.id)}
                          disabled={processingId === req.id}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          {processingId === req.id ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          Cancel Request
                        </Button>
                      </div>
                    )}

                    {req.status === "approved" && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-accent font-semibold">
                          ✓ Approved! Contact {req.ownerName} to arrange pickup
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {req.ownerEmail}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default function RequestsPage() {
  return (
    <ProtectedRoute>
      <RequestsContent />
    </ProtectedRoute>
  )
}