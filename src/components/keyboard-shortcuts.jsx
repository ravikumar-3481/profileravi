import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Keyboard, Navigation, Zap, X, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function useKeyboardNavigation({ onOpenResume, onToggleHelp, onToggleTheme }) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      const target = e.target;
      const tag = target?.tagName?.toLowerCase();

      // Don't intercept when user is typing in form inputs, textareas, etc.
      if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target?.isContentEditable ||
        target?.getAttribute("role") === "textbox"
      ) {
        return;
      }

      // Cmd/Ctrl + K shortcut for opening keyboard guide
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onToggleHelp?.();
        return;
      }

      // Ignore other modifier key combos
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      switch (key) {
        case "h":
        case "1":
          e.preventDefault();
          navigate({ to: "/" });
          break;
        case "a":
        case "2":
          e.preventDefault();
          navigate({ to: "/about" });
          break;
        case "p":
        case "3":
          e.preventDefault();
          navigate({ to: "/projects" });
          break;
        case "j":
        case "4":
          e.preventDefault();
          navigate({ to: "/experience" });
          break;
        case "s":
        case "5":
          e.preventDefault();
          navigate({ to: "/skills" });
          break;
        case "w":
        case "b":
        case "6":
          e.preventDefault();
          navigate({ to: "/blog" });
          break;
        case "c":
        case "7":
          e.preventDefault();
          navigate({ to: "/contact" });
          break;
        case "t":
          e.preventDefault();
          onToggleTheme?.();
          break;
        case "r":
          e.preventDefault();
          onOpenResume?.();
          break;
        case "?":
          e.preventDefault();
          onToggleHelp?.();
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, onOpenResume, onToggleHelp, onToggleTheme]);
}

export function KeyboardShortcutsModal({ open, onClose }) {
  const navigate = useNavigate();

  const handleSelect = (to) => {
    onClose();
    navigate({ to });
  };

  const sections = [
    {
      title: "Page Navigation",
      icon: Navigation,
      items: [
        { key: "H", num: "1", label: "Home", to: "/" },
        { key: "A", num: "2", label: "About", to: "/about" },
        { key: "P", num: "3", label: "Projects Archive", to: "/projects" },
        { key: "J", num: "4", label: "Journey & Education", to: "/experience" },
        { key: "S", num: "5", label: "Skills & Toolbox", to: "/skills" },
        { key: "W", num: "6", label: "Writing & Blog", to: "/blog" },
        { key: "C", num: "7", label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Actions & Utilities",
      icon: Zap,
      items: [
        { key: "T", label: "Toggle Dark / Light Theme" },
        { key: "R", label: "View Resume Preview" },
        { key: "?", num: "Ctrl+K", label: "Toggle Keyboard Help" },
        { key: "Tab", label: "Focus Next Interactive Element" },
        { key: "Esc", label: "Close Active Modal or Menu" },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="shortcuts-dialog [&>button:last-child]:hidden">
        <div className="shortcuts-head">
          <div className="shortcuts-title-group">
            <div className="shortcuts-icon-wrapper">
              <Keyboard size={20} className="text-primary" />
            </div>
            <div>
              <DialogTitle>Keyboard Navigation</DialogTitle>
              <DialogDescription className="shortcuts-desc">
                Fast, hands-on keyboard control across the entire portfolio
              </DialogDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shortcuts-close-btn"
            aria-label="Close keyboard shortcuts"
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </div>

        <div className="shortcuts-body">
          {sections.map((sec) => (
            <div key={sec.title} className="shortcuts-section">
              <div className="shortcuts-section-title">
                <sec.icon size={13} className="text-primary" />
                <h4>{sec.title}</h4>
              </div>
              <div className="shortcuts-grid">
                {sec.items.map((item) => (
                  <div
                    key={item.label}
                    className={`shortcut-row ${item.to ? "is-clickable" : ""}`}
                    onClick={() => item.to && handleSelect(item.to)}
                    role={item.to ? "button" : undefined}
                    tabIndex={item.to ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (item.to && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        handleSelect(item.to);
                      }
                    }}
                  >
                    <span className="shortcut-label">
                      {item.label}
                      {item.to && <CornerDownLeft size={11} className="shortcut-action-icon" />}
                    </span>
                    <div className="shortcut-keys">
                      <kbd>{item.key}</kbd>
                      {item.num && (
                        <>
                          <span className="shortcut-sep">/</span>
                          <kbd>{item.num}</kbd>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="shortcuts-footer">
          <span>
            Press <kbd>?</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere to open this menu
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
