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
    <nav className="dark fixed top-0 left-0 right-0 z-50 bg-background/90 text-foreground backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* shrink-0 so the prompt never gets squeezed narrow enough to break
            at its own space and wrap the `$` onto a second line.

            Below 360px the row cannot hold it and all four links at once, and
            something has to go: the prompt is branding, while Home already
            does its navigating, so it is the one that leaves. */}
        <Link
          to="/"
          className="hidden shrink-0 whitespace-nowrap font-mono text-sm tracking-tight text-terminal-accent min-[360px]:block"
        >
          ~/eyong $
        </Link>

        {/* Four links plus the prompt is a lot of row for a phone, so the
            gap and type tighten a step below `sm` to keep About on-screen. */}
        <div className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13px] sm:text-sm transition-colors ${
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
