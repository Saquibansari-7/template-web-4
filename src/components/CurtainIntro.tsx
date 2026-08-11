import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useT } from '../context/LanguageContext';

const STRIPS_PER_PANEL = 22;

function buildStrips(container: HTMLDivElement): HTMLDivElement[] {
  const strips: HTMLDivElement[] = [];
  for (let i = 0; i < STRIPS_PER_PANEL; i++) {
    const el = document.createElement('div');
    el.className = 'crt-strip crt-sway';
    el.style.width = `${100 / STRIPS_PER_PANEL}%`;
    el.style.marginLeft = i === 0 ? '0' : '-1px';

    const jitter = (Math.random() - 0.5) * 14;
    const hi = 38 + jitter;
    el.style.background = `linear-gradient(100deg,
      var(--crt-dark) 0%,
      var(--crt-mid) ${hi - 22}%,
      var(--crt-light) ${hi}%,
      var(--crt-mid) ${hi + 22}%,
      var(--crt-dark) 100%)`;

    const r1 = `${-0.4 - Math.random() * 0.4}deg`;
    const r2 = `${-0.4 + Math.random() * 0.4}deg`;
    el.style.setProperty('--r1', r1);
    el.style.setProperty('--r2', r2);
    el.style.animationDuration = `${2.8 + Math.random() * 2.4}s`;
    el.style.animationDelay = `${-Math.random() * 5}s`;
    el.style.zIndex = `${Math.floor(20 - Math.abs(i - STRIPS_PER_PANEL / 2) * 0.5)}`;

    container.appendChild(el);
    strips.push(el);
  }

  return strips;
}

export default function CurtainIntro() {
  const [skip, setSkip] = useState(() => window.location.pathname === '/admin');
  const [done, setDone] = useState(false);
  const { t } = useT();

  useEffect(() => {
    if (skip) setDone(true);
  }, [skip]);

  if (skip) return null;
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;
    const leftStrips = buildStrips(leftRef.current);
    const rightStrips = buildStrips(rightRef.current);
    const stage = stageRef.current;
    const leftPanel = leftRef.current;
    const rightPanel = rightRef.current;

    const open = () => {
      if (openedRef.current) return;
      openedRef.current = true;
      stage?.querySelector('.crt-hint')?.classList.add('crt-hidden');
      stage?.querySelector('.crt-seal')?.classList.add('crt-seal-gone');

      // Signal the persistent music player to start
      window.dispatchEvent(new Event('curtain:play-music'));


      const vw = window.innerWidth;
      const STAGGER = 0.03;

      // Per-strip pleated wave (inner strips lead, radiating outward)
      const wave = (strips: HTMLDivElement[], dir: -1 | 1) => {
        strips.forEach((el, i) => {
          el.classList.remove('crt-sway');
          el.style.animation = 'none';
          const distFromCenter = dir === -1 ? strips.length - 1 - i : i;
          const delay = distFromCenter * STAGGER;
          const rotate = dir * (2 + Math.random() * 3);
          gsap.to(el, {
            x: dir * vw * 0.12,
            rotateZ: rotate,
            duration: 1.5 + Math.random() * 0.4,
            delay,
            ease: 'power3.inOut',
            onComplete: () => { gsap.to(el, { rotateZ: 0, x: 0, duration: 1.0, ease: 'elastic.out(1, 0.4)' }); },
          });
        });
      };

      // Whole-panel slide — guarantees BOTH halves open
      gsap.to(leftPanel, { xPercent: -105, duration: 2.1, ease: 'power3.inOut', delay: 0.1 });
      gsap.to(rightPanel, { xPercent: 105, duration: 2.1, ease: 'power3.inOut', delay: 0.1 });

      wave(leftStrips, -1);
      wave(rightStrips, 1);

      gsap.to(stage, {
        autoAlpha: 0,
        duration: 0.7,
        delay: 2.2,
        ease: 'power2.inOut',
        onComplete: () => setDone(true),
      });
    };

    const onClick = () => open();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') open();
    };

    stage?.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    return () => {
      stage?.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (done) return null;

  return (
    <div className="crt-stage" ref={stageRef}>
      <div className="crt-glow" />
      <div className="crt-valance" />
      <div className="crt-curtain">
        <div className="crt-panel crt-left" ref={leftRef} />
        <div className="crt-panel crt-right" ref={rightRef} />
      </div>

      {/* Center seal — click to open the curtain */}
      <div className="crt-seal">
        <span className="crt-ring crt-ring-1" />
        <span className="crt-ring crt-ring-2" />
        <span className="crt-seal-glow" />
         <button type="button" className="crt-stamp" onClick={() => stageRef.current?.click()} aria-label={t("open")}>
           <img src="/c-stamp.png" alt={t("open")} />
         </button>
      </div>

      <style>{`
        .crt-stage {
          position: fixed;
          inset: 0;
          z-index: 200;
          width: 100vw;
          height: 100vh;
          cursor: pointer;
          background: radial-gradient(ellipse at 50% 38%, #fffdfa 0%, #fbe9e7 45%, #f6dcd6 100%);
          overflow: hidden;
          font-family: 'Fraunces', Georgia, serif;
          --crt-dark: #e7c9c4;
          --crt-mid: #f7d9d4;
          --crt-light: #fcf9f2;
          --crt-gold: #c1a167;
          --crt-red: #d42111;
        }
        .crt-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 40%, rgba(193,161,103,.18) 0%, rgba(193,161,103,0) 60%);
          pointer-events: none; z-index: 1;
        }
        .crt-valance {
          position: absolute; left: 0; right: 0; top: 0; height: 54px;
          background:
            linear-gradient(180deg, #d42111 0%, #b31c0e 50%, #8e150c 100%),
            repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0px, rgba(0,0,0,.18) 6px, transparent 6px, transparent 14px);
          background-blend-mode: multiply;
          border-radius: 0 0 26px 26px;
          box-shadow: 0 4px 16px rgba(0,0,0,.35), inset 0 -4px 8px rgba(0,0,0,.4);
          z-index: 5;
        }
        .crt-valance::after {
          content: ''; position: absolute; bottom: -9px; left: 1%; right: 1%; height: 9px;
          background: linear-gradient(transparent, var(--crt-gold));
          border-radius: 0 0 12px 12px; opacity: 0.7;
          box-shadow: 0 3px 10px rgba(193,161,103,.5);
        }
        .crt-curtain {
          position: absolute; top: 0; bottom: 0; left: 0; right: 0;
          display: flex; z-index: 3;
        }
        .crt-panel {
          position: relative; height: 100%; width: 50%;
          display: flex; overflow: visible; will-change: transform;
        }
        .crt-panel.crt-left { justify-content: flex-end; }
        .crt-panel.crt-right { justify-content: flex-start; }
        .crt-strip {
          position: relative; height: 100%; flex: 0 0 auto;
          border-radius: 0 0 14px 14px;
          box-shadow: inset 3px 0 10px rgba(138,30,18,.35), inset -3px 0 10px rgba(138,30,18,.35), 2px 0 14px rgba(0,0,0,.18);
          transform-origin: top center; will-change: transform;
        }
        .crt-strip::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(90deg, transparent 12%, rgba(255,255,255,.55) 42%, transparent 68%),
            radial-gradient(circle at 10% 0%, rgba(255,255,255,.4), transparent 55%);
          border-radius: inherit; pointer-events: none; mix-blend-mode: screen;
        }
        .crt-sway { animation-name: crtIdleSway; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        @keyframes crtIdleSway {
          0%,100% { transform: rotateZ(var(--r1, -0.3deg)); }
          50% { transform: rotateZ(var(--r2, 0.3deg)); }
        }

        /* ---- Center seal ---- */
        .crt-seal {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: clamp(180px, 26vw, 320px); height: clamp(180px, 26vw, 320px);
          display: flex; align-items: center; justify-content: center;
          z-index: 10; cursor: pointer;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .crt-seal-gone { opacity: 0; transform: translate(-50%, -50%) scale(0.6); pointer-events: none; }
        .crt-stamp {
          position: relative; z-index: 3;
          width: 72%; height: 72%; border-radius: 50%; padding: 0; border: none;
          background: transparent; cursor: pointer;
          filter: drop-shadow(0 10px 28px rgba(138,30,18,.35));
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          animation: crtStampPulse 3s ease-in-out infinite;
        }
        .crt-stamp img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .crt-stamp:hover { transform: scale(1.07); }
        @keyframes crtStampPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .crt-seal-glow {
          position: absolute; inset: 6%; border-radius: 50%; z-index: 1;
          background: radial-gradient(circle, rgba(255,253,250,.9) 0%, rgba(247,217,212,.5) 55%, rgba(247,217,212,0) 75%);
          box-shadow: 0 0 60px 10px rgba(193,161,103,.35);
          animation: crtHalo 3.5s ease-in-out infinite;
        }
        @keyframes crtHalo {
          0%,100% { transform: scale(1); opacity: .9; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .crt-ring {
          position: absolute; border-radius: 50%; z-index: 2; pointer-events: none;
        }
        .crt-ring-1 {
          inset: 0;
          border: 2px dashed var(--crt-gold);
          opacity: .8;
          animation: crtSpin 18s linear infinite;
        }
        .crt-ring-2 {
          inset: 10%;
          border: 1.5px solid rgba(212,33,17,.35);
          box-shadow: 0 0 0 6px rgba(193,161,103,.18) inset;
          animation: crtSpin 12s linear infinite reverse;
        }
        @keyframes crtSpin { to { transform: rotate(360deg); } }
        .crt-seal-label {
          position: absolute; bottom: -34px; left: 50%; transform: translateX(-50%);
          white-space: nowrap;
          color: #b31c0e; font-size: 14px; letter-spacing: 5px; text-transform: lowercase; font-weight: 600;
          text-shadow: 0 1px 10px rgba(255,255,255,.7);
          pointer-events: none;
        }

        .crt-hint {
          position: fixed; bottom: 44px; left: 50%; transform: translateX(-50%);
          color: #b31c0e; font-size: 16px; letter-spacing: 4px; font-weight: 600;
          opacity: 0.7; text-shadow: 0 1px 10px rgba(255,255,255,.6);
          pointer-events: none; z-index: 10; transition: opacity 0.8s;
        }
        .crt-hint.crt-hidden { opacity: 0; }
      `}</style>
    </div>
  );
}
