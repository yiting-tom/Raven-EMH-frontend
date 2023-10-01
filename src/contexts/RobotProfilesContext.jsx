import React, { createContext, useState, useEffect, useCallback } from 'react';

import {
  createRobotProfile,
  getRobotProfiles,
  getSpecificRobotProfile,
  updateRobotProfile,
  deleteRobotProfile,
} from '../api/robotProfile';

export const RobotProfilesContext = createContext();

export const RobotProfilesProvider = ({ children }) => {
  const [robotProfiles, setRobotProfiles] = useState([]);
  async function fetchRobotProfiles() {
    const profiles = await getRobotProfiles();
    setRobotProfiles(profiles);
  }

  // Load all robot profiles initially
  useEffect(() => {
    fetchRobotProfiles();
  }, []);

  // CRUD operations
  const addRobotProfile = useCallback(async (profile) => {
    await createRobotProfile(profile);
    // Refresh profiles after adding
    const profiles = await getRobotProfiles();
    setRobotProfiles(profiles);
  }, []);

  const getProfile = useCallback(async (id) => {
    return await getSpecificRobotProfile(id);
  }, []);

  const modifyRobotProfile = useCallback(async (id, content) => {
    await updateRobotProfile(id, content);
    // Refresh profiles after updating
    const profiles = await getRobotProfiles();
    setRobotProfiles(profiles);
  }, []);

  const removeRobotProfile = useCallback(async (id) => {
    await deleteRobotProfile(id);
    // Refresh profiles after deleting
    const profiles = await getRobotProfiles();
    setRobotProfiles(profiles);
  }, []);

  return (
    <RobotProfilesContext.Provider
      value={{
        robotProfiles,
        addRobotProfile,
        getProfile,
        modifyRobotProfile,
        removeRobotProfile,
        fetchRobotProfiles,
      }}
    >
      {children}
    </RobotProfilesContext.Provider>
  );
};
