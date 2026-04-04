import React from "react";

export default function MinimalModal({ anchor, onClose, children }) {
  // Position near anchor if possible
  let style = {
    position: "fixed",
    top: 100,
    left: 100,
    background: "#222",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 8,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };
  if (anchor && anchor.getBoundingClientRect) {
    const rect = anchor.getBoundingClientRect();
    style.top = rect.bottom + 8;
    style.left = rect.left;
  }
  return (
    <div style={style} onClick={onClose}>
      {children}
    </div>
  );
}
