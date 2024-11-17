import { useEffect } from 'react';

import useMediaQuery from './useMediaQuerry';

const useLockScroll = (isLocked: boolean, screenWidth: string) => {
  const isMobile = useMediaQuery(`(max-width: ${screenWidth})`);

  useEffect(() => {
    if (isMobile && isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLocked, isMobile]);
};

export default useLockScroll;
