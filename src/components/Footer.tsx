import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    <footer className="border-t border-border mt-32">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Newsletter */}
        <div className="mb-10">
          <p className="text-sm font-medium mb-1">Newsletter</p>
          <p className="text-sm text-muted-foreground mb-4">Occasional thoughts on building.</p>
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
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-9 px-4 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
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

        <p className="font-mono text-xs text-muted-foreground mt-6">
          last commit: {new Date().toISOString().slice(0, 10)} · built with mass amounts of mass-produced caffeine
        </p>
      </div>
    </footer>
  );
};

export default Footer;
