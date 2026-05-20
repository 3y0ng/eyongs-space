import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const STATUS_MESSAGES = [
  "0 to 1 mode...",
  "talking to users...",
  "iterating on feedback...",
  "one more feature then sleep...",
  "claude-code wrote this line...",
  "reading docs...",
  "404 pmf not found...",
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStatusIdx((i) => (i + 1) % STATUS_MESSAGES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });
      if (error && error.code === "23505") {
        setSubscribed(true);
      } else if (error) {
        console.error("Subscription error:", error);
      } else {
        setSubscribed(true);
      }
    } catch (err) {
      console.error("Subscription error:", err);
    }
    setEmail("");
    setLoading(false);
  };

  return (
    <footer className="mt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-4">
        <div className="glass p-8 md:p-10 bg-gradient-to-br from-[hsl(var(--teal))]/5 via-zinc-900/30 to-transparent border-[hsl(var(--teal))]/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-zinc-300 uppercase tracking-[0.3em] mb-4">
                Signal Broadcast
              </div>
              <h3 className="font-display text-2xl text-zinc-100 mb-2 tracking-tight">Newsletter</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Hear my occasional thoughts on building.
              </p>
            </div>

            {subscribed ? (
              <p className="text-sm text-teal font-mono">{">"} thanks for subscribing.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-zinc-950/80 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[hsl(var(--teal))]/50 focus:ring-1 focus:ring-[hsl(var(--teal))]/20 transition-all w-full sm:w-64 font-mono"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-zinc-100 text-black px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-teal transition-all disabled:opacity-50"
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2 pt-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span>{STATUS_MESSAGES[statusIdx]}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/e-yong-lee/" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">LinkedIn</a>
            <a href="https://github.com/3y0ng" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">GitHub</a>
          </div>
        </div>

        <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest text-center md:text-right px-2">
          last commit: {new Date().toISOString().slice(0, 10)} · built with leftover claude-code credits
        </p>
      </div>
    </footer>
  );
};

export default Footer;
