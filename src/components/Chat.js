
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);
  const audio = useRef(new Audio('/notification.mp3'));
  const recipient = user === 'sourav' ? 'swapna' : 'sourav';

  useEffect(() => {
    fetchMessages();
    const sub = supabase.channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
        if (payload.new.sender !== user) audio.current.play();
      }).subscribe();
    return () => supabase.removeChannel(sub);
  }, [user]);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('timestamp');
    setMessages(data);
  };

  const sendMessage = async () => {
    let imageUrl = '';
    if (image) {
      const ext = image.name.split('.').pop();
      const path = `${uuidv4()}.${ext}`;
      await supabase.storage.from('grievance-images').upload(path, image);
      imageUrl = supabase.storage.from('grievance-images').getPublicUrl(path).data.publicUrl;
    }
    await supabase.from('messages').insert([{ sender: user, recipient, message: input, image_url: imageUrl }]);
    setInput('');
    setImage(null);
  };

  return (
    <div className="chat-container">
      <h3>Chat with {recipient}</h3>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`msg ${msg.sender === user ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
            {msg.image_url && <img src={msg.image_url} alt="grievance" />}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type grievance..." />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
