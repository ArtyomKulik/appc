import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePortal } from "../../lib/hooks";

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export default function PortalWrapper({ children, containerId }: PortalProps) {
  const target = usePortal(containerId);
  console.log(target, "<-----target", containerId);
  if (!target) return null;

  return createPortal(children, target);
}
