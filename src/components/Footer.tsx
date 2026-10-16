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

const NowPlaying = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIdx((i) => (i + 1) % STATUS_MESSAGES.length), 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mt-6">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal-accent animate-blink" />
      <span className="transition-opacity duration-300">{STATUS_MESSAGES[idx]}</span>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });
      if (error && error.code === "23505") {
        // Already subscribed
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
    <footer className="dark text-foreground mt-32 px-3 pb-6">
      <div className="glass max-w-3xl mx-auto rounded-2xl px-6 py-10 sm:px-8">
        <div className="relative z-[2]">
        {/* Newsletter */}
        <div className="mb-10">
          <p className="text-sm font-medium mb-1">Newsletter</p>
          <p className="text-sm text-muted-foreground mb-4">hear my occasional thoughts on building.</p>
          {subscribed ? (
            <p className="text-sm text-foreground">Thanks for subscribing.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="flex-1 h-9 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm shadow-[inset_0_1px_2px_hsl(0_0%_0%/0.3)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium shadow-[0_0_24px_-6px_hsl(var(--terminal-accent)/0.6)] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex gap-5">
            <a href="https://www.linkedin.com/in/e-yong-lee/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://github.com/3y0ng" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
          
        </div>

        <NowPlaying />

        <p className="font-mono text-xs text-muted-foreground mt-6">
          last commit: {new Date().toISOString().slice(0, 10)}
        </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
