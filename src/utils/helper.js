// src/utils/localStorageUtils.js

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const getUserId = () => {
  if (isBrowser) {
    return localStorage.getItem('userId');
  }
  return null;
};

export const setUserId = (userId) => {
  if (isBrowser) {
    localStorage.setItem('userId', userId);
  }
};

export const getSessionId = () => {
  if (isBrowser) {
    return localStorage.getItem('sessionId');
  }
  return null;
};

export const setSessionId = (sessionId) => {
  if (isBrowser) {
    localStorage.setItem('sessionId', sessionId);
  }
};

export const removeSessionId = () => {
  if (isBrowser) {
    localStorage.removeItem('sessionId');
  }
};
