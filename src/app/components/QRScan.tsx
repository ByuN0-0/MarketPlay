// components/QRScan.tsx
'use client';

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'; // Named export로 가져오기

const QRScan: React.FC = () => {
  const [data, setData] = useState<string>('No result');

  const handleScan = (result: string | null) => {
    if (result) {
      setData(result);
    }
  };

  const handleError = (err: never) => {
    console.error(err);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>QR 코드 스캔</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '300px' }}
      />
      <p>QR 코드 데이터: {data}</p>
    </div>
  );
};

export default QRScan;

