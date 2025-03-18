'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TitleUpdater() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let frames = ['◐', '◓', '◑', '◒'];
    let i = 0;
    let interval: NodeJS.Timeout | null = null;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a'); // Kiểm tra nếu element là thẻ <a>
      if (anchor && anchor.href) {
        const nextUrl = new URL(anchor.href).pathname;

        if (nextUrl === pathname) return; // Nếu trang không đổi, không chạy loading

        setIsLoading(true);
        interval = setInterval(() => {
          document.title = `Loading ${frames[i]}`;
          i = (i + 1) % frames.length;
        }, 200);
      }
    };

    document.addEventListener('click', handleClick);

    const handleLoad = () => {
      if (interval) clearInterval(interval);
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);
    if(pathname.includes('catalog')){
      document.title = 'Catalog'
    }else if(pathname.includes('product')){
      document.title = "Product"
    }else{
      document.title = "Home"
    }
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('load', handleLoad);
      if (interval) clearInterval(interval);
    };
  }, [pathname]);

  return null;
}
