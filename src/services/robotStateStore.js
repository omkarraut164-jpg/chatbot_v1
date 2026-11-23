import { useState, useEffect } from 'react';

// Lightweight, zero-dependency subscription store for 3D robot state
// Prevents root-level App.jsx re-renders when chat cognitive state changes

let currentState = 'IDLE';
const listeners = new Set();

export function setRobotState(newState) {
  if (newState === currentState) return;
  currentState = newState;
  listeners.forEach((listener) => listener(currentState));
}

export function getRobotState() {
  return currentState;
}

export function useRobotState(defaultState) {
  const [state, setState] = useState(defaultState || currentState);

  useEffect(() => {
    // Sync if state changed before listener mounted
    setState(currentState);

    const listener = (nextState) => {
      setState(nextState);
    };

    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return state;
}
