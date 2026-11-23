// Lightweight adaptive device & GPU tier helper

export function getDeviceQuality() {
  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      dpr: [1, 1.5],
      shadowResolution: 256,
      enableShadows: true,
    };
  }

  const isTouchOrMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
  const isLowCPU = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const isLowMemory = typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 4;

  if (isTouchOrMobile && (isLowCPU || isLowMemory)) {
    return {
      tier: 'low',
      dpr: [0.75, 1],
      shadowResolution: 128,
      enableShadows: false,
    };
  }

  if (isTouchOrMobile || isLowCPU) {
    return {
      tier: 'medium',
      dpr: [0.9, 1.25],
      shadowResolution: 128,
      enableShadows: true,
    };
  }

  return {
    tier: 'high',
    dpr: [1, 1.5],
    shadowResolution: 256,
    enableShadows: true,
  };
}
