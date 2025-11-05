"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

        <form className="space-y-4 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Full Name</label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card border border-border/60"
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
            />
          </div>
          <Button className="w-full bg-primary text-primary-foreground font-semibold mt-6 interactive-grow flex items-center justify-center gap-2">
            Create Account <ArrowRight className="w-4 h-4" />
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
