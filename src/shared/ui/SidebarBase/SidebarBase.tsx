import { type ReactNode } from "react";
import "./SidebarBase.scss";

type SidebarBaseProps = {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
  position?: "left" | "right";
  showBackdrop?: boolean;
};

export default function SidebarBase({
  isOpen = false,
  onClose,
  title,
  children,
  width = "300px",
  position = "right",
  showBackdrop = true,
}: SidebarBaseProps) {
  if (!isOpen) return null;

  return (
    <>
      {showBackdrop && <div className="sidebar-base__backdrop" onClick={onClose} />}

      <aside
        className={`sidebar-base sidebar-base--${position} ${
          isOpen ? "sidebar-base--open" : ""
        }`}
        style={{ "--sidebar-width": width } as React.CSSProperties}
      >
        {(title || onClose) && (
          <div className="sidebar-base__header">
            {title && <h2 className="sidebar-base__title">{title}</h2>}
            {onClose && (
              <button
                className="sidebar-base__close"
                onClick={onClose}
                aria-label="Закрыть"
              >
                X
              </button>
            )}
          </div>
        )}

        <div className="sidebar-base__content">{children}</div>
      </aside>
    </>
  );
}
