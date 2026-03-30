import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// --- Signature ---
const signatureStyle = 'color: #00ffcc; font-size: 14px; font-weight: bold; background: #222; padding: 10px; border-radius: 5px;';
console.log('%c🚀 Built by Kunal Mahore | https://github.com/Strange-101', signatureStyle);
if (typeof window !== 'undefined') {
  window.__KUNAL_SIGNATURE__ = atob('QnVpbHQgYW5kIGRlc2lnbmVkIGJ5IEt1bmFsIE1haG9yZSAoaHR0cHM6Ly9naXRodWIuY29tL1N0cmFuZ2UtMTAxKS4gUGxlYXNlIGRvIG5vdCBzdGVhbCB3aXRob3V0IGF0dHJpYnV0aW9uLg==');
}
// -----------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
