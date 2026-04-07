import React, { useEffect, useRef } from 'react';

const HalideLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      canvas.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;

      layersRef.current.forEach((layer, i) => {
        if (layer) {
          const depth = (i + 1) * 1.5;
          const moveX = x * depth;
          const moveY = y * depth;
          layer.style.transform = `translateZ(${(i + 1) * 20}px) translate(${moveX}px, ${moveY}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        .halide-root {
          --bg: #0a0a0a;
          --text: #e0e0e0;
          --text-dim: #666;
          --accent: #3b82f6;
          --border: #222;
          --grain-opacity: 0.04;
          
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'SF Mono', system-ui, -apple-system, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .halide-grain {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          z-index: 100;
          opacity: var(--grain-opacity);
          filter: url(#grain);
        }

        .halide-interface {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          display: grid;
          grid-template-rows: auto 1fr auto;
          padding: 2rem 2.5rem;
          pointer-events: none;
        }

        .halide-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .halide-logo {
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--text);
          font-weight: 500;
        }

        .halide-data {
          text-align: right;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          line-height: 1.8;
          font-family: 'SF Mono', 'Consolas', monospace;
        }

        .halide-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .halide-archive {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-dim);
          line-height: 1.8;
        }

        .halide-archive span {
          color: var(--text);
        }

        .halide-cta {
          pointer-events: all;
          padding: 0.9rem 2.5rem;
          background: var(--text);
          color: var(--bg);
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          font-weight: 600;
          clip-path: polygon(0% 0%, 95% 0%, 100% 30%, 100% 100%, 5% 100%, 0% 70%);
          transition: background 0.3s ease, transform 0.3s ease;
          font-family: inherit;
        }

        .halide-cta:hover {
          background: var(--accent);
          color: white;
          transform: scale(1.05);
        }

        .halide-viewport {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          perspective: 1000px;
          width: 75vw;
          max-width: 900px;
          aspect-ratio: 16 / 10;
        }

        .halide-canvas {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          animation: halide-entrance 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes halide-entrance {
          from {
            transform: rotateY(15deg) rotateX(10deg) scale(0.8);
            opacity: 0;
          }
          to {
            transform: rotateY(0deg) rotateX(0deg) scale(1);
            opacity: 1;
          }
        }

        .halide-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.15s ease-out;
          overflow: hidden;
          border-radius: 4px;
        }

        .halide-layer-base {
          background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
          transform: translateZ(0px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .halide-layer-img {
          transform: translateZ(20px);
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(255,255,255,0.03) 18px,
              rgba(255,255,255,0.03) 19px
            ),
            radial-gradient(ellipse at 30% 80%, #333 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, #2a2a2a 0%, transparent 60%),
            radial-gradient(ellipse at 50% 90%, #222 0%, transparent 40%),
            linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
        }

        .halide-layer-text {
          transform: translateZ(40px);
          display: flex;
          align-items: flex-end;
          padding: 2.5rem;
        }

        .halide-title {
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.85;
          color: white;
          text-transform: uppercase;
          mix-blend-mode: difference;
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }

        .halide-layer-overlay {
          transform: translateZ(60px);
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
        }

        .halide-layer-grid {
          transform: translateZ(80px);
          opacity: 0.05;
          background-image: 
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .halide-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent);
          opacity: 0.15;
          animation: halide-scan 6s linear infinite;
          transform: translateZ(90px);
        }

        @keyframes halide-scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .halide-corners {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          transform: translateZ(85px);
          pointer-events: none;
        }

        .halide-corners::before,
        .halide-corners::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--accent);
          border-style: solid;
          opacity: 0.4;
        }

        .halide-corners::before {
          top: 12px;
          left: 12px;
          border-width: 1px 0 0 1px;
        }

        .halide-corners::after {
          bottom: 12px;
          right: 12px;
          border-width: 0 1px 1px 0;
        }

        @media (max-width: 768px) {
          .halide-viewport {
            width: 90vw;
          }
          .halide-interface {
            padding: 1.5rem;
          }
          .halide-title {
            font-size: clamp(2rem, 10vw, 4rem);
          }
          .halide-layer-text {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="halide-root">
        {/* Film Grain SVG Filter */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <div className="halide-grain" />

        {/* Interface Overlay */}
        <div className="halide-interface">
          <div className="halide-header">
            <div className="halide-logo">LUXEDETAIL_PRO</div>
            <div className="halide-data">
              LOCATION: NEW BRITAIN, CT<br />
              DETAIL GRADE: ELITE
            </div>
          </div>

          <div />

          <div className="halide-footer">
            <div className="halide-archive">
              <span>[ ESTABLISHED 2018 ]</span><br />
              CERAMIC COATING &amp; PAINT CORRECTION SPECIALISTS
            </div>
            <button className="halide-cta">BOOK NOW</button>
          </div>
        </div>

        {/* 3D Viewport */}
        <div className="halide-viewport">
          <div className="halide-canvas" ref={canvasRef}>
            {/* Layer 0: Base Shadow */}
            <div
              className="halide-layer halide-layer-base"
              ref={(el) => { if (el) layersRef.current[0] = el; }}
            />

            {/* Layer 1: Topographical Image */}
            <div
              className="halide-layer halide-layer-img"
              ref={(el) => { if (el) layersRef.current[1] = el; }}
            />

            {/* Layer 2: Typography */}
            <div
              className="halide-layer halide-layer-text"
              ref={(el) => { if (el) layersRef.current[2] = el; }}
            >
              <div className="halide-title">
                PRISTINE<br />FINISH
              </div>
            </div>

            {/* Layer 3: Gradient Overlay */}
            <div
              className="halide-layer halide-layer-overlay"
              ref={(el) => { if (el) layersRef.current[3] = el; }}
            />

            {/* Layer 4: Grid Pattern */}
            <div
              className="halide-layer halide-layer-grid"
              ref={(el) => { if (el) layersRef.current[4] = el; }}
            />

            {/* Scanning Line */}
            <div className="halide-scanline" />

            {/* Corner Brackets */}
            <div className="halide-corners" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HalideLanding;
