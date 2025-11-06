"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { itemsService, type Item } from "@/lib/items"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function MyItemsContent() {
  const { user } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  useEffect(() => {
    loadItems()
  }, [user])

  const loadItems = async () => {
    if (!user) return

    setLoading(true)
    const response = await itemsService.getItemsByUserId(user.id)
    
    if (response.success && response.items) {
      setItems(response.items)
    }
    
    setLoading(false)
  }

  const toggleStatus = async (id: string) => {
    setTogglingId(id)
    const response = await itemsService.toggleItemStatus(id)
    
    if (response.success) {
      setItems(items.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "available" ? "borrowed" : "available" }
          : item
      ))
    }
    
    setTogglingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    setDeletingId(id)
    const response = await itemsService.deleteItem(id)
    
    if (response.success) {
      setItems(items.filter((item) => item.id !== id))
    }
    
    setDeletingId(null)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <section className="px-8 py-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="space-y-4 text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading your items...</p>
            </div>
          </div>
        </section>
      </main>
    )
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

        {items.length === 0 ? (
          <div className="text-center py-24 space-y-6 fade-in-up">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No items yet</h2>
              <p className="text-muted-foreground">Start sharing by adding your first item</p>
            </div>
            <Link href="/my-items/add">
              <Button className="bg-primary text-primary-foreground font-semibold interactive-grow">
                Add Your First Item
              </Button>
            </Link>
          </div>
        ) : (
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
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    disabled={togglingId === item.id}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 ${
                      item.status === "available"
                        ? "bg-accent/20 text-accent hover:bg-accent/30"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {togglingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      item.status === "available" ? "Available" : "Borrowed"
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive cursor-pointer disabled:opacity-50"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default function MyItemsPage() {
  return (
    <ProtectedRoute>
      <MyItemsContent />
    </ProtectedRoute>
  )
}