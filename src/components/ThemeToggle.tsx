import {useEffect, useState} from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={toggle}
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        color: 'var(--color-text)',
        cursor: 'pointer',
        fontSize: '1.25rem',
        padding: '0.5rem',
      }}
      type="button">
      {theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
    </button>
  );
}
