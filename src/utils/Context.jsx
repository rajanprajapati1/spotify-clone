import React, { createContext, useContext, useState } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [songDetails ,setsongDetails] = useState(null);
  const handleSong = (value) => {
    console.log('Playing song with URI:', value?.hub?.actions[1]?.uri);
    setCurrentSong(value?.hub?.actions[1]?.uri);
    setsongDetails(value);
  };

  return (
    <SongContext.Provider value={{ handleSong, currentSong,songDetails }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  return useContext(SongContext);
};
