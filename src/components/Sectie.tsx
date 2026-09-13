import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Sectie({ children, className, ...props }: SectionProps) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-20 lg:px-8${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </section>
  );
}
