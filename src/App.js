import React, { useEffect, useState } from 'react';

const NetworkInfoComponent = () => {
  const [networkType, setNetworkType] = useState('not available');
  const [effectiveNetworkType, setEffectiveNetworkType] = useState('not available');
  const [downlinkMax, setDownlinkMax] = useState('not available');

  const getConnection = () => {
    return navigator.connection || navigator.mozConnection ||
      navigator.webkitConnection || navigator.msConnection;
  };

  const updateNetworkInfo = (info) => {
    setNetworkType(info.type);
    setEffectiveNetworkType(info.effectiveType);
    setDownlinkMax(info.downlinkMax);
  };

  useEffect(() => {
    const info = getConnection();

    if (info) {
      info.onchange = function (event) {
        updateNetworkInfo(event.target);
      };

      updateNetworkInfo(info);
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <p>Current theoretical network type is <b>{networkType}</b>.</p>
      <p>Current effective network type is <b>{effectiveNetworkType}</b>.</p>
      <p>Current max downlink speed is <b>{downlinkMax}</b>.</p>
    </div>
  );
};

export default NetworkInfoComponent;
