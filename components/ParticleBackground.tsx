
import React, { useEffect } from 'react';

// Since we are loading from CDN, tsParticles will be on the window object.
declare global {
  interface Window {
    tsParticles: any;
  }
}

const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#a855f7',
      },
      links: {
        color: '#ec4899',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
};


const ParticleBackground: React.FC = () => {
  useEffect(() => {
    let container: any;

    if (window.tsParticles) {
      window.tsParticles.load({ id: 'tsparticles', options: particlesOptions }).then((c: any) => {
          container = c;
      });
    }

    return () => {
      if (container) {
        container.destroy();
      }
    };
  }, []);

  return <div id="tsparticles" className="absolute top-0 left-0 w-full h-full -z-20" />;
};

export default ParticleBackground;
