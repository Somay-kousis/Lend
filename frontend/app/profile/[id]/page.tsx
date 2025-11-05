"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = {
    id: 1,
    name: "Alex Chen",
    email: "alex@example.com",
    rating: 4.8,
    reviews: 24,
    itemsShared: 4,
    itemsBorrowed: 12,
    location: "San Francisco, CA",
    bio: "Photography enthusiast and outdoor lover. Always happy to share!",
    joinedDate: "Jan 2024",
  }

  const userItems = [
    { id: 1, name: "Vintage Film Camera", rating: 4.8, requests: 12 },
    { id: 2, name: "Professional Microphone", rating: 4.7, requests: 5 },
  ]

  const userReviews = [
    {
      from: "Sarah Mitchell",
      rating: 5,
      comment: "Amazing item, very well maintained!",
      date: "2 weeks ago",
    },
    {
      from: "James Park",
      rating: 4,
      comment: "Great experience borrowing",
      date: "1 month ago",
    },
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
          <Link href="/explore">
            <Button variant="ghost" className="text-sm font-medium">
              Back to Explore
            </Button>
          </Link>
        </nav>
      </header>

      <section className="px-8 py-12 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="fade-in-up border border-border/60 bg-card rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl font-black mb-2">{user.name}</h1>
                <div className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
                  <Star className="w-5 h-5 fill-primary" />
                  {user.rating} ({user.reviews} reviews)
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {user.location}
              </div>
              <p className="text-muted-foreground max-w-lg">{user.bio}</p>
              <p className="text-sm text-muted-foreground">Joined {user.joinedDate}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-black">{user.itemsShared}</p>
                <p className="text-sm text-muted-foreground">Items Shared</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black">{user.itemsBorrowed}</p>
                <p className="text-sm text-muted-foreground">Items Borrowed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Items */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black">Shared Items</h2>
            <div className="space-y-4">
              {userItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="stagger-in border border-border/60 bg-card rounded-2xl p-6 hover-lift transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <h3 className="text-lg font-black mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{item.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.requests} requests</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black">Reviews</h2>
            <div className="space-y-4">
              {userReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="stagger-in border border-border/60 bg-card rounded-2xl p-6 space-y-3"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.from}</p>
                    <div className="flex gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
