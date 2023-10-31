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
  const [robotProfiles, setRobotProfiles] = useState({});
  const [index2IdMapping, setIndex2IdMapping] = useState({}); // { index: id }

  async function fetchRobotProfiles() {
    const profiles = await getRobotProfiles();
    setRobotProfiles(profiles);

    const mapping = {};
    Object.entries(profiles).forEach(([index, profile]) => {
      mapping[index] = profile.id;
    });
    setIndex2IdMapping(mapping);
  }

  // Load all robot profiles initially
  useEffect(() => {
    fetchRobotProfiles();
  }, []);

  // CRUD operations
  const addRobotProfile = useCallback(async (profile, profileId) => {
    await createRobotProfile(profile, profileId);
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
        index2IdMapping,
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
