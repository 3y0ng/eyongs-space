import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const socials = [
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ];

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Newsletter */}
        <div>
          <h3 className="font-display text-2xl mb-2">Stay in the loop</h3>
          <p className="text-muted-foreground mb-6">Occasional thoughts on building, shipped straight to your inbox.</p>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-medium"
            >
              You're in! ✦ Thanks for subscribing.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="flex-1 h-11 rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring hoverable"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium text-sm hoverable"
              >
                Subscribe
              </motion.button>
            </form>
          )}
        </div>

        {/* Social + copyright */}
        <div className="flex flex-col justify-between items-start md:items-end">
          <div className="flex gap-6 mb-6">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hoverable"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Built with craft & care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
