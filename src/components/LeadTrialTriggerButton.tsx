"use client";

import React from "react";
import { openLeadModal } from "@/lib/openLeadModal";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function LeadTrialTriggerButton({ children, onClick, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openLeadModal(e);
    if (onClick) onClick(e);
  };

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
