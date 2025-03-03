'use client';
import { useState, useEffect, useRef } from "react";
import { Neurosity } from "@neurosity/sdk";

export default function useNeurosity(setLogMessages) {
  const [neurosity, setNeurosity] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState({
    state: "Initializing",
    sleepMode: false,
    charging: false,
    battery: 0,
    lastHeartbeat: "Never",
    ssid: "Not connected",
  });
  const [signalQuality, setSignalQuality] = useState(0);

  const initNeurosity = async () => {
    try {
      // Fetch credentials from backend
      const response = await fetch('http://localhost:8000/api/credentials');
      if (!response.ok) {
        throw new Error('Failed to fetch credentials');
      }
      const { deviceId, email, password } = await response.json();
      
      console.log("Initializing with device ID:", deviceId); // Debug log
      
      const neurosity = new Neurosity({
        deviceId,
      });

      await neurosity.login({
        email,
        password,
      });
      
      console.log("Successfully logged in to Neurosity");
      setLogMessages(prev => [...prev, "Successfully logged in to Neurosity"]);
      
      return neurosity;
    } catch (error) {
      console.error("Error initializing:", error);
      setLogMessages(prev => [...prev, `Error initializing: ${error.message}`]);
      return null;
    }
  };

  useEffect(() => {
    initNeurosity().then(instance => {
      if (instance) {
        setNeurosity(instance);
        // Start monitoring status after successful initialization
        instance.status().subscribe(status => {
          setDeviceStatus(status);
          setLogMessages(prev => [...prev, "Status updated"]);
        });
      }
    });

    return () => {
      if (neurosity) {
        neurosity.disconnect();
      }
    };
  }, []);

  return { neurosity, deviceStatus, signalQuality };
}