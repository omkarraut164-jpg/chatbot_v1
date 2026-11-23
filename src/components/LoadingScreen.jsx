export default function LoadingScreen({ progress = 0 }) {
  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      <div className="cyber-spinner"></div>
      <div className="loader-text">
        Initializing AI Core {progress > 0 ? `${Math.round(progress)}%` : '...'}
      </div>
    </div>
  );
}
