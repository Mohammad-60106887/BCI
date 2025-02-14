import { useState } from "react";

export default function ActionAssign() {
    const [target, setTarget] = useState("");
    const [action, setAction] = useState("");

    const handleAssign = async () => {
        const response = await fetch("/api/assign_action", {  // ✅ Calls Next.js API first
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ target, action }),
        });

        const data = await response.json();
        alert(data.message);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-700">Action Assigning</h2>

            <label className="block mt-4 text-lg">Target:</label>
            <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => setTarget(e.target.value)}
            >
                <option value="">Select Target</option>
                <option value="10Hz">Target 1 (10Hz)</option>
                <option value="12Hz">Target 2 (12Hz)</option>
                <option value="15Hz">Target 3 (15Hz)</option>
                <option value="20Hz">Target 4 (20Hz)</option>
            </select>

            <label className="block mt-4 text-lg">Action:</label>
            <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => setAction(e.target.value)}
            >
                <option value="">Select Action</option>
                <option value="Move Forward">Move Forward</option>
                <option value="Move Backward">Move Backward</option>
                <option value="Move Right">Move Right</option>
                <option value="Move Left">Move Left</option>
            </select>

            <button
                onClick={handleAssign}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
                Assign
            </button>
        </div>
    );
}
