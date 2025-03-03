import React from "react";

export default function LogMessages({ logMessages }) {
  return (
    <div className="w-full max-w-2xl mt-8 p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">System Logs</h2>
      <div className="max-h-48 overflow-y-auto">
        {logMessages.map((msg, index) => (
          <div 
            key={index} 
            className="py-1 px-2 text-sm text-gray-600 border-b border-gray-100 last:border-0"
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
