"use client";

import React from 'react';

export default function ScrollPager(): React.ReactElement {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('scrollPagerCollapsed');
      if (saved === '1') setCollapsed(true);
    } catch {}
  }, []);

  const handlePage = (direction: 1 | -1) => {
    try {
      const delta = Math.round(window.innerHeight * 0.9) * direction;
      window.scrollBy({ top: delta, left: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleTop = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {}
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('scrollPagerCollapsed', next ? '1' : '0');
      } catch {}
      return next;
    });
  };

  const containerStyle: React.CSSProperties = mounted
    ? {
        paddingRight: `calc(env(safe-area-inset-right, 0px) + 16px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 16px)`,
      }
    : {};

  return (
    <div
      className="fixed bottom-0 right-0 z-[9999] pointer-events-none select-none print:hidden"
      style={containerStyle}
    >
      <div className="relative">
        {/* Collapser tab */}
        <button
          type="button"
          aria-label={collapsed ? 'Show scroll controls' : 'Hide scroll controls'}
          title={collapsed ? 'Show' : 'Hide'}
          onClick={toggleCollapsed}
          className="pointer-events-auto absolute -left-3 top-0 mt-2 w-6 h-10 rounded-l bg-amber-600 text-white shadow-md flex items-center justify-center opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? (
              // Chevron left (show)
              <polyline points="15 18 9 12 15 6" />
            ) : (
              // Chevron right (hide)
              <polyline points="9 18 15 12 9 6" />
            )}
          </svg>
        </button>

        {!collapsed && (
          <div className="pointer-events-auto flex flex-col gap-2 items-end">
            <button
              type="button"
              aria-label="Scroll to top"
              title="Top"
              onClick={handleTop}
              className="w-12 h-12 rounded-full bg-amber-600 text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition"
            >
              {/* Double up chevron */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 19 12 13 6 19"></polyline>
                <polyline points="18 11 12 5 6 11"></polyline>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Page up"
              title="Page up"
              onClick={() => handlePage(-1)}
              className="w-12 h-12 rounded-full bg-amber-600 text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition"
            >
              {/* Up chevron */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Page down"
              title="Page down"
              onClick={() => handlePage(1)}
              className="w-12 h-12 rounded-full bg-amber-600 text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition"
            >
              {/* Down chevron */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


