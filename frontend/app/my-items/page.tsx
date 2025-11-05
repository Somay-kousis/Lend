"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export default function MyItemsPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Vintage Film Camera",
      category: "Photography",
      status: "available",
    },
    {
      id: 2,
      name: "Professional Microphone",
      category: "Audio",
      status: "borrowed",
    },
  ])



  const toggleStatus = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "available" ? "borrowed" : "available",
            }
          : item,
      ),
    )
  }


  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 fade-in-up">
          <div>
            <h1 className="text-5xl font-black text-balance-tight">My Items</h1>
            <p className="text-muted-foreground mt-2">Manage your shared items</p>
          </div>
          <Link href="/my-items/add">
            <Button className="bg-primary text-primary-foreground font-semibold interactive-grow flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Item
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="stagger-in border border-border/60 bg-card rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="space-y-1">
                <h3 className="text-lg font-black">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    item.status === "available"
                      ? "bg-accent/20 text-accent hover:bg-accent/30"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {item.status === "available" ? "Available" : "Borrowed"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
