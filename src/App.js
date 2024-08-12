import image1 from "./assets/image.png";
import React, { useState,useEffect } from 'react';
import Sidebar from './component/Sidebar';
import NoteList from './component/NoteList';
import Header from './component/Header';
import axios from 'axios';
const App = () => {
  const [groups, setGroups] = useState([

    
  ]);

  const [notes, setNotes] = useState({
    
  });

  const [selectedGroup, setSelectedGroup] = useState(0);
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get('http://localhost:5000/api/groups');
      setGroups(response.data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      const fetchNotes = async () => {
        const response = await axios.get(`http://localhost:5000/api/notes/${selectedGroup}`);
        setNotes(prevNotes => ({
          ...prevNotes,
          [selectedGroup]: response.data,
        }));
      };
      fetchNotes();
    }
  }, [selectedGroup]);
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
  
    // Update local state
    setGroups([...groups, updatedGroup]);
    setNotes(prevNotes => ({ ...prevNotes, [newGroupId]: [] }));
  
    // Sync with backend
    axios.post('http://localhost:5000/api/groups', updatedGroup)
      .then(response => {
        // Optionally handle success, e.g., update local state with the response data
        console.log('Group created:', response.data);
      })
      .catch(error => {
        console.error('Error creating group:', error);
      });
  };
  
  // const handleCreateGroup = (newGroup) => {
  //   const newGroupId = groups.length + 1;
  //   setGroups([...groups, { id: newGroupId, ...newGroup, selected: false }]);
  //   setNotes({ ...notes, [newGroupId]: [] });
  // };

  //    const handleCreateGroup = async (newGroup) => {
  //   const response = await axios.post('http://localhost:5000/api/groups', newGroup);
  //   setGroups([...groups, response.data]);
  //   setNotes(prevNotes => ({ ...prevNotes, [response.data._id]: [] }));
  // };

  // const handleAddNote1 = async (text) => {
  //   const newNote = { text, groupId: selectedGroup };
  //   const response = await axios.post('http://localhost:5000/api/notes', newNote);
  //   setNotes(prevNotes => ({
  //     ...prevNotes,
  //     [selectedGroup]: [...(prevNotes[selectedGroup] || []), response.data],
  //   }));
  // };

  // const handleAddNote = (text) => {
  //   const newNote = {
  //     id: Date.now(),
  //     text,
  //     date: new Date().toLocaleString(),
  //   };
  //   setNotes({
  //     ...notes,
  //     [selectedGroup]: [...notes[selectedGroup], newNote],
  //   });
  // };

  const handleAddNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };
  
    // Update local state
    setNotes(prevNotes => ({
      ...prevNotes,
      [selectedGroup]: [...(prevNotes[selectedGroup] || []), newNote],
    }));
  
    // Sync with backend
    axios.post('http://localhost:5000/api/notes', { text, groupId: selectedGroup })
      .then(response => {
        // Optionally handle success, e.g., update local state with the response data
        console.log('Note added:', response.data);
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };
  

  const selectedGroupObj = groups.find(group => group.id === selectedGroup);

  return (
    <div className="flex h-screen">
      <Sidebar
        groups={groups}
        onSelectGroup={handleSelectGroup}
        onCreateGroup={handleCreateGroup}
        
      />
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
            <img src={image1} alt="No Group Selected"   />
            <h2 className="font-roboto text-5xl font-bold leading-[58.59px] tracking-[0.02em] text-left">Pocket Notes</h2>
            <span className="font-roboto text-[22px] font-medium leading-[32px] tracking-[0.02em] text-center mx-[160px]  mt-4">Send and receive messages without keeping your phone online.</span>
            <span className="font-roboto text-[22px] font-medium leading-[32px] tracking-[0.02em] text-center mx-[160px]  mt-2">
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;




// import React, { useState, useEffect } from 'react';
// import Sidebar from './component/Sidebar';
// import NoteList from './component/NoteList';
// import Header from './component/Header';
// import axios from 'axios';

// const App = () => {
//   const [groups, setGroups] = useState([]);
//   const [notes, setNotes] = useState({});
//   const [selectedGroup, setSelectedGroup] = useState(0);

//   useEffect(() => {
//     const fetchGroups = async () => {
//       const response = await axios.get('http://localhost:5000/api/groups');
//       setGroups(response.data);
//     };
//     fetchGroups();
//   }, []);

//   useEffect(() => {
//     if (selectedGroup) {
//       const fetchNotes = async () => {
//         const response = await axios.get(`http://localhost:5000/api/notes/${selectedGroup}`);
//         setNotes(prevNotes => ({
//           ...prevNotes,
//           [selectedGroup]: response.data,
//         }));
//       };
//       fetchNotes();
//     }
//   }, [selectedGroup]);

//   const handleSelectGroup = async (groupId) => {
//     setGroups(groups.map((group) =>
//       group._id === groupId
//         ? { ...group, selected: true }
//         : { ...group, selected: false }
//     ));
//     setSelectedGroup(groupId);
//   };

//   const handleCreateGroup = async (newGroup) => {
//     const response = await axios.post('http://localhost:5000/api/groups', newGroup);
//     setGroups([...groups, response.data]);
//     setNotes(prevNotes => ({ ...prevNotes, [response.data._id]: [] }));
//   };

//   const handleAddNote = async (text) => {
//     const newNote = { text, groupId: selectedGroup };
//     const response = await axios.post('http://localhost:5000/api/notes', newNote);
//     setNotes(prevNotes => ({
//       ...prevNotes,
//       [selectedGroup]: [...(prevNotes[selectedGroup] || []), response.data],
//     }));
//   };

//   const selectedGroupObj = groups.find(group => group._id === selectedGroup);

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         groups={groups}
//         onSelectGroup={handleSelectGroup}
//         onCreateGroup={handleCreateGroup}
//       />
//       <div className="flex flex-col flex-grow bg-[#DAE5F5]">
//         {selectedGroupObj ? (
//           <>
//             <Header selectedGroup={selectedGroupObj} />
//             <NoteList
//               notes={notes[selectedGroup] || []}
//               onAddNote={handleAddNote}
//             />
//           </>
//         ) : (
//           <div className="flex flex-col justify-center items-center flex-grow">
//             <img src={image1} alt="No Group Selected" />
//             <h2 className="font-roboto text-5xl font-bold leading-[58.59px] tracking-[0.02em] text-left">Pocket Notes</h2>
//             <span className="font-roboto text-[22px] font-medium leading-[32px] tracking-[0.02em] text-center mx-[160px] mt-4">Send and receive messages without keeping your phone online.</span>
//             <span className="font-roboto text-[22px] font-medium leading-[32px] tracking-[0.02em] text-center mx-[160px] mt-2">
//               Use Pocket Notes on up to 4 linked devices and 1 mobile phone
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

