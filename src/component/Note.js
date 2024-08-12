import React from 'react';

const Note = ({ note }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <p className="text-gray-800">{note.text}</p>
      <div className="text-sm text-gray-500 mt-2">{note.date}</div>
    </div>
  );
};

export default Note;
