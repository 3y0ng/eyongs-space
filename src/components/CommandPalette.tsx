import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => go("/")}>Home</CommandItem>
          <CommandItem onSelect={() => go("/projects")}>Projects</CommandItem>
          <CommandItem onSelect={() => go("/essays")}>Essays</CommandItem>
          <CommandItem onSelect={() => go("/about")}>About</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem key={p.id} onSelect={() => go(`/projects/${p.id}`)}>
              {p.title}
              <span className="ml-2 text-muted-foreground text-xs">{p.tagline}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Essays">
          {essays.map((e) => (
            <CommandItem key={e.id} onSelect={() => go(`/essays/${e.id}`)}>
              {e.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
