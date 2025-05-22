
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function SwapnaDashboard() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState([]);

  const submitComplaint = async () => {
    if (!message.trim()) return;
    await supabase.from('messages').insert([{ sender: 'swapna', message }]);
    setSubmitted(true);
    setMessage('');
    fetchComplaints();
  };

  const fetchComplaints = async () => {
    const { data } = await supabase.from('messages').select('*').eq('sender', 'swapna').order('timestamp', { ascending: false });
    setHistory(data);
  };

  useEffect(() => { fetchComplaints(); }, []);

  return (
    <div className="complaint-container">
      <h3>File a Royal Complaint</h3>
      {!submitted ? (
        <>
          <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's troubling you, Your Highness?"></textarea>
          <button onClick={submitComplaint}>Send to the Court</button>
        </>
      ) : (
        <div className="thank-you">
          👑 Thank you <strong>MAHARANI JI</strong> for filing the complaint.<br/>
          Your issue will be looked after immediately by your humble servant.
        </div>
      )}

      <div className="complaint-history">
        <h3>📜 Previous Complaints</h3>
        {history.map((item) => (
          <div key={item.id} className="complaint-entry">
            <strong>{new Date(item.timestamp).toLocaleString()}</strong><br />
            {item.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SwapnaDashboard;
