import { useState, useEffect } from 'react';
import { AppState } from '../types';

const generateDeviceId = () => {
  return 'device_' + Math.random().toString(36).substring(2, 12);
};

const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const getDefaultState = (): AppState => ({
  deviceId: generateDeviceId(),
  currentDate: getTodayString(),
  drawCount: 0,
  currentJoint: null,
  confirmed: false,
  studentName: '',
  extractedTime: null,
  examStartTime: null,
  examEndTime: null,
  currentPage: 'welcome'
});

export const useExamState = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('examState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.currentDate !== getTodayString()) {
           return {
             ...getDefaultState(),
             deviceId: parsed.deviceId || generateDeviceId()
           };
        }
        return { ...getDefaultState(), ...parsed };
      } catch (e) {
        return getDefaultState();
      }
    }
    return getDefaultState();
  });

  useEffect(() => {
    localStorage.setItem('examState', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState(s => ({ ...s, ...updates }));
  };

  return { state, updateState };
};
