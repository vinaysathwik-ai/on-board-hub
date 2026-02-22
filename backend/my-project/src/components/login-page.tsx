import { CometCard } from "@/components/ui/comet-card";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#030304] relative overflow-hidden">
            <BackgroundBeams className="opacity-40" />

            <CometCard className="w-full max-w-[360px] relative z-10">
                <div className="flex flex-col bg-[#0f1115]/80 backdrop-blur-xl rounded-[24px] border border-white/10 overflow-hidden shadow-2xl">
                    {/* Top visual area */}
                    <div className="p-2 pb-0">
                        <div className="aspect-[4/5] w-full rounded-[18px] overflow-hidden relative group/img">
                            <img
                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop"
                                className="w-full h-full object-cover saturate-100 group-hover:scale-110 transition-all duration-700"
                                alt="Abstract Grid"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-6 left-6">
                                <h1 className="text-2xl font-heading font-bold text-white tracking-tighter">
                                    VOID<span className="text-primary-accent">LOGIN</span>
                                </h1>
                                <p className="text-[10px] font-mono text-primary-accent tracking-[0.2em] uppercase">Auth Terminal v2.4</p>
                            </div>
                        </div>
                    </div>

                    {/* Form area */}
                    <div className="p-6 pt-4 space-y-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input
                                    type="email"
                                    placeholder="Identity Handle"
                                    className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-primary-accent/50 transition-all placeholder:text-white/10"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input
                                    type="password"
                                    placeholder="Cipher Key"
                                    className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-primary-accent/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <button className="w-full h-11 bg-primary-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(247,147,26,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-2">
                            Authorize
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-widest pt-2 px-1">
                            <a href="#" className="hover:text-white transition-colors">Emergency Protocol</a>
                            <span className="text-white/5">•</span>
                            <a href="#" className="hover:text-white transition-colors">Register node</a>
                        </div>
                    </div>
                </div>
            </CometCard>

            {/* Decorative text watermark */}
            <div className="absolute bottom-10 center font-mono text-[10px] text-white/5 uppercase tracking-[1em] pointer-events-none">
                Decentralised Encryption Void
            </div>
        </div>
    );
}
