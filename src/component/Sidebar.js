import { useEffect, useRef, useState } from 'react';
import CreateGroupModal from './CreateGroupModal';

const getInitials = (name) => {
  const words = name.trim().split(' ');
  if (words.length > 1) {
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  }
  return words[0][0].toUpperCase();
};

const Sidebar = ({ groups, onSelectGroup, onCreateGroup }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [groups]);

  return (
    <div className="bg-gray-100 h-full w-full md:w-[434px] p-4">
      <h1 className="text-2xl font-bold text-center p-4">Pocket Notes</h1>

      <div className="h-[590px] overflow-y-auto scrollbar-hide">
        <ul>
          {groups.map((group, index) => (
            <li
              key={index}
              onClick={() => onSelectGroup(group.id)}
              className={`p-2 mb-2 flex items-center cursor-pointer rounded-md  ${
                group.selected ? 'bg-gray-300' : ''
              }`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: group.color }}
              >
                {getInitials(group.name)}
              </div>
              <span className="ml-4 text-lg font-semibold">{group.name}</span>
            </li>
          ))}
        </ul>
        <div ref={bottomRef} />
      </div>

      <button
        onClick={handleOpenModal}
        className="absolute w-[60px] h-[60px] md:w-[93px] md:h-[93px] right-6 bottom-6 bg-[#16008B] rounded-full flex items-center justify-center md:left-[280px]"
      >
        <span className="text-white text-[40px] md:text-[80px] mb-1 md:mb-3">+</span>
      </button>

      {showModal && (
        <CreateGroupModal
          onClose={handleCloseModal}
          onCreateGroup={onCreateGroup}
        />
      )}
    </div>
  );
};

export default Sidebar;
