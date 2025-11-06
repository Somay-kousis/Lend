"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basic validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const result = await signup(name, email, password)

    if (result.success) {
      router.push("/explore")
    } else {
      setError(result.message || "Signup failed")
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
          <h1 className="text-4xl font-black">Join BORROW</h1>
          <p className="text-muted-foreground">Start borrowing and lending with your community</p>
        </div>

        <form className="space-y-4 fade-in-up" style={{ animationDelay: "0.1s" }} onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold">Full Name</label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card border border-border/60"
              required
            />
          </div>
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
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold mt-6 interactive-grow flex items-center justify-center gap-2"
          >
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground fade-in-up" style={{ animationDelay: "0.2s" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  )
}