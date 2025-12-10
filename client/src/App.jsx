import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { User, Folder, Mail } from 'lucide-react';
import './App.css';

// DATA
const APPS = [
  {
    id: 'bio',
    title: 'About_Me.txt',
    icon: User,
    type: 'text',
    content: `Hello! I am a Full Stack Developer.\n\nI build systems with React and Node.js.\n\nStatus: Online.`
  },
  {
    id: 'projects',
    title: 'My_Projects',
    icon: Folder,
    type: 'folder',
    content: [
      { id: 'p1', title: 'Portfolio OS', desc: 'React/Node Desktop Simulator', stack: 'React' },
      { id: 'p2', title: 'E-Commerce API', desc: 'Scalable backend with Redis', stack: 'Node.js' }
    ]
  },
  {
    id: 'contact',
    title: 'Contact.exe',
    icon: Mail,
    type: 'text',
    content: `Email: me@example.com\nGitHub: github.com/me`
  }
];

const Window = ({ app, onClose, isMinimized, zIndex, onFocus }) => {
  const Icon = app.icon;

  // 1. nodeRef is required for StrictMode in React 18+ to avoid warnings
  const nodeRef = React.useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      defaultPosition={{ x: 100, y: 50 }} // Safe coordinates
      onMouseDown={onFocus}
    >
      <div 
        ref={nodeRef} 
        className="window-draggable" 
        style={{ zIndex }}
      >
        {/* SEPARATE VISUAL LAYER to avoid transform conflicts */}
        <div className={`window-visual ${isMinimized ? 'minimized' : ''}`}>
          
          <div className="window-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={18} color="#58a6ff" />
              <span className="window-title">{app.title}</span>
            </div>
            <button className="close-btn" onClick={(e) => { e.stopPropagation(); onClose(app.id); }} />
          </div>

          <div className="window-body">
            {app.type === 'text' ? (
               <div style={{ whiteSpace: 'pre-wrap' }}>{app.content}</div>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                {app.content.map(p => (
                  <div key={p.id} style={{ background: '#222', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{p.title}</div>
                    <div style={{ color: '#888', fontSize: '0.9em' }}>{p.desc}</div>
                    <div style={{ color: '#58a6ff', fontSize: '0.8em', marginTop: '5px' }}>{p.stack}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </Draggable>
  );
};

export default function App() {
  const [windows, setWindows] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [zIndex, setZIndex] = useState(100);

  const handleDockClick = (app) => {
    const existing = windows.find(w => w.id === app.id);

    if (existing) {
      // If open & top & not minimized -> Minimize
      if (activeId === app.id && !existing.minimized) {
        setWindows(prev => prev.map(w => w.id === app.id ? { ...w, minimized: true } : w));
        setActiveId(null);
      } 
      // Otherwise -> Restore & Focus
      else {
        setWindows(prev => prev.map(w => w.id === app.id ? { ...w, minimized: false, zIndex: zIndex + 1 } : w));
        setZIndex(z => z + 1);
        setActiveId(app.id);
      }
    } else {
      // Open New
      setWindows(prev => [...prev, { ...app, minimized: false, zIndex: zIndex + 1 }]);
      setZIndex(z => z + 1);
      setActiveId(app.id);
    }
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="screen">
      
      {/* WINDOW LAYER */}
      {windows.map(win => (
        <Window 
          key={win.id} 
          app={win} 
          isMinimized={win.minimized}
          zIndex={win.zIndex}
          onClose={closeWindow}
          onFocus={() => {
            setWindows(prev => prev.map(w => w.id === win.id ? { ...w, zIndex: zIndex + 1 } : w));
            setZIndex(z => z + 1);
            setActiveId(win.id);
          }}
        />
      ))}

      {/* TASKBAR LAYER */}
      <div className="taskbar-container">
        <div className="dock">
          {APPS.map(app => {
            const isOpen = windows.find(w => w.id === app.id);
            return (
              <div 
                key={app.id} 
                className="dock-icon" 
                onClick={() => handleDockClick(app)}
              >
                <app.icon size={32} color={isOpen ? "#fff" : "#888"} />
                {isOpen && <div className="active-dot" />}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}