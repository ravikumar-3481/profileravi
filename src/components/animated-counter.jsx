import { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function AnimatedCounter({ value, duration = 1.8 }) {
  const ref = useRef(null);
  // once: false ensures the animation triggers always when scrolled into viewport
  const isInView = useInView(ref, { amount: 0.2, once: false });
  const reduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduced ? value : "0");

  useEffect(() => {
    if (reduced) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) {
      // Reset back to initial state when out of view so re-entry counts up
      setDisplayValue("0");
      return;
    }

    // Parse the number and any suffix (e.g., '1.5+', '63+', '124+', '50K+')
    const match = String(value).match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || "";
    const hasDecimals = match[1].includes(".");
    const decimalPlaces = hasDecimals ? match[1].split(".")[1].length : 0;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Smooth ease-out exponential curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = targetNum * ease;

      const formatted = hasDecimals
        ? current.toFixed(decimalPlaces)
        : Math.round(current).toString();

      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration, reduced]);

  return (
    <span ref={ref} className="animated-counter-num">
      {displayValue}
    </span>
  );
}
