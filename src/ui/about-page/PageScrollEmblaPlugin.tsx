import type { EmblaCarouselType, EmblaPluginType } from "embla-carousel";

let cleanup: () => void;

function isSyntheticEvent(event: Event): boolean {
	return (event as Event & { synthetic?: boolean }).synthetic === true;
}

function createRelativePointerEvent(
	type: string,
	moveX: number,
	startEvent: MouseEvent | TouchEvent,
	baselineMoveX: number,
): MouseEvent | TouchEvent {
	const relativeMovement = moveX - baselineMoveX;

	if (startEvent instanceof TouchEvent && startEvent.touches.length > 0) {
		const touch = startEvent.touches[0];
		const syntheticTouchEvent = new TouchEvent(type, {
			bubbles: true,
			cancelable: true,
			composed: true,
			touches: [
				new Touch({
					clientX: touch.clientX + relativeMovement,
					clientY: touch.clientY,
					identifier: touch.identifier,
					pageX: touch.pageX + relativeMovement,
					pageY: touch.pageY,
					screenX: touch.screenX + relativeMovement,
					screenY: touch.screenY,
					target: touch.target,
				}),
			],
		});

		// @ts-expect-error - Mark the event as synthetic
		syntheticTouchEvent.synthetic = true;
		return syntheticTouchEvent;
	}

	const mouseEvent = startEvent as MouseEvent;
	const syntheticMouseEvent = new MouseEvent(type, {
		bubbles: true,
		button: 0,
		cancelable: true,
		clientX: mouseEvent.clientX + relativeMovement,
		clientY: mouseEvent.clientY,
		composed: true,
		movementX: relativeMovement,
		movementY: 0,
		screenX: mouseEvent.screenX + relativeMovement,
		screenY: mouseEvent.screenY,
	});

	// @ts-expect-error - Mark the event as synthetic
	syntheticMouseEvent.synthetic = true;
	return syntheticMouseEvent;
}

function onGlobalPointerMoveWrapper(isSyntheticActiveRef: () => boolean) {
	return function onGlobalPointerMove(e: MouseEvent | TouchEvent) {
		if (isSyntheticEvent(e)) return;

		if (e.isTrusted && isSyntheticActiveRef()) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	};
}

export function PageScrollEmblaPlugin(): EmblaPluginType {
	let embla: EmblaCarouselType;
	let startEvent: MouseEvent | null | TouchEvent = null;
	let baselineMoveX = 0;
	let isSyntheticActive = false;

	function init(instance: EmblaCarouselType) {
		embla = instance;
		const container = embla.containerNode();

		function onUserPointerDown() {
			if (isSyntheticActive) {
				releaseSynthetic(baselineMoveX);
			}
		}

		container.addEventListener("mousedown", onUserPointerDown);
		container.addEventListener("touchstart", onUserPointerDown);

		function dispatchEvent(event: Event) {
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
					bubbles: true,
					button: 0,
					cancelable: true,
					clientX: 0,
					clientY: 0,
					composed: true,
				});

				// @ts-expect-error - Mark the event as synthetic
				startEvent.synthetic = true;
				dispatchEvent(startEvent);
				isSyntheticActive = true;
			}

			const syntheticMove = createRelativePointerEvent(
				"mousemove",
				moveX,
				startEvent!,
				baselineMoveX,
			);
			dispatchEvent(syntheticMove);

			if (sTop >= hgt) {
				releaseSynthetic(moveX);
			}
		}

		function releaseSynthetic(moveX: number) {
			if (isSyntheticActive) {
				const syntheticUp = createRelativePointerEvent(
					"mouseup",
					moveX,
					startEvent!,
					baselineMoveX,
				);
				dispatchEvent(syntheticUp);
				isSyntheticActive = false;
			}
		}

		function onWindowPointerUp(e: MouseEvent | TouchEvent) {
			if (isSyntheticEvent(e)) return;
			releaseSynthetic(0);
		}

		const onGlobalPointerMove = onGlobalPointerMoveWrapper(
			() => isSyntheticActive,
		);

		window.addEventListener("scroll", onScroll);
		globalThis.addEventListener("mousemove", onGlobalPointerMove, true);
		globalThis.addEventListener("mouseup", onWindowPointerUp);
		globalThis.addEventListener("touchmove", onGlobalPointerMove, true);
		globalThis.addEventListener("touchend", onWindowPointerUp);

		cleanup = () => {
			window.removeEventListener("scroll", onScroll);
			globalThis.removeEventListener("mousemove", onGlobalPointerMove, true);
			globalThis.removeEventListener("mouseup", onWindowPointerUp);
			globalThis.removeEventListener("touchmove", onGlobalPointerMove, true);
			globalThis.removeEventListener("touchend", onWindowPointerUp);
			container.removeEventListener("mousedown", onUserPointerDown);
			container.removeEventListener("touchstart", onUserPointerDown);
		};
	}

	return {
		destroy: () => {
			cleanup();
		},
		init,
		name: "PageScrollEmblaPlugin",
		options: {},
	};
}
