import { useState, useEffect } from "react";

const useIntersectionObserver = (ref: any, options: any) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return intersecting;
};

export default useIntersectionObserver;

// USAGE
// const ref = useRef(null);
// const intersecting = useIntersectionObserver(ref, { threshold: 0.5 });
