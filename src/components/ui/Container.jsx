import React from "react";
export default function Container({ children, className, ...props }) {
    return (<section className={`mx-auto max-w-7xl px-5 py-20 lg:px-8${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </section>);
}
