import image1 from "./assets/image.png";
import React, { useState, useEffect } from 'react';
import Sidebar from './component/Sidebar';
import NoteList from './component/NoteList';
import Header from './component/Header';
import axios from 'axios';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get('https://pocket-notes-backend-s8jz.onrender.com/api/groups');
      setGroups(response.data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      const fetchNotes = async () => {
        const response = await axios.get(`https://pocket-notes-backend-s8jz.onrender.com/api/notes/${selectedGroup}`);
        setNotes(prevNotes => ({
          ...prevNotes,
          [selectedGroup]: response.data,
        }));
      };
      fetchNotes();
    }
  }, [selectedGroup]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectGroup = (groupId) => {
    setGroups(groups.map((group) =>
      group.id === groupId
        ? { ...group, selected: true }
        : { ...group, selected: false }
    ));
    setSelectedGroup(groupId);
  };

  const handleCreateGroup = (newGroup) => {
    const newGroupId = groups.length + 1;
    const updatedGroup = { id: newGroupId, ...newGroup, selected: false };
    setGroups([...groups, updatedGroup]);
    setNotes(prevNotes => ({ ...prevNotes, [newGroupId]: [] }));
    axios.post('https://pocket-notes-backend-s8jz.onrender.com/api/groups', updatedGroup)
      .then(response => {
        console.log('Group created:', response.data);
      })
      .catch(error => {
        console.error('Error creating group:', error);
      });
  };

  const handleAddNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };
    setNotes(prevNotes => ({
      ...prevNotes,
      [selectedGroup]: [...(prevNotes[selectedGroup] || []), newNote],
    }));
    axios.post('https://pocket-notes-backend-s8jz.onrender.com/api/notes', { text, groupId: selectedGroup })
      .then(response => {
        console.log('Note added:', response.data);
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  const selectedGroupObj = groups.find(group => group.id === selectedGroup);

  return (
    <div className="flex h-screen">
      {(!isMobile || !selectedGroup) && (
        <Sidebar
          groups={groups}
          onSelectGroup={handleSelectGroup}
          onCreateGroup={handleCreateGroup}
        />
      )}
      {(!isMobile || selectedGroup) && (
        <div className="flex flex-col flex-grow bg-[#DAE5F5]">
          {selectedGroupObj ? (
            <>
              <Header selectedGroup={selectedGroupObj} />
              <NoteList
                notes={notes[selectedGroup]}
                onAddNote={handleAddNote}
              />
            </>
          ) : (
            <div className="flex flex-col justify-center items-center flex-grow ">
              <img src={image1} alt="No Group Selected" />
              <h2 className="font-roboto text-5xl font-bold leading-[58.59px] tracking-[0.02em] text-left">Pocket Notes</h2>
              <span className="font-roboto text-[22px] font-medium leading-[32px] tracking-[0.02em] text-center mx-[160px] mt-4">
                Send and receive messages without keeping your phone online.
              </span>
              <span className="font-roboto text-[22px] font-medium leading-[32px] tracking-[0.02em] text-center mx-[160px] mt-2">
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
