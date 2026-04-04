import { useEffect } from 'react';

export const useParallax = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5);
      const yPercent = (clientY / innerHeight - 0.5);
      
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach(layer => {
        let speed = 20;
        if (layer.classList.contains('layer-main')) speed = 15;
        if (layer.classList.contains('layer-goal')) speed = 40;
        if (layer.classList.contains('layer-streak')) speed = 35;
        if (layer.classList.contains('layer-blob-1')) speed = 25;
        if (layer.classList.contains('layer-blob-2')) speed = 30;
        
        const x = xPercent * speed;
        const y = yPercent * speed;
        layer.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
};

export const useScrollParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export const useFadeUp = () => {
  useEffect(() => {
    // Wait for DOM to be fully ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.fade-up');
      elements.forEach(el => observer.observe(el));

      // Cleanup function
      return () => observer.disconnect();
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);
};
