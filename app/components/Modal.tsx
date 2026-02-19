"use client";

import React, { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
            {title ?? "Popup"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-lg px-2 py-1 text-black hover:bg-black/5 dark:text-zinc-50 dark:hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 text-zinc-700 dark:text-zinc-200">{children}</div>
      </div>
    </div>
  );
}
