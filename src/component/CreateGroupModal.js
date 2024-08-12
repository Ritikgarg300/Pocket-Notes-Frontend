import React, { useState } from "react";

const colors = [
  "#0047FF",
  "#B38BFA",
  "#f19576",
  "#bbdefb",
  "#b2ebf2",
  "#b2dfdb",
];

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      onCreateGroup({ name: groupName, color: selectedColor });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-lg font-bold mb-4 text-center md:text-left">Create New Group</h2>
        
        <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-9 items-center">
          <h2 className="text-lg font-bold">Group Name</h2>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="border p-2 rounded-md w-full md:w-3/5"
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-5 items-center">
          <h2 className="text-lg font-bold">Choose Color</h2>
          <div className="flex space-x-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedColor === color ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded-md">
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
