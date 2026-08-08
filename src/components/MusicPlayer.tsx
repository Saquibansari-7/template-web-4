import { useEffect, useRef, useState } from 'react';

const PLAY_EVENT = 'curtain:play-music';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (window.location.pathname === '/admin') return null;

  useEffect(() => {
    const onStart = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.6;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    window.addEventListener(PLAY_EVENT, onStart);
    return () => window.removeEventListener(PLAY_EVENT, onStart);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`music-disk ${playing ? 'playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <span className="music-disk-label" />
        <span className="music-disk-icon">{playing ? '❚❚' : '▶'}</span>
      </button>
      <audio ref={audioRef} src="/wedding-music.mp3" loop preload="auto" />
    </>
  );
}
