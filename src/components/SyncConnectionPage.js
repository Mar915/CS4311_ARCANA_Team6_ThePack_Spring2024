import React, { useState} from 'react';


function SyncConnectionPage({ navigateTo }) {
  const [ipAddress, setIpAddress] = useState('');

  const handleConnect = () => {
    // validate ip address entered
    // isValidIpAddress(ipAddress)
    if (true) {
      // Navigate to SyncMenuPage with IP address as a query parameter
      window.location.href = `sync-menu?ip=${ipAddress}`;
    } else {
      alert('Invalid IP address');
    }
  };

  /* const isValidIpAddress = (ip) => {
    // Perform IP address validation here
    // This is a simple example, you may need a more robust validation logic
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ip);
  }; */
  return (
    <div>
      <h1>Sync Projects</h1>
      <p>Enter an IP Address of your computer to use.</p>
      <p>Use 0.0.0.0 to refer to all IP Addresses on your Computer</p>
      <label>
        IP Address:
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)} />
      </label>
      <button className="sync-menu-button" onClick={() => navigateTo('syncMenuPage')}>Connect</button>
    </div>
  );
};

export default SyncConnectionPage;