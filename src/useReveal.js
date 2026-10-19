import { useEffect, useRef } from 'react';
import './reveal.css';

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(i => i.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(i => io.observe(i));
    return () => io.disconnect();
  }, []);

  return ref;
}