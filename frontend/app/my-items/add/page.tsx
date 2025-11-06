"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { itemsService } from "@/lib/items"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function AddItemContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
  })

  const categories = ["Photography", "Outdoor", "Tech", "Audio", "Music", "Tools", "Sports", "Other"]
  const conditions = ["Like New", "Excellent", "Good", "Fair"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!user) {
      setError("You must be logged in to add items")
      return
    }

    if (!formData.name || !formData.category || !formData.condition) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)

    const response = await itemsService.createItem({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      condition: formData.condition,
      ownerId: user.id,
      ownerEmail: user.email,
      ownerName: user.name,
      location: user.location,
      image: `bg-${["primary", "accent", "secondary"][Math.floor(Math.random() * 3)]}/10`,
    })

    setLoading(false)

    if (response.success) {
      router.push("/my-items")
    } else {
      setError(response.message || "Failed to create item")
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
        </nav>
      </header>

      <section className="px-8 py-12 max-w-2xl mx-auto">
        <Link
          href="/my-items"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 interactive-grow w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Items
        </Link>

        <div className="fade-in-up mb-12">
          <h1 className="text-5xl font-black text-balance-tight">Add New Item</h1>
          <p className="text-muted-foreground mt-2">Share something you&apos;d like to lend</p>
        </div>

        <form onSubmit={handleSubmit} className="border border-border/60 bg-card rounded-2xl p-8 space-y-6">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="space-y-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <label className="text-sm font-semibold">
              Item Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g., Vintage Film Camera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border border-border/60"
              required
            />
          </div>

          <div className="space-y-2 fade-in-up" style={{ animationDelay: "0.15s" }}>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              placeholder="Describe your item, how it works, care instructions..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-input border border-border/60 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 fade-in-up" style={{ animationDelay: "0.2s" }}>
              <label className="text-sm font-semibold">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-input border border-border/60 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 fade-in-up" style={{ animationDelay: "0.25s" }}>
              <label className="text-sm font-semibold">
                Condition <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full bg-input border border-border/60 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              >
                <option value="">Select condition</option>
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-6 fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/my-items" className="flex-1">
              <Button 
                type="button"
                variant="outline" 
                className="w-full font-semibold bg-transparent"
                disabled={loading}
              >
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit"
              className="flex-1 bg-primary text-primary-foreground font-semibold interactive-grow"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "List Item"
              )}
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemContent />
    </ProtectedRoute>
  )
}