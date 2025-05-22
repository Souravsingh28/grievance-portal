
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function SouravDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('messages').select('*').order('timestamp', { ascending: false });
      setComplaints(data);
    };
    fetch();
  }, []);

  return (
    <div className="complaint-container">
      <h3>Complaints Filed by Her Highness</h3>
      {complaints.map((item) => (
        <div key={item.id} className="complaint-entry">
          <strong>{new Date(item.timestamp).toLocaleString()}</strong><br />
          {item.message}
        </div>
      ))}
    </div>
  );
}

export default SouravDashboard;
