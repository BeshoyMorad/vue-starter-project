import { ref, onUnmounted } from 'vue';

// Custom high-contrast eyedropper pen cursor with hotspot at the dropper tip (x: 2, y: 22)
export const EYEDROPPER_PEN_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M14.5 3.5a2.121 2.121 0 0 1 3 3L16 8l-3-3 1.5-1.5z' fill='%230f172a' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M13 5L4 14l-2 7 7-2 9-9-5-5z' fill='%231e293b' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M2 21l3-3' stroke='%2306b6d4' stroke-width='2.5' stroke-linecap='round'/%3E%3Ccircle cx='18' cy='6' r='1.5' fill='%2338bdf8'/%3E%3C/svg%3E") 2 22, crosshair`;

let canvasCtx: CanvasRenderingContext2D | null = null;

function getCanvasContext(): CanvasRenderingContext2D | null {
  if (!canvasCtx && typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvasCtx = canvas.getContext('2d', { willReadFrequently: true });
  }
  return canvasCtx;
}

function cssColorToHex(color: string): string | null {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
    return null;
  }
  const ctx = getCanvasContext();
  if (!ctx) return null;

  try {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 0) return null;
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`.toLowerCase();
  } catch {
    return null;
  }
}

function sampleColorAt(x: number, y: number): string {
  if (typeof document === 'undefined') return '#000000';

  const elements = document.elementsFromPoint(x, y);
  for (const el of elements) {
    if (!(el instanceof HTMLElement || el instanceof SVGElement)) continue;
    if (el.getAttribute('data-eyedropper-ignore') !== null) continue;

    const style = window.getComputedStyle(el);
    const bgHex = cssColorToHex(style.backgroundColor);
    if (bgHex) return bgHex;

    if (el instanceof SVGElement) {
      const fillHex = cssColorToHex(style.fill);
      if (fillHex) return fillHex;
      const strokeHex = cssColorToHex(style.stroke);
      if (strokeHex) return strokeHex;
    }

    const hasText = Array.from(el.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0
    );
    if (hasText) {
      const textHex = cssColorToHex(style.color);
      if (textHex) return textHex;
    }
  }

  return '#ffffff';
}

// eslint-disable-next-line max-lines-per-function
export function useInPageEyeDropper() {
  const isActive = ref(false);
  const cursorX = ref(0);
  const cursorY = ref(0);
  const currentHex = ref('#000000');
  let activeCallback: ((hex: string) => void) | null = null;

  function handlePointerMove(e: PointerEvent) {
    if (!isActive.value) return;
    cursorX.value = e.clientX;
    cursorY.value = e.clientY;
    currentHex.value = sampleColorAt(e.clientX, e.clientY);
  }

  function handlePointerDown(e: PointerEvent) {
    if (!isActive.value) return;
    e.preventDefault();
    e.stopPropagation();
    const selected = currentHex.value;
    stop();
    activeCallback?.(selected);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (isActive.value && e.key === 'Escape') {
      e.preventDefault();
      stop();
    }
  }

  function handleContextMenu(e: MouseEvent) {
    if (isActive.value) {
      e.preventDefault();
      stop();
    }
  }

  function start(callback: (hex: string) => void) {
    if (typeof window === 'undefined') return;
    activeCallback = callback;
    isActive.value = true;
    cursorX.value = window.innerWidth / 2;
    cursorY.value = window.innerHeight / 2;

    window.addEventListener('pointermove', handlePointerMove, { capture: true, passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
  }

  function stop() {
    isActive.value = false;
    activeCallback = null;

    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', handlePointerMove, { capture: true });
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    }
  }

  onUnmounted(() => {
    stop();
  });

  return { isActive, cursorX, cursorY, currentHex, start, stop };
}
