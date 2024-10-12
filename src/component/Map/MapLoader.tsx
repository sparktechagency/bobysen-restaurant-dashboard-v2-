import { useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

interface GoogleMapsLoaderProps {
  children: ReactNode;
}

const GoogleMapsLoader = ({ children }: GoogleMapsLoaderProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDhzY2k-tIrpnoBut75TTDJTuE1kURA_fU", // Replace with your actual key
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>; // Optionally show a loading state

  return <>{children}</>;
};

export default GoogleMapsLoader;
