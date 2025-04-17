// This script is used to set the initial theme before rendering to avoid flashing
export function themeScript() {
  const code = `
    (function() {
      try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
          document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light' || (savedTheme === 'system' && !prefersDark)) {
          document.documentElement.classList.remove('dark');
        } else {
          // Default to system preference if no theme is set
          prefersDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error('Error accessing localStorage', e);
      }
    })();
  `;

  return code;
}

export default themeScript; 