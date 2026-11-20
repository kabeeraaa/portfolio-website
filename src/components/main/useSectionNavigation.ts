import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { menuItems } from "../data/portfolioData";
import type { SectionId } from "../data/portfolioData";

const desktopViewport = "(min-width: 64rem)";
const rowTolerance = 2;
const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];

export function useSectionNavigation(
  frameRef: RefObject<HTMLDivElement | null>,
  headerRef: RefObject<HTMLElement | null>,
) {
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const pendingTop = useRef<number | null>(null);
  const scrollTimeout = useRef<number | undefined>(undefined);

  const clearPendingScroll = useCallback(() => {
    pendingTop.current = null;
    window.clearTimeout(scrollTimeout.current);
  }, []);

  const getViewport = useCallback(() => {
    const desktop = window.matchMedia(desktopViewport).matches;
    const frame = desktop ? null : frameRef.current;
    const header = headerRef.current;
    const offset = desktop && header
      ? header.offsetHeight + 2 * Number.parseFloat(getComputedStyle(header).top)
      : 72;

    return {
      offset,
      frameTop: frame?.getBoundingClientRect().top ?? 0,
      scrollTop: frame?.scrollTop ?? window.scrollY,
      maxScroll: frame
        ? frame.scrollHeight - frame.clientHeight
        : document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scroller: frame ?? window,
    };
  }, [frameRef, headerRef]);

  useEffect(() => {
    const sections = menuItems.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    const frame = frameRef.current;
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const viewport = getViewport();
      if (pendingTop.current !== null) {
        if (Math.abs(viewport.scrollTop - pendingTop.current) <= rowTolerance) clearPendingScroll();
        return;
      }

      const atBottom = viewport.maxScroll > rowTolerance
        && viewport.scrollTop >= viewport.maxScroll - rowTolerance;
      const readingLine = atBottom ? Infinity : viewport.frameTop + viewport.offset + rowTolerance;
      const reached = sections
        .map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top }))
        .filter(({ top }) => top <= readingLine);
      const rowTop = Math.max(...reached.map(({ top }) => top));
      const row = reached.filter(({ top }) => rowTop - top <= rowTolerance);

      // Desktop sections in one grid row share a scroll position.
      setActiveSection((current) => row.some(({ id }) => id === current) ? current : row[0]?.id ?? "about");
    };

    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveSection);
    };
    const onResize = () => {
      clearPendingScroll();
      onScroll();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (scrollKeys.includes(event.key)) clearPendingScroll();
    };

    frame?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", clearPendingScroll, { passive: true });
    window.addEventListener("pointerdown", clearPendingScroll);
    window.addEventListener("keydown", onKeyDown);
    onScroll();

    return () => {
      frame?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", clearPendingScroll);
      window.removeEventListener("pointerdown", clearPendingScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(animationFrame);
      clearPendingScroll();
    };
  }, [clearPendingScroll, frameRef, getViewport]);

  const navigateToSection = (id: SectionId, behavior: ScrollBehavior) => {
    const target = document.getElementById(id);
    if (!target) return;

    const viewport = getViewport();
    const targetTop = viewport.scrollTop + target.getBoundingClientRect().top - viewport.frameTop - viewport.offset;
    const top = Math.max(0, Math.min(targetTop, viewport.maxScroll));

    clearPendingScroll();
    if (Math.abs(top - viewport.scrollTop) > rowTolerance) {
      pendingTop.current = top;
      scrollTimeout.current = window.setTimeout(clearPendingScroll, 1000);
    }

    setActiveSection(id);
    target.focus({ preventScroll: true });
    viewport.scroller.scrollTo({ top, behavior });
  };

  return { activeSection, navigateToSection };
}
