import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/essays", label: "Essays" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-mono text-sm text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse shadow-[0_0_8px_hsl(var(--teal))]" />
          <span>~/eyong $ ready_</span>
        </Link>

        <div className="flex items-center gap-7">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  active ? "text-teal" : "text-zinc-500 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
