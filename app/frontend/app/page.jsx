"use client";
import { useState } from "react";
import useNeurosity from "../hooks/useNeurosity";
import useSession from "../hooks/useSession";
import DeviceStatus from "../components/DeviceStatus";
import LogMessages from "../components/LogMessages";
import ActionAssign from "../components/ActionAssign"; // ✅ Import new ActionAssign component

export default function Home() {
  const [logMessages, setLogMessages] = useState([]);
  const { neurosity, deviceStatus, signalQuality } = useNeurosity(setLogMessages);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* Device Status Box */}
      <DeviceStatus deviceStatus={deviceStatus} signalQuality={signalQuality} />

      {/* Action Assign (Replaces Recording Settings) */}
      <ActionAssign />

      {/* Log Messages */}
      <LogMessages logMessages={logMessages} />
    </div>
  );
}
