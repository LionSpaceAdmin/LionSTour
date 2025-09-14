"use client";

import { Link } from "react-scroll";

interface SmoothScrollProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function SmoothScroll({ to, children, className }: SmoothScrollProps) {
  return (
    <Link
      to={to}
      spy={true}
      smooth={true}
      duration={500}
      className={className}
    >
      {children}
    </Link>
  );
}
