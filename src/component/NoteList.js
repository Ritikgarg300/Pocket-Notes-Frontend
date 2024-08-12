import { useEffect, useRef ,useState} from 'react';

import Note from "./Note";
import { IoSendSharp } from "react-icons/io5";



const NoteList = ({ notes, onAddNote }) => {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notes]);
  
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote("");
    }
  };

  return (
    <div className="flex-grow relative">
      


<div className="h-[420px] p-4 overflow-y-auto scrollbar-hide">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
      <div ref={bottomRef} />
    </div>
      <div className="absolute flex mb-4 bg-[#001F8B] w-full p-4 bottom-0">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Here’s the sample text for sample work "
          className="flex-grow p-2 border rounded-md"
          rows="6"
        ></textarea>
        <button
          onClick={handleAddNote}
          className={`absolute right-6 bottom-4 ml-2 p-2 rounded-md text-[35px] ${
            newNote.trim()
              ? "text-[#001F8B]"
              : " text-gray-500 cursor-not-allowed"
          }`}
          disabled={!newNote.trim()}
        >
         <IoSendSharp />
        </button>
        
      </div>
    </div>
  );
};

export default NoteList;
