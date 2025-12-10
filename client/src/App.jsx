import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { Folder, FileText, Mail, User, Terminal, X } from 'lucide-react';
import './App.css';

// Icon Mapper
const IconMap = { Folder, File: FileText, Mail, User, Terminal };

const Window = ({ id, title, content, type, children, onClose, zIndex, onFocus }) => {
  return (
    <Draggable handle=".window-header" onMouseDown={onFocus}>
      <div className="window" style={{ zIndex, top: '20%', left: '20%' }}>
        <div className="window-header">
          <span>{title}</span>
          <button className="close-btn" onClick={() => onClose(id)}></button>
        </div>
        <div className="window-content">
          {type === 'folder' ? (
            <div className="folder-grid">
              {children && children.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '15px', border: '1px solid #30363d', padding: '10px' }}>
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <div style={{ fontSize: '0.8em', color: '#58a6ff' }}>[{proj.stack.join(', ')}]</div>
                  <a href={proj.link} target="_blank" style={{color: 'white', marginTop:'5px', display:'block'}}>Git Link_</a>
                </div>
              ))}
            </div>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
          )}
        </div>
      </div>
    </Draggable>
  );
};

function App() {
  const [items, setItems] = useState([]);
  const [windows, setWindows] = useState([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // 1. Boot Sequence
    setTimeout(() => setBooted(true), 2000); // Fake boot time

    // 2. Fetch Desktop Items
    axios.get('http://localhost:5000/api/desktop')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const openWindow = (item) => {
    if (item.type === 'executable') {
      window.location.href = item.action;
      return;
    }

    // Check if already open
    if (windows.find(w => w.id === item.id)) {
      focusWindow(item.id);
      return;
    }

    const newWindow = {
      ...item,
      zIndex: topZIndex + 1
    };
    
    setTopZIndex(prev => prev + 1);
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const focusWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: topZIndex + 1 } : w
    ));
    setTopZIndex(prev => prev + 1);
  };

  if (!booted) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black', color: '#58a6ff' }}>
        <p>&gt; INITIALIZING KERNEL..._</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="desktop">
        {items.map((item) => {
          const IconComponent = IconMap[item.icon] || FileText;
          return (
            <div key={item.id} className="icon-wrapper" onDoubleClick={() => openWindow(item)}>
              <IconComponent size={40} color="#58a6ff" />
              <div className="icon-text">{item.title}</div>
            </div>
          );
        })}
      </div>

      {windows.map((win) => (
        <Window 
          key={win.id} 
          {...win} 
          onClose={closeWindow} 
          onFocus={() => focusWindow(win.id)}
        />
      ))}

      <div className="taskbar">
        <button className="start-btn">START</button>
        <span style={{ marginLeft: '15px', fontSize: '0.8rem', opacity: 0.7 }}>
          {windows.length > 0 ? `${windows.length} Active Process(es)` : 'System Idle'}
        </span>
        <div style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default App;