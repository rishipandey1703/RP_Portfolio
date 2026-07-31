"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Monitor, Code, User, Send, FileText, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { config } from "@/data/config";

const commands = [
  { id: "home", label: "Home", icon: Monitor, action: (router: any) => router.push("/") },
  { id: "about", label: "About Me", icon: User, action: (router: any) => router.push("/#about") },
  { id: "skills", label: "Tech Stack", icon: Code, action: (router: any) => router.push("/#skills") },
  { id: "projects", label: "Projects", icon: LayoutDashboard, action: (router: any) => router.push("/#projects") },
  { id: "contact", label: "Contact", icon: Send, action: (router: any) => router.push("/#contact") },
  { id: "resume", label: "Download Resume", icon: FileText, action: () => window.open(config.resumeLink, "_blank") },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredCommands = query === "" 
    ? commands 
    : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action: any) => {
    setOpen(false);
    action(router);
    setQuery("");
  };

  return (
    <>
      {/* Visual prompt for the user to know the shortcut exists */}
      <div className="fixed bottom-4 right-4 z-50 hidden md:flex items-center gap-2 bg-background/80 backdrop-blur border rounded-full px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
        <span>Command Palette</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 max-w-lg border-brand/20 bg-background/90 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">No results found.</p>
            ) : (
              filteredCommands.map((command, idx) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id}
                    onClick={() => handleSelect(command.action)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-3 text-sm text-foreground hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {command.label}
                  </button>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
