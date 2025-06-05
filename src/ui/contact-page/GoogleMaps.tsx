"use client";

import { useMemo } from "react";
import { useMediaQuery } from "@react-hookz/web";
import {
	AdvancedMarker,
	APIProvider,
	Map,
	useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { preconnect, prefetchDNS } from "react-dom";

import { COMPANY_GEO, COMPANY_INFO } from "@/utils/siteConfig";

function MapLoadingSkeleton() {
	return (
		<div
			className="size-full animate-pulse bg-gradient-to-br from-gray-100 to-gray-200"
			style={{ aspectRatio: "16/9" }}
		>
			<div className="flex h-full items-center justify-center">
				<div className="space-y-3 text-center">
					<div className="mx-auto h-4 w-32 animate-pulse rounded bg-gray-300" />
					<div className="mx-auto h-2 w-24 animate-pulse rounded bg-gray-300" />
				</div>
			</div>
		</div>
	);
}

function GoogleMapWithLoadingState() {
	const status = useApiLoadingStatus();
	const isLargeScreen = useMediaQuery("(min-width: 1024px)");

	const center = useMemo(() => {
		const lat = Number.parseFloat(COMPANY_GEO.latitude);
		const lng = Number.parseFloat(COMPANY_GEO.longitude);

		return isLargeScreen
			? { lat, lng: lng + 0.003 } // Slight offset for large screens
			: { lat, lng };
	}, [isLargeScreen]);

	const markerPosition = useMemo(
		() => ({
			lat: Number.parseFloat(COMPANY_GEO.latitude),
			lng: Number.parseFloat(COMPANY_GEO.longitude),
		}),
		[],
	);

	if (status !== "LOADED") {
		return <MapLoadingSkeleton />;
	}

	return (
		<Map
			className="size-full"
			defaultCenter={center}
			// Required for Advanced Markers - created this mapId in Google Cloud Console
			// Note: styles cannot be used when mapId is present (cloud-based styling should be used instead)
			// styles={mapStyles}
			defaultZoom={17}
			mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
			mapTypeControl
			mapTypeControlOptions={{
				mapTypeIds: [
					google.maps.MapTypeId.ROADMAP,
					google.maps.MapTypeId.SATELLITE,
					google.maps.MapTypeId.TERRAIN,
					google.maps.MapTypeId.HYBRID,
				],
				position: google.maps.ControlPosition.TOP_LEFT,
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			}}
			streetViewControl
		>
			<AdvancedMarker position={markerPosition} title={`${COMPANY_INFO.name}!`}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					alt={`${COMPANY_INFO.name} location marker`}
					decoding="sync"
					fetchPriority="high"
					height={40}
					loading="eager"
					src="/svg/marker.svg"
					width={40}
				/>
			</AdvancedMarker>
		</Map>
	);
}

export function GoogleMapComponent() {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	// Page-level resource optimization for above-the-fold Google Maps
	// This starts even before the GoogleMapComponent renders
	prefetchDNS("https://maps.googleapis.com");
	prefetchDNS("https://maps.gstatic.com");
	preconnect("https://maps.googleapis.com", { crossOrigin: "anonymous" });
	preconnect("https://maps.gstatic.com", { crossOrigin: "anonymous" });

	return (
		<APIProvider apiKey={apiKey} libraries={["marker"]}>
			<GoogleMapWithLoadingState />
		</APIProvider>
	);
}
