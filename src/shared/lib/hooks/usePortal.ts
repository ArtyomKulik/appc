// shared/lib/hooks/usePortal.ts
import { useEffect, useRef, useState } from "react";

/**
 * Создаёт DOM-узел для портала и возвращает ссылку на него.
 * Если containerId уже существует — использует его повторно.
 */
export function usePortal(containerId = "portal-root") {
  const ref = useRef<HTMLDivElement | null>(null);
  const [portalEl, setPortalEl] = useState<Element | null>(null);

  useEffect(() => {
    // ищем готовый контейнер или создаём новый
    let root = document.getElementById(containerId);
    if (!root) {
      root = document.createElement("div");
      root.id = containerId;
      document.body.appendChild(root);
    }

    // создаём внутренний div-контейнер,
    // чтобы каждый вызов хука был изолирован
    const el = document.createElement("div");
    ref.current = el;
    root.appendChild(el);
    setPortalEl(el);

    return () => {
      // удаляем внутренний контейнер при размонтировании
      if (ref.current) {
        root!.removeChild(ref.current);
      }
      // при желании можно удалять и сам root, если в нём больше нет детей
    };
  }, [containerId]);

  return portalEl;
}
