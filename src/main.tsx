import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { themeScript } from './lib/theme-script'

// Add theme script to head to avoid flash of wrong theme
const script = document.createElement('script');
script.innerHTML = themeScript();
document.head.appendChild(script);

createRoot(document.getElementById("root")!).render(<App />);
