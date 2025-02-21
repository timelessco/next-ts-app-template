"use client";

import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import { useCallback } from "react";
import { useMediaQuery } from "@react-hookz/web";

export default function GoogleMapComponent() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const center = isLargeScreen
    ? { lat: 12.991626, lng: 80.222091 }
    : { lat: 12.991479, lng: 80.219008 };

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setOptions({
      disableDefaultUI: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.fill",
          stylers: [{ color: "#7fd8de" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [{ color: "#70989c" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#53d8f0" }, { visibility: "on" }],
        },
      ],
    });

    new google.maps.Marker({
      position: { lat: 12.991479, lng: 80.219008 },
      map,
      title: "Timeless!",
      icon: "/icons/favicon.png",
    });

    map.setOptions({
      cameraControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_LEFT,
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          google.maps.MapTypeId.SATELLITE,
          google.maps.MapTypeId.TERRAIN,
          google.maps.MapTypeId.HYBRID,
        ],
      },
    });
  }, []);

  return (
    <section className="w-full h-[500px] lg:h-[1024px]">
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={16.75}
          onLoad={onLoad}
        ></GoogleMap>
      </LoadScriptNext>
    </section>
  );
}
