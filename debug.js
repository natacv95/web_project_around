// Debug logging system
(function() {
  const logContainer = document.createElement('div');
  logContainer.id = 'debug-log';
  logContainer.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: rgba(0, 0, 0, 0.95);
    color: #0f0;
    font-family: monospace;
    font-size: 11px;
    overflow-y: auto;
    padding: 10px;
    border-top: 2px solid #0f0;
    z-index: 10000;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
  `;
  document.body.appendChild(logContainer);

  const toggle = document.createElement('button');
  toggle.id = 'debug-toggle';
  toggle.textContent = 'Debug ▼';
  toggle.style.cssText = `
    position: fixed;
    bottom: 210px;
    right: 10px;
    padding: 8px 12px;
    background: #0f0;
    color: #000;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    z-index: 10001;
    font-size: 12px;
    font-weight: bold;
  `;
  document.body.appendChild(toggle);

  let isVisible = true;
  toggle.addEventListener('click', () => {
    isVisible = !isVisible;
    logContainer.style.display = isVisible ? 'block' : 'none';
    toggle.textContent = isVisible ? 'Debug ▼' : 'Debug ▲';
  });

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  function addLog(msg, type = 'log') {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${msg}\n`;
    logContainer.textContent += entry;
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  console.log = function(...args) {
    addLog(args.join(' '), 'log');
    originalLog(...args);
  };

  console.error = function(...args) {
    addLog('[ERROR] ' + args.join(' '), 'error');
    originalError(...args);
  };

  console.warn = function(...args) {
    addLog('[WARN] ' + args.join(' '), 'warn');
    originalWarn(...args);
  };

  // Capture uncaught errors
  window.addEventListener('error', (event) => {
    addLog('[UNCAUGHT ERROR] ' + event.message + ' at ' + event.filename + ':' + event.lineno);
    originalError(event);
  });

  window.addEventListener('unhandledrejection', (event) => {
    addLog('[UNHANDLED REJECTION] ' + (event.reason ? event.reason.toString() : 'Unknown'));
    originalError(event);
  });

})();
