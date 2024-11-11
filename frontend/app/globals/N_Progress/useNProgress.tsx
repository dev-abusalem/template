import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname } from 'next/navigation';

const useNProgress = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    // Simulate a delay for NProgress to be visible, if desired
    const timeoutId = setTimeout(handleRouteChangeComplete, 500);

    return () => {
      clearTimeout(timeoutId);
      NProgress.done();
    };
  }, [pathname]);
};

export default useNProgress;
