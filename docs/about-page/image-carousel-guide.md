# Scroll-Driven Carousel Guide

## Overview

This is a comprehensive guide for the scroll-driven carousel implementation that provides smooth, continuous scroll-driven movement while maintaining full manual drag functionality. The carousel moves horizontally as users scroll vertically through the page.

## Quick Start

### Configuration

```typescript
const SCROLL_SPEED = 2000; // Pixels to scroll through entire page
// Higher = faster carousel movement
// Lower = slower carousel movement
```

## Architecture

### Core Components

- **`ImageCarousel.tsx`**: Server component wrapper that handles data and structure
- **`ImageCarouselClient.tsx`**: Client component with scroll synchronization and performance optimizations

### Key Technologies

- **Motion.js**: Provides `useScroll`, `useInView`, and `useMotionValue` hooks for optimized scroll tracking and performance
- **Embla Carousel React**: Core carousel functionality with native slide visibility tracking
- **React Hooks**: Streamlined state management leveraging library optimizations
- **CSS Transforms**: Direct manipulation for pixel-perfect positioning

## Implementation Details

### Performance-Optimized State Management

```typescript
// Performance-optimized constants
const SCROLL_SPEED = 2000;

// Motion values for animation data (no re-renders)
const baseOffset = useMotionValue(0);
const lastScrollProgress = useMotionValue(0);

// Simplified state for non-animation data
const stateRef = useRef({
	isDragging: false,
	isInMomentum: false,
	momentumRAF: null as null | number,
});
```

### Optimized Library Integration

#### Motion's useInView Hook

```typescript
// Motion's optimized visibility detection
const isInView = useInView(containerRef, {
	margin: "50px", // Start animating slightly before visible
});
```

**Benefits:**

- Built-in performance optimizations
- Automatic cleanup and memory management
- Better integration with Motion's animation system
- More efficient intersection detection

#### Embla's Native Slide Visibility

```typescript
// Track slides in view using Embla's native methods
useEffect(() => {
	if (!emblaApi) return;

	const updateSlidesInView = () => {
		const inView = emblaApi.slidesInView();
		const notInView = emblaApi.slidesNotInView();
		// Process visibility changes
	};

	// Use Embla's optimized slidesInView event
	emblaApi.on("slidesInView", updateSlidesInView);
	return () => emblaApi.off("slidesInView", updateSlidesInView);
}, [emblaApi]);
```

**Benefits:**

- Leverages Embla's native IntersectionObserver implementation
- More accurate slide visibility tracking
- Better integration with carousel state

### Core Implementation

#### Scroll-Driven Animation Handler

```typescript
const handleScroll = useCallback(
	(progress: number) => {
		if (!emblaApi || stateRef.current.isDragging || !isVisible) return;

		// If in momentum, stop it immediately for scroll takeover
		if (stateRef.current.isInMomentum) {
			stateRef.current.isInMomentum = false;

			if (stateRef.current.momentumRAF) {
				cancelAnimationFrame(stateRef.current.momentumRAF);
				stateRef.current.momentumRAF = null;
			}

			// Get final position and sync using motion values
			const engine = emblaApi.internalEngine();
			const currentLocation = engine.location.get();
			const expectedLocation = -(progress * SCROLL_SPEED);
			baseOffset.set(currentLocation - expectedLocation);
		}

		// Motion automatically batches and optimizes these updates
		const engine = emblaApi.internalEngine();
		const targetPosition = -(progress * SCROLL_SPEED) + baseOffset.get();
		const currentPosition = engine.location.get();
		const distance = targetPosition - currentPosition;

		// Only update if significant change (Motion optimization)
		if (Math.abs(distance) > 0.5) {
			engine.scrollTo.distance(distance, false);
			engine.location.set(targetPosition);
			engine.translate.to(targetPosition);
		}

		lastScrollProgress.set(progress);
	},
	[emblaApi, isVisible, baseOffset, lastScrollProgress],
);

// Motion's optimized event listener (no custom throttling needed)
useMotionValueEvent(scrollYProgress, "change", handleScroll);
```

#### Momentum Monitoring

Critical feature for handling flick gestures smoothly:

```typescript
const monitorMomentum = useCallback(() => {
	if (!emblaApi || !stateRef.current.isInMomentum) return;

	const engine = emblaApi.internalEngine();
	const currentLocation = engine.location.get();
	const scrollProgress = lastScrollProgress.get();
	const expectedLocation = -(scrollProgress * SCROLL_SPEED);
	const newOffset = currentLocation - expectedLocation;

	// Update offset using motion value
	baseOffset.set(newOffset);

	// Continue monitoring
	stateRef.current.momentumRAF = requestAnimationFrame(monitorMomentum);
}, [emblaApi, baseOffset, lastScrollProgress]);
```

#### Drag Event Handling

```typescript
const onPointerDown = () => {
	stateRef.current.isDragging = true;
	stateRef.current.isInMomentum = false;

	// Cancel any ongoing momentum monitoring
	if (stateRef.current.momentumRAF) {
		cancelAnimationFrame(stateRef.current.momentumRAF);
		stateRef.current.momentumRAF = null;
	}
};

const onPointerUp = () => {
	stateRef.current.isDragging = false;
	stateRef.current.isInMomentum = true;

	// Start momentum monitoring immediately
	stateRef.current.momentumRAF = requestAnimationFrame(monitorMomentum);
};

const onSettle = () => {
	stateRef.current.isInMomentum = false;

	// Cancel momentum monitoring
	if (stateRef.current.momentumRAF) {
		cancelAnimationFrame(stateRef.current.momentumRAF);
		stateRef.current.momentumRAF = null;
	}

	// Final sync
	syncAfterDrag();
};
```

### Embla Configuration

#### Embla Carousel Options

```typescript
const [emblaRef, emblaApi] = useEmblaCarousel(
	{
		dragFree: true,
		loop: true,
	},
	[ClassNames()],
);
```

## Key Features

### 1. Position Synchronization

Ensures smooth transitions between automated scroll and manual drag by maintaining a base offset that tracks the difference between expected and actual positions.

### 2. Visibility-Based Optimization

Uses Motion's optimized `useInView` hook to detect when carousel is visible and only animates when necessary, improving performance.

### 3. Automatic Batching and Throttling

Motion automatically handles update batching and throttling, ensuring optimal performance without custom implementation.

### 4. Momentum Handling

Monitors carousel position during flick animations to prevent position jumps when transitioning from drag to scroll.

### 5. Performance Optimizations

- **Smart Update Batching**: Only updates when distance > 0.5px
- **Direct Engine API**: Access Embla's internal engine for optimal performance
- **Memory Management**: Proper cleanup prevents memory leaks
- **Browser-Specific**: Optimizations for Chrome, Safari, Firefox, and mobile

## Optimization Evolution

### Recent Performance Improvements

The carousel implementation was recently optimized to leverage library-native features instead of custom implementations:

#### Motion Library Integration

**Replaced Custom Hooks:**

- `useVisibilityOptimization` → Motion's `useInView`
- `useThrottledRAF` → Motion's automatic batching
- Custom state management → `useMotionValue` for animation data

**Benefits:**

- Reduced codebase by ~77 lines of custom hook implementations
- Better performance through library-native optimizations
- Automatic cleanup and memory management
- Future-proof updates from library improvements

#### Embla Integration Enhancements

**Added Native Features:**

- `slidesInView()` and `slidesNotInView()` methods
- `slidesInView` event for optimized updates
- Native IntersectionObserver implementation

**Benefits:**

- More accurate slide visibility tracking
- Better integration with carousel state
- Automatic performance optimizations

#### Performance Impact

**Before Optimization:**

- Custom IntersectionObserver implementation
- Manual RAF throttling with 16ms intervals
- Complex state management causing potential re-renders
- Custom batching and update logic

**After Optimization:**

- Motion's optimized `useInView` with built-in performance enhancements
- Motion's automatic batching and throttling
- Motion values preventing unnecessary re-renders
- Simplified update logic leveraging library optimizations

## Future Enhancements

1. **Virtual Scrolling**: For carousels with 100+ items
2. **Gesture Prediction**: Anticipate user intent
3. **WebWorker Calculations**: Offload complex computations
4. **Progressive Enhancement**: Reduced motion support
