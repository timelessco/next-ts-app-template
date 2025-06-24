# Carousel Reference Guide

## Debugging & Troubleshooting

### Debug Logging System

#### Console Log Types

- **🟢 Green**: Normal operation logs
- **🔵 Blue**: State change events (drag start/end, initialization)
- **🟡 Yellow**: Skipped operations (optimization working)
- **🔴 Red**: Error conditions
- **🛑 Stop**: Momentum interruption events

#### Console Log Examples

**Smooth Operation:**

```typescript
🟢 Scroll update {baseOffset: '-318.4', currentPosition: '-1136.6', distance: '0.0', isDragging: false, isVisible: true, progress: '0.411', targetPosition: '-1136.6'}
```

**Momentum Handling:**

```typescript
🔵 Pointer up - ending drag
🔵 Momentum monitoring {currentLocation: '-2675.6', expectedLocation: '-2000.0', newOffset: '-675.6', scrollProgress: '1.000'}
🛑 Stopping momentum for scroll takeover
```

### Common Issues & Solutions

#### 1. Position Synchronization Problems

**Symptoms**: Carousel jumps after drag
**Cause**: Offset calculation mismatch

```typescript
// Solution: Monitor and sync after drag
const syncAfterDrag = useCallback(() => {
	const engine = emblaApi.internalEngine();
	const currentLocation = engine.location.get();
	const expectedLocation = -(
		stateRef.current.lastScrollProgress * SCROLL_SPEED
	);
	const newOffset = currentLocation - expectedLocation;
	stateRef.current.baseOffset = newOffset;
}, [emblaApi]);
```

#### 2. Momentum Issues

**Problem**: Flick gestures cause position jumps
**Example**: After drag ends: position = -2675.6, When scroll starts: position = -3884.3 (jump of ~1209px!)

**Solution**: Real-time momentum monitoring (implemented in core)

#### 3. Scroll Speed Inconsistencies

```typescript
const SCROLL_SPEED = 2000; // Adjust this value
// Higher = faster, Lower = slower
```

#### 4. Performance Issues

**Symptoms**: Janky animation, dropped frames
**Solutions**:

- Enable RAF throttling
- Check visibility optimization
- Profile with DevTools
- Verify GPU acceleration

### Debugging Tools

#### Enhanced Debug Logging

```typescript
// Add to component for detailed tracking
console.log("🔍 Debug:", {
	baseOffset: stateRef.current.baseOffset.toFixed(1),
	currentPosition: currentPosition.toFixed(1),
	distance: distance.toFixed(1),
	isDragging: stateRef.current.isDragging,
	isInMomentum: stateRef.current.isInMomentum,
	isVisible,
	progress: progress.toFixed(3),
	targetPosition: targetPosition.toFixed(1),
});
```

#### Visual Debug Indicators

```css
/* Add to carousel for debugging */
.debug-carousel {
	outline: 2px solid red;
	position: relative;
}

.debug-carousel::before {
	content: attr(data-debug);
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(255, 0, 0, 0.8);
	color: white;
	padding: 4px;
	font-size: 12px;
	z-index: 1000;
}
```

#### State Inspector

```typescript
// Add to component for state inspection
useEffect(() => {
	const interval = setInterval(() => {
		console.table({
			baseOffset: stateRef.current.baseOffset,
			isDragging: stateRef.current.isDragging,
			isInMomentum: stateRef.current.isInMomentum,
			lastEngineLocation: stateRef.current.lastEngineLocation,
			lastScrollProgress: stateRef.current.lastScrollProgress,
			momentumRAF: stateRef.current.momentumRAF,
		});
	}, 1000);

	return () => clearInterval(interval);
}, []);
```

### Testing

#### Manual Testing Checklist

1. **Smooth scroll down** - carousel moves left smoothly
2. **Smooth scroll up** - carousel moves right smoothly
3. **Drag carousel right** - manual control works
4. **Drag carousel left** - manual control works
5. **Drag then scroll** - continues from drag position
6. **Flick gesture** - momentum handled smoothly
7. **Rapid scroll changes** - handles direction changes
8. **Scroll to boundaries** - handles top/bottom correctly
9. **Mobile touch** - works on touch devices

#### Automated Testing

```typescript
// Playwright test examples
test("carousel follows page scroll", async ({ page }) => {
	await page.goto("/about");

	const initialTransform = await page
		.locator('[data-testid="carousel"]')
		.evaluate((el) => getComputedStyle(el).transform);

	await page.evaluate(() => window.scrollBy(0, 1000));

	const newTransform = await page
		.locator('[data-testid="carousel"]')
		.evaluate((el) => getComputedStyle(el).transform);

	expect(newTransform).not.toBe(initialTransform);
});

test("carousel handles drag interaction", async ({ page }) => {
	await page.goto("/about");

	const carousel = page.locator('[data-testid="carousel"]');

	await carousel.dragTo(carousel, {
		sourcePosition: { x: 100, y: 50 },
		targetPosition: { x: 300, y: 50 },
	});

	const transform = await carousel.evaluate(
		(el) => getComputedStyle(el).transform,
	);
	expect(transform).toContain("matrix");
});
```

### Error Recovery

#### Position Reset

```typescript
function resetCarouselPosition() {
	const engine = emblaApi.internalEngine();
	const currentProgress = stateRef.current.lastScrollProgress;
	const expectedPosition = -(currentProgress * SCROLL_SPEED);

	stateRef.current.baseOffset = 0;
	engine.location.set(expectedPosition);
	engine.target.set(expectedPosition);
	engine.translate.to(expectedPosition);
}
```

#### State Reset

```typescript
function resetCarouselState() {
	stateRef.current = {
		baseOffset: 0,
		isDragging: false,
		isInMomentum: false,
		lastEngineLocation: 0,
		lastScrollProgress: 0,
		momentumRAF: null,
	};

	if (stateRef.current.momentumRAF) {
		cancelAnimationFrame(stateRef.current.momentumRAF);
	}
}
```

## Performance Optimization

### Advanced Strategies

#### Transform Batching

```typescript
const pendingTransform = useRef<number | null>(null);

useMotionValueEvent(scrollYProgress, "change", (progress) => {
	const targetScroll = -(progress * scrollSpeed) + pixelOffset;

	if (pendingTransform.current === null) {
		pendingTransform.current = requestAnimationFrame(() => {
			engine.location.set(targetScroll);
			engine.target.set(targetScroll);
			engine.translate.to(targetScroll);
			pendingTransform.current = null;
		});
	}
});
```

#### Memory Management

```typescript
// Proper cleanup prevents memory leaks
useEffect(() => {
	if (!emblaApi) return;

	const controllers = new Set<AbortController>();

	return () => {
		controllers.forEach((controller) => controller.abort());
		if (stateRef.current.momentumRAF) {
			cancelAnimationFrame(stateRef.current.momentumRAF);
		}
	};
}, [emblaApi]);
```

#### Direct Engine API Usage

```typescript
// Access Embla's internal engine for optimal performance
const engine = emblaApi.internalEngine();
const scrollTo = engine.scrollTo;
const location = engine.location;
const translate = engine.translate;

// Direct position updates
scrollTo.distance(distance, false);
location.set(targetPosition);
translate.to(targetPosition);
```

### Browser-Specific Optimizations

#### Safari

```typescript
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
	// Reduce update frequency
	const throttledUpdate = throttle(updateCarousel, 16);
}
```

#### Firefox

```typescript
const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
if (isFirefox) {
	// Direct style manipulation
	containerNode.style.transform = `translate3d(${targetScroll}px, 0, 0)`;
}
```

#### Mobile

```typescript
const isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
if (isMobile) {
	const mobileScrollSpeed = scrollSpeed * 0.7;
	containerNode.style.touchAction = "pan-y pinch-zoom";
}
```

### Performance Monitoring

#### Runtime Tracking

```typescript
function usePerformanceMonitor() {
	const frameTimings = useRef<number[]>([]);

	useEffect(() => {
		function trackFrame() {
			const now = performance.now();
			const frameDuration = now - lastFrameTime.current;

			if (frameDuration > 20) {
				console.warn(`Slow frame: ${frameDuration.toFixed(2)}ms`);
			}

			requestAnimationFrame(trackFrame);
		}

		requestAnimationFrame(trackFrame);
	}, []);
}
```

#### Performance Budget

```typescript
const PERFORMANCE_BUDGET = {
	maxFrameTime: 16.67, // 60fps
	maxMemoryGrowth: 5 * 1024 * 1024, // 5MB
	maxCPUUsage: 15, // 15%
	maxScrollDelay: 8, // 8ms
};
```

## Research & Technical Background

### Problem Evolution

The implementation evolved through several approaches:

1. **Motion Wrapper**: Used Motion.js wrapper → Moved container, not content
2. **scrollTo() Method**: Used Embla's built-in method → Discrete snapping
3. **Synthetic Events**: Generated fake mouse events → Complex, bug-prone
4. **Internal Engine Direct**: Direct state manipulation → Position sync issues
5. **Current Implementation**: Real-time momentum monitoring → ✅ Smooth operation

### Architecture Decisions

#### Why Motion.js for Scroll Tracking

- **Alternative**: Native scroll event listeners
- **Chosen**: Motion.js `useScroll`
- **Reasoning**: Superior React integration, smooth progress values

#### Why Direct Internal Engine Access

- **Alternative**: Higher-level Embla APIs
- **Chosen**: `emblaApi.internalEngine()`
- **Reasoning**: Precise control unavailable through public APIs

#### Why Pixel-Based Offset Tracking

- **Alternative**: Progress-based calculations
- **Chosen**: Actual pixel positions
- **Reasoning**: Eliminates coordinate confusion

### Key Insights

1. **Direct DOM Manipulation**: Sometimes bypass abstractions for control
2. **Coordinate Consistency**: Don't mix measurement systems
3. **State Synchronization**: Visual and logical state can diverge
4. **Event Timing**: Order matters for preventing conflicts

### Common Pitfalls

#### State Update Timing

**Issue**: Using stale state in callbacks
**Solution**: Use refs for values accessed in closures

#### Event Cleanup

**Issue**: Memory leaks from event listeners
**Solution**: Proper cleanup in useEffect

#### Coordinate System

**Convention**: Negative X = moved left, Positive X = moved right

### Reusable Patterns

#### Debug Logging Utility

```typescript
function logCarouselState(context: string, data: Record<string, any>) {
	console.log(
		`🚀 ~ ${context}:`,
		Object.fromEntries(
			Object.entries(data).map(([k, v]) => [
				k,
				typeof v === "number" ? v.toFixed(1) : v,
			]),
		),
	);
}
```

#### Transform Application Utility

```typescript
function applyCarouselTransform(engine: any, position: number) {
	engine.location.set(position);
	engine.target.set(position);
	engine.translate.to(position);
}
```

## Current Implementation Status

### ✅ Optimizations Completed

The ImageCarousel implementation has been optimized to leverage library-native features:

**Motion Library Integration:**

- ✅ Replaced `useVisibilityOptimization` with Motion's `useInView`
- ✅ Removed `useThrottledRAF` in favor of Motion's automatic batching
- ✅ Implemented `useMotionValue` for animation data (prevents re-renders)
- ✅ Streamlined scroll event handling with `useMotionValueEvent`

**Embla Integration Enhancements:**

- ✅ Integrated `slidesInView()` and `slidesNotInView()` methods
- ✅ Added `slidesInView` event for optimized slide visibility tracking
- ✅ Leveraging Embla's native IntersectionObserver implementation

**Performance Improvements:**

- ✅ Reduced codebase by ~77 lines of custom hook implementations
- ✅ Motion values prevent unnecessary React re-renders
- ✅ Automatic batching and throttling from Motion library
- ✅ Better memory management with library-handled cleanup

**Testing Status:**

- ✅ TypeScript compilation passes
- ✅ ESLint checks pass
- ✅ Build succeeds
- ✅ All functionality preserved

### Console Logging

The implementation includes optimized logging for monitoring:

- `🟢 Scroll update` - Shows distance, progress, and slides in view
- `🟢 Slides visibility update` - Embla's native slide visibility tracking
- `🔵 Momentum monitoring` - Flick gesture handling
- `🔵 Sync after drag` - Position synchronization

## Support Resources

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Motion.js DevTools](https://motion.dev/docs/debug)
- [Embla Carousel Debug](https://www.embla-carousel.com/api/methods/#scrollsnaplist)
