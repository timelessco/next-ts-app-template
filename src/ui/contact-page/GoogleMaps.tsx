"use client";

import { useCallback, useMemo } from "react";
import {
	GoogleMap,
	useLoadScript,
	type Libraries,
} from "@react-google-maps/api";
import { useMediaQuery } from "@react-hookz/web";

import { Spinner } from "@/components/Spinner";
import { COMPANY_GEO, COMPANY_INFO } from "@/utils/siteConfig";

export function GoogleMapComponent() {
	const isLargeScreen = useMediaQuery("(min-width: 1024px)");
	const center = useMemo(() => {
		const lat = Number.parseFloat(COMPANY_GEO.latitude);
		const lng = Number.parseFloat(COMPANY_GEO.longitude);

		return isLargeScreen
			? { lat, lng: lng + 0.003 } // Slight offset for large screens
			: { lat, lng };
	}, [isLargeScreen]);

	const libraries = useMemo<Libraries>(() => ["marker"], []);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	const onLoad = useCallback((map: google.maps.Map) => {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		new google.maps.Marker({
			icon: {
				scaledSize: new google.maps.Size(40, 40),
				url: "/svg/marker.svg",
			},
			map,
			position: {
				lat: Number.parseFloat(COMPANY_GEO.latitude),
				lng: Number.parseFloat(COMPANY_GEO.longitude),
			},
			title: `${COMPANY_INFO.name}!`,
		});

		// TODO: Use advanced marker instead of marker with custom map ID
		// TODO: A Map's styles property cannot be set when a mapId is present.
		// const markerIcon = document.createElement("img");
		// markerIcon.src = "/svg/marker.svg";
		// markerIcon.width = 40;
		// markerIcon.height = 40;

		// new google.maps.marker.AdvancedMarkerElement({
		// 	content: markerIcon,
		// 	map,
		// 	position: {
		//		lat: Number.parseFloat(COMPANY_GEO.latitude),
		//		lng: Number.parseFloat(COMPANY_GEO.longitude)
		//	},
		// 	title: `${COMPANY_INFO.name}!`,
		// });
	}, []);

	if (loadError) {
		console.error(loadError);

		return null;
	}

	if (!isLoaded) return <Spinner className="size-8 border-4" />;

	return (
		<GoogleMap
			center={center}
			mapContainerClassName="size-full"
			onLoad={onLoad}
			options={{
				// TODO: add this once we have a proper map id
				// mapId: "TIMELESS_MAP_ID",
				cameraControl: true,
				disableDefaultUI: true,
				mapTypeControl: true,
				mapTypeControlOptions: {
					mapTypeIds: [
						google.maps.MapTypeId.ROADMAP,
						google.maps.MapTypeId.SATELLITE,
						google.maps.MapTypeId.TERRAIN,
						google.maps.MapTypeId.HYBRID,
					],
					position: google.maps.ControlPosition.TOP_LEFT,
					style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				},
				streetViewControl: true,
				styles: mapStyles,
			}}
			zoom={16.75}
		/>
	);
}

const mapStyles = [
	{
		elementType: "labels.text.fill",
		featureType: "administrative",
		stylers: [{ color: "#444444" }],
	},
	{
		elementType: "all",
		featureType: "landscape",
		stylers: [{ color: "#f2f2f2" }],
	},
	{
		elementType: "all",
		featureType: "poi",
		stylers: [{ visibility: "off" }],
	},
	{
		elementType: "all",
		featureType: "road",
		stylers: [{ saturation: -100 }, { lightness: 45 }],
	},
	{
		elementType: "all",
		featureType: "road.highway",
		stylers: [{ visibility: "simplified" }],
	},
	{
		elementType: "geometry.fill",
		featureType: "road.highway.controlled_access",
		stylers: [{ color: "#7fd8de" }],
	},
	{
		elementType: "geometry.stroke",
		featureType: "road.highway.controlled_access",
		stylers: [{ color: "#70989c" }],
	},
	{
		elementType: "labels.icon",
		featureType: "road.arterial",
		stylers: [{ visibility: "off" }],
	},
	{
		elementType: "all",
		featureType: "transit",
		stylers: [{ visibility: "off" }],
	},
	{
		elementType: "all",
		featureType: "water",
		stylers: [{ color: "#53d8f0" }, { visibility: "on" }],
	},
];
