const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// This simulates a File System structure
const fileSystem = {
  desktop: [
    {
      id: 'bio',
      type: 'file',
      title: 'About_Me.txt',
      icon: 'User',
      content: `Hello! I am a Computer Science Student. I don't just write code; I build systems. 
      
      Expertise: React, Node, Cloud Architecture. 
      Current Status: Open to work.`
    },
    {
      id: 'projects',
      type: 'folder',
      title: 'My_Projects',
      icon: 'Folder',
      children: [
        {
          id: 'proj1',
          title: 'Neural_Net_Visualizer',
          description: 'A React-based tool to visualize AI learning weights.',
          stack: ['Python', 'React', 'TensorFlow'],
          link: 'https://github.com/example/neural'
        },
        {
          id: 'proj2',
          title: 'Crypto_Dashboard',
          description: 'Real-time node.js websocket aggregator for crypto prices.',
          stack: ['Node', 'Socket.io', 'Redis'],
          link: 'https://github.com/example/crypto'
        }
      ]
    },
    {
      id: 'contact',
      type: 'executable',
      title: 'Email_Me.exe',
      icon: 'Mail',
      action: 'mailto:yourname@example.com'
    }
  ]
};

app.get('/api/boot', (req, res) => {
  // Simulate boot delay or system check
  res.json({ status: 'SYSTEM_READY', kernel: 'v1.0.4' });
});

app.get('/api/desktop', (req, res) => {
  res.json(fileSystem.desktop);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});