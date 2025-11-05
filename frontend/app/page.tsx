"use client"
import { ArrowRight, Share2, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg" />
          <span className="text-lg font-black tracking-tighter">LEND</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {["Explore", "How It Works", "Community"].map((item) => (
            <a key={item} href="#" className="relative group transition-colors hover:text-primary">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" className="text-sm font-medium" onClick={() => router.push("/login")}>
            Sign In
          </Button>
          <Button
            className="bg-primary text-primary-foreground text-sm font-bold"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-40 md:py-56 max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-8">
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Share More, Own Less
                </span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
              Borrow anything
              <br />
              <span className="text-primary">instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Connect with your community. Get what you need. When you need it. No ownership. All freedom.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button
              className="bg-primary text-primary-foreground font-semibold px-8 py-3 text-base flex items-center gap-2 w-fit hover:bg-primary/90 transition-colors"
              onClick={() => router.push("/login")}
            >
              Start Borrowing <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="font-semibold px-8 py-3 text-base border-primary/30 text-foreground hover:bg-primary/5 w-fit bg-transparent"
              onClick={() => router.push("/login")}
            >
              List Your Items
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Stats Section */}
      <section className="px-8 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: "280K+", label: "Active Sharers" },
            { number: "47K", label: "Items Available" },
            { number: "2.4M", label: "Hours Saved" },
            { number: "99%", label: "Trust Score" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="stagger-in p-6 rounded-xl border border-primary/10 bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
            >
              <div className="text-5xl md:text-6xl font-bold text-primary">{stat.number}</div>
              <p className="text-muted-foreground font-medium mt-3 text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-40 max-w-7xl mx-auto">
        <div className="space-y-24">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">How it works</h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Browse",
                icon: <Share2 className="w-6 h-6" />,
                desc: "Explore items from your community",
              },
              {
                step: "02",
                title: "Request",
                icon: <Zap className="w-6 h-6" />,
                desc: "Send a request instantly",
              },
              {
                step: "03",
                title: "Enjoy",
                icon: <Users className="w-6 h-6" />,
                desc: "Use and build community",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="stagger-in space-y-6 p-8 rounded-xl border border-primary/10 bg-card hover:border-primary/20 hover:bg-primary/3 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <p className="text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </p>
                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Borrow */}
      <section className="px-8 py-40 max-w-7xl mx-auto">
        <div className="space-y-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Why borrow?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Save Money", desc: "Get what you need without buying" },
              { title: "Save Space", desc: "Reduce clutter. Live minimal." },
              { title: "Save Planet", desc: "Reduce consumption sustainably." },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="stagger-in space-y-4 p-8 rounded-xl border border-border hover:border-primary/20 bg-card hover:bg-primary/3 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <span className="font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-40 max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 rounded-2xl p-16 md:p-24 space-y-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
              Ready to share?
            </h2>
            <p className="text-lg md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Join a community reshaping how we live. Less stuff. More connections. More freedom.
            </p>
            <div className="pt-4">
              <Button
                className="bg-primary text-primary-foreground font-semibold px-8 py-3 text-base flex items-center gap-2 w-fit hover:bg-primary/90 transition-colors"
                onClick={() => router.push("/login")}
              >
                Start Now <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 border-t border-border/50 mt-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-linear-to-br from-primary to-secondary rounded-lg" />
            <span className="font-bold text-lg">LEND</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2025 Lend. Share smarter. Live better.</p>
        </div>
      </footer>
    </main>
  )
}
