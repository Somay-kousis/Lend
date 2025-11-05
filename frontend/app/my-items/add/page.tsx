"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
  })

  const categories = ["Photography", "Outdoor", "Tech", "Audio", "Music", "Tools", "Sports", "Other"]
  const conditions = ["Like New", "Excellent", "Good", "Fair"]

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

        <form className="border border-border/60 bg-card rounded-2xl p-8 space-y-6">
          <div className="space-y-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <label className="text-sm font-semibold">Item Name</label>
            <Input
              placeholder="e.g., Vintage Film Camera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border border-border/60"
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
              <label className="text-sm font-semibold">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-input border border-border/60 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
              <label className="text-sm font-semibold">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full bg-input border border-border/60 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
              <Button variant="outline" className="w-full font-semibold bg-transparent">
                Cancel
              </Button>
            </Link>
            <Button className="flex-1 bg-primary text-primary-foreground font-semibold interactive-grow">
              List Item
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}
