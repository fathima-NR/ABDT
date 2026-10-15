import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const styles = {
  primary: "bg-uae-red text-white hover:bg-uae-red-dark",
  secondary: "border border-navy bg-white text-navy hover:bg-navy hover:text-white",
  whatsapp: "bg-uae-green text-white hover:bg-uae-green-dark",
  light: "bg-white text-navy hover:bg-page",
  outline: "border border-white/80 text-white hover:bg-white hover:text-navy",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export default function Button({
  to,
  href,
  variant = "primary",
  className = "",
  children,
  type,
  ...props
}) {
  const reduce = useReducedMotion();
  const classes = `${base} ${styles[variant]} ${className}`;
  const tap = reduce ? undefined : { scale: 0.98 };

  if (to) {
    return (
      <motion.div whileTap={tap} className={className.includes("w-full") ? "flex w-full" : "inline-flex"}>
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={tap}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type || "button"} className={classes} whileTap={tap} {...props}>
      {children}
    </motion.button>
  );
}
