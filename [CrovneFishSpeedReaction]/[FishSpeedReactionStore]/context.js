import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
export const StoreContext = createContext(undefined);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [crovneFishSpeedReactionUnlocked, setCrovneFishSpeedReactionUnlocked] =
    useState([]);

  const crovneFishSpeedReactionLoadWallpapers = async () => {
    try {
      const rawWallpapers = await AsyncStorage.getItem(
        'crovne_unlocked_wallpapers',
      );
      const unlockedWallpapers = rawWallpapers ? JSON.parse(rawWallpapers) : [];
      setCrovneFishSpeedReactionUnlocked(unlockedWallpapers);
    } catch (error) {
      console.error('Failed to load wallpapers:', error);
    }
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
