import { useState } from 'react'
import { User, Lock, Zap, Layers, Globe, Check } from 'lucide-react'
import BackgroundBeamsDemo from './components/background-beams-demo'
import LoginPage from './components/login-page'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  if (showLogin) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-6 left-6 z-[100] rounded-full px-4 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          ← Return to Terminal
        </button>
        <LoginPage />
      </div>
    )
  }

  const features = [
    {
      title: "Cryptographic Trust",
      description: "End-to-end encryption for every transaction node in the network.",
      icon: Lock,
    },
    {
      title: "Golden Liquidity",
      description: "Access deep liquidity pools with the brilliance of digital gold.",
      icon: Zap,
    },
    {
      title: "Layered Scaling",
      description: "High-performance processing through layered blockchain architecture.",
      icon: Layers,
    },
    {
      title: "Global Reach",
      description: "Connect to a borderless financial void spanning the entire globe.",
      icon: Globe,
    }
  ]

  const steps = [
    { title: "Connect Wallet", desc: "Initialize your node in the decentralized grid." },
    { title: "Select Assets", desc: "Choose from curated digital gold tokens." },
    { title: "Execute Trade", desc: "Snap-speed transactions with precision engineering." },
    { title: "Verify Block", desc: "Instant finality on the secure ledger." }
  ]

  return (
    <main className="min-h-screen bg-background selection:bg-primary-accent/30 selection:text-primary-accent">
      <div className="relative min-h-screen overflow-hidden">
        {/* Ambient Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Navigation */}
        <header className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-accent to-primary-accent shadow-orange-glow" />
            <span className="font-heading font-bold text-xl tracking-tighter text-white">
              BITCOIN <span className="text-primary-accent">DEFI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-muted">
            <a href="#features" className="hover:text-primary-accent transition-colors">Ecosystem</a>
            <a href="#how-it-works" className="hover:text-primary-accent transition-colors">Protocol</a>
            <a href="#pricing" className="hover:text-primary-accent transition-colors">Governance</a>
          </nav>

          <button
            onClick={() => setShowLogin(true)}
            className="rounded-full px-6 py-2 bg-gradient-to-r from-secondary-accent to-primary-accent text-white font-body font-bold uppercase tracking-wider text-sm shadow-orange-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Login
          </button>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center">
          {/* Animated Orbital Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
            <div className="absolute inset-0 border border-primary-accent/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-10 border border-tertiary-accent/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-20 border border-secondary-accent/5 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>

          <div className="relative z-10 w-full max-w-4xl px-4 text-center">
            <BackgroundBeamsDemo />
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="relative py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Engineered for <span className="bg-gradient-to-r from-primary-accent to-tertiary-accent bg-clip-text text-transparent">Precision</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our infrastructure is built on the core principles of the blockchain—immutable, secure, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-surface border border-white/10 hover:border-primary-accent/50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-secondary-accent/20 border border-secondary-accent/50 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all">
                  <f.icon className="text-primary-accent w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-3">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.description}</p>
                {/* Decorative Icon Watermark */}
                <f.icon className="absolute bottom-4 right-4 w-12 h-12 text-white/5 opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* How It Works (Timeline as Blockchain) */}
        <section id="how-it-works" className="py-24 bg-surface/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">
                  The <span className="bg-gradient-to-r from-primary-accent to-tertiary-accent bg-clip-text text-transparent">Blockchain</span> Way
                </h2>
                <div className="relative space-y-12">
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-accent via-secondary-accent to-transparent" />
                  {steps.map((s, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border border-primary-accent flex items-center justify-center font-mono text-primary-accent font-bold">
                        {i + 1}
                      </div>
                      <h4 className="text-white font-heading font-semibold text-lg mb-1">{s.title}</h4>
                      <p className="text-muted text-sm">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-lg aspect-square rounded-full border-2 border-dashed border-white/5 flex items-center justify-center relative">
                <div className="w-3/4 h-3/4 bg-primary-accent/10 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute inset-0 animate-float">
                  <div className="w-64 h-64 mx-auto mt-20 bg-gradient-to-br from-secondary-accent to-primary-accent rounded-3xl shadow-orange-glow rotate-12 flex items-center justify-center">
                    <Lock className="w-32 h-32 text-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Access the <span className="bg-gradient-to-r from-primary-accent to-tertiary-accent bg-clip-text text-transparent">Value</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-surface border border-white/10 opacity-80 hover:opacity-100 transition-all">
              <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">Basic Node</span>
              <h3 className="text-2xl font-heading font-bold text-white mt-2 mb-4">Explorer</h3>
              <p className="text-4xl font-heading font-bold text-white mb-6">$0<span className="text-lg text-muted">/mo</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2 text-sm text-muted">
                  <Check className="w-4 h-4 text-primary-accent" /> Public Ledger Access
                </li>
                <li className="flex items-center gap-2 text-sm text-muted">
                  <Check className="w-4 h-4 text-primary-accent" /> Standard Priority
                </li>
              </ul>
              <button className="w-full py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all">Get Started</button>
            </div>

            {/* Pro - Scaling Highlight */}
            <div className="p-8 rounded-2xl bg-surface border-2 border-primary-accent scale-105 shadow-orange-glow z-10 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Most Popular</div>
              <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">Full Node</span>
              <h3 className="text-2xl font-heading font-bold text-white mt-2 mb-4">Architect</h3>
              <p className="text-4xl font-heading font-bold text-white mb-6">$49<span className="text-lg text-muted">/mo</span></p>
              <ul className="space-y-4 mb-8">
                {["Priority Validation", "Private Channels", "Advanced Analytics", "Governance Voting"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-primary-accent" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-secondary-accent to-primary-accent text-white font-bold shadow-orange-glow hover:scale-105 transition-all">Connect Now</button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-surface border border-white/10 opacity-80 hover:opacity-100 transition-all">
              <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">Cluster Node</span>
              <h3 className="text-2xl font-heading font-bold text-white mt-2 mb-4">Sovereign</h3>
              <p className="text-4xl font-heading font-bold text-white mb-6">Custom</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2 text-sm text-muted">
                  <Check className="w-4 h-4 text-primary-accent" /> Dedicated Hardware
                </li>
                <li className="flex items-center gap-2 text-sm text-muted">
                  <Check className="w-4 h-4 text-primary-accent" /> Institutional SLA
                </li>
              </ul>
              <button className="w-full py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 mt-12 bg-surface/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-mono text-xs tracking-widest text-muted">© 2026 BITCOIN DEFI PROTOCOL. IMMUTABLE.</span>
            <div className="flex gap-8 font-mono text-xs uppercase tracking-tighter text-muted">
              <a href="#" className="hover:text-primary-accent">Security</a>
              <a href="#" className="hover:text-primary-accent">Terminals</a>
              <a href="#" className="hover:text-primary-accent">Liquidity</a>
            </div>
          </div>
        </footer>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary-accent opacity-10 blur-[150px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary-accent opacity-10 blur-[150px] -z-10" />
      </div>
    </main>
  )
}

export default App
