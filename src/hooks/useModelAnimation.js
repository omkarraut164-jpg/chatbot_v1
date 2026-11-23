import { useState } from 'react';

export function useModelAnimation() {
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  return {
    currentAnimation,
    setCurrentAnimation,
  };
}
