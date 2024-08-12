import React from 'react';

// Utility function to get initials from group name
const getInitials = (name) => {
  const words = name.trim().split(' ');
  if (words.length > 1) {
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  }
  return words[0][0].toUpperCase();
};

const Header = ({ selectedGroup }) => {
  if (!selectedGroup) return null;

  return (
    <div className="flex items-center p-4 bg-[#001F8B] shadow-md text-white">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: selectedGroup.color }}
      >
        {getInitials(selectedGroup.name)}
      </div>
      <h1 className="ml-4 text-xl font-semibold">{selectedGroup.name}</h1>
    </div>
  );
};

export default Header;
