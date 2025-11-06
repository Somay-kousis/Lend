"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)

    if (result.success) {
      router.push("/explore")
    } else {
      setError(result.message || "Login failed")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="fade-in-up space-y-2">
          <Link href="/" className="flex items-center gap-3 w-fit mb-12">
            <div className="w-8 h-8 bg-primary rounded-lg transition-transform hover:scale-110 duration-300" />
            <span className="text-xl font-black tracking-tight">BORROW</span>
          </Link>
          <h1 className="text-4xl font-black">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to access your items and requests</p>
        </div>

        {/* Demo credentials info */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
          <p className="font-semibold text-primary mb-1">Demo Credentials:</p>
          <p className="text-muted-foreground">Email: demo@example.com</p>
          <p className="text-muted-foreground">Password: password123</p>
        </div>

        <form className="space-y-4 fade-in-up" style={{ animationDelay: "0.1s" }} onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border border-border/60"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card border border-border/60"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold mt-6 interactive-grow flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground fade-in-up" style={{ animationDelay: "0.2s" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </main>
  )
}