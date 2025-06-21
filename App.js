import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Use Render backend URL after deploy

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('load-text', (data) => setText(data));
    socket.on('receive-text', (data) => setText(data));

    return () => {
      socket.off('load-text');
      socket.off('receive-text');
    };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('text-change', newText);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Collaborative Editor</h2>
      <textarea
        style={{ width: '100%', height: '300px' }}
        value={text}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default App;
