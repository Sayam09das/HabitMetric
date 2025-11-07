import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 🎨 Color system
  const COLORS = {
    darkBg: "#0F172A",
    darkCard: "#1E293B",
    darkText: "#F8FAFC",
    lightBg: "#F9FAFB",
    lightText: "#1F2937",
    primary: "#6366F1",
    border: "#334155",
    hoverDark: "#374151",
    hoverLight: "#E5E7EB",
    shadow: "rgba(99, 102, 241, 0.4)",
  };

  // 🌓 Load saved theme (and apply)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isSavedDark = savedTheme === "dark";

    setIsDark(isSavedDark);
    document.documentElement.classList.toggle("dark", isSavedDark);

    // Apply body colors
    document.body.style.backgroundColor = isSavedDark
      ? COLORS.darkBg
      : COLORS.lightBg;
    document.body.style.color = isSavedDark
      ? COLORS.darkText
      : COLORS.lightText;
  }, []);

  // 🌗 Toggle theme with animation
  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");

        // Add/remove `.dark` class on <html>
        document.documentElement.classList.toggle("dark", newTheme);

        // Apply base colors
        document.body.style.backgroundColor = newTheme
          ? COLORS.darkBg
          : COLORS.lightBg;
        document.body.style.color = newTheme
          ? COLORS.darkText
          : COLORS.lightText;
      });
    }).ready;

    // 🌕 Circular reveal animation
    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [isDark]);

  // 🌈 Button styles
  const buttonStyle = isDark
    ? {
      backgroundColor: COLORS.darkCard,
      color: COLORS.primary,
      boxShadow: `0 0 10px ${COLORS.shadow}`,
      border: `1px solid ${COLORS.border}`,
    }
    : {
      backgroundColor: COLORS.lightBg,
      color: COLORS.lightText,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };

  const hoverStyle = isDark
    ? { backgroundColor: COLORS.hoverDark }
    : { backgroundColor: COLORS.hoverLight };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      style={buttonStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
      className={cn(
        "p-2 rounded-full transition-all duration-300 cursor-pointer",
        className
      )}
      {...props}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
