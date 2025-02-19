import { EmblaCarouselType, EmblaPluginType } from "embla-carousel";

export function PageScrollEmblaPlugin(): EmblaPluginType {
  let embla: EmblaCarouselType;
  let startEvent: MouseEvent | null = null;
  let baselineMoveX = 0;
  let isSyntheticActive = false;
  let cleanup = () => {};

  function init(instance: EmblaCarouselType) {
    embla = instance;
    const container = embla.containerNode();

    function createRelativeMouseEvent(
      type: "mousedown" | "mousemove" | "mouseup",
      moveX: number
    ) {
      const relativeMovement = moveX - baselineMoveX;
      return new MouseEvent(type, {
        clientX: (startEvent?.clientX ?? 0) + relativeMovement,
        clientY: startEvent?.clientY ?? 0,
        screenX: (startEvent?.screenX ?? 0) + relativeMovement,
        screenY: (startEvent?.screenY ?? 0) + relativeMovement,
        movementX: relativeMovement,
        movementY: 0,
        button: 0,
        bubbles: true,
        cancelable: true,
        composed: true,
      });
    }

    function dispatchEvent(event: MouseEvent) {
      container.dispatchEvent(event);
    }

    function onScroll() {
      const sTop = window.scrollY;
      const hgt = document.documentElement.scrollHeight - window.innerHeight;
      const fValue = (sTop / hgt) * 100;
      const moveX = -10 * fValue;

      if (!isSyntheticActive) {
        baselineMoveX = moveX;
        startEvent = new MouseEvent("mousedown", {
          clientX: 0,
          clientY: 0,
          button: 0,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        dispatchEvent(startEvent);
        isSyntheticActive = true;
      }

      const syntheticMove = createRelativeMouseEvent("mousemove", moveX);
      dispatchEvent(syntheticMove);

      if (sTop >= hgt) {
        releaseSynthetic(moveX);
      }
    }

    function releaseSynthetic(moveX: number) {
      if (isSyntheticActive) {
        const syntheticUp = createRelativeMouseEvent("mouseup", moveX);
        dispatchEvent(syntheticUp);
        isSyntheticActive = false;
      }
    }

    function onGlobalMouseMove(e: MouseEvent) {
      if (e.isTrusted && isSyntheticActive) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    const onWindowMouseUp = () => releaseSynthetic(0);

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onGlobalMouseMove, true);
    window.addEventListener("mouseup", onWindowMouseUp);

    cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onGlobalMouseMove, true);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  }

  return {
    name: "PageScrollEmblaPlugin",
    options: {},
    init,
    destroy: () => cleanup(),
  };
}
