import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
export const StoreContext = createContext(undefined);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [crovneFishSpeedReactionUnlocked, setCrovneFishSpeedReactionUnlocked] =
    useState([]);

  const crovneFishSpeedReactionLoadWallpapers = async () => {
    const crovneFishSpeedReactionRaw = await AsyncStorage.getItem(
      'crovne_unlocked_wallpapers',
    );

    setCrovneFishSpeedReactionUnlocked(
      crovneFishSpeedReactionRaw ? JSON.parse(crovneFishSpeedReactionRaw) : [],
    );
  };

  const contextValue = {
    crovneFishSpeedReactionUnlocked,
    crovneFishSpeedReactionLoadWallpapers,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
