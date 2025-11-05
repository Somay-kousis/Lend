"use client"

import { useState } from "react"
import { Search, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [rating, setRating] = useState(0)

  const categories = ["all", "Photography", "Outdoor", "Tech", "Audio", "Music", "Tools", "Sports"]

  const items = [
    {
      id: 1,
      name: "Vintage Film Camera",
      ownerEmail: "alex@example.com",
      ownerRating: 4.8,
      ownerRatingCount: 12,
      category: "Photography",
      location: "San Francisco",
      status: "available",
      image: "bg-primary/10",
    },
    {
      id: 2,
      name: "Premium Camping Tent",
      ownerEmail: "maya@example.com",
      ownerRating: 4.9,
      ownerRatingCount: 8,
      category: "Outdoor",
      location: "Oakland",
      status: "borrowed",
      image: "bg-accent/10",
    },
    {
      id: 3,
      name: "4K Projector System",
      ownerEmail: "jordan@example.com",
      ownerRating: 5.0,
      ownerRatingCount: 15,
      category: "Tech",
      location: "San Jose",
      status: "available",
      image: "bg-secondary/10",
    },
    {
      id: 4,
      name: "Professional Microphone",
      ownerEmail: "alex@example.com",
      ownerRating: 4.7,
      ownerRatingCount: 5,
      category: "Audio",
      location: "San Francisco",
      status: "available",
      image: "bg-primary/10",
    },
    {
      id: 5,
      name: "Full DJ Equipment",
      ownerEmail: "casey@example.com",
      ownerRating: 4.6,
      ownerRatingCount: 10,
      category: "Music",
      location: "Berkeley",
      status: "borrowed",
      image: "bg-accent/10",
    },
    {
      id: 6,
      name: "Drone Pro Max",
      ownerEmail: "riley@example.com",
      ownerRating: 5.0,
      ownerRatingCount: 20,
      category: "Tech",
      location: "Palo Alto",
      status: "available",
      image: "bg-secondary/10",
    },
  ]

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleRequest = () => {
    setSelectedItem(null)
    setRating(0)
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
            <Button className="bg-primary text-primary-foreground text-sm font-semibold interactive-grow">
              Profile
            </Button>
          </div>
        </nav>
      </header>

      {/* Search & Filter */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="fade-in-up">
            <h1 className="text-5xl font-black text-balance-tight mb-2">Explore Items</h1>
            <p className="text-muted-foreground">Find everything you need, shared by your community</p>
          </div>

          <div className="flex flex-col gap-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 group">
              <Search className="w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search items... camera, tent, tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 border-b-2 border-border bg-transparent px-0 py-2 text-lg placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/60 hover:border-primary/60 text-foreground"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="px-8 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="stagger-in border border-border/60 bg-card rounded-2xl hover-lift cursor-pointer transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div
                className={`aspect-square w-full transition-all duration-300 ${item.image} group-hover:opacity-80`}
              />

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-black leading-tight">{item.name}</h3>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">{item.ownerEmail}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">{item.ownerRating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.status === "available" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.status === "available" ? "Available" : "Borrowed"}
                  </span>
                  <Button
                    size="sm"
                    disabled={item.status !== "available"}
                    className="bg-primary text-primary-foreground font-semibold interactive-grow disabled:opacity-50"
                    onClick={() => setSelectedItem(item)}
                  >
                    Request
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="text-2xl font-bold">No items found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-3xl max-w-lg w-full space-y-6 p-8 fade-in-up shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2">Request Item</h2>
                <p className="text-muted-foreground">{selectedItem.name}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedItem(null)
                  setRating(0)
                }}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Item Preview */}
              <div className={`w-full h-40 rounded-2xl ${selectedItem.image} border border-border/60`} />

              {/* Owner Info */}
              <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/60">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div className="flex-1">
                  <p className="font-semibold">{selectedItem.ownerEmail}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {selectedItem.ownerRating} ({selectedItem.ownerRatingCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating System */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">Rate this item</p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                      <Star
                        className={`w-8 h-8 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-border hover:bg-muted bg-transparent"
                  onClick={() => {
                    setSelectedItem(null)
                    setRating(0)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRequest}
                  className="flex-1 bg-primary text-primary-foreground font-semibold interactive-grow"
                >
                  Send Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
