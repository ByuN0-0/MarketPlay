// components/QRScan.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

// QRScan 컴포넌트
const QRScan: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오 요소를 참조하기 위한 ref
  const [result, setResult] = useState<string | null>(null); // QR 코드 스캔 결과

  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current!, (result) => {
      setResult(result); // QR 코드 결과를 상태에 저장
    });

    qrScanner.start(); // QR 스캐너 시작

    return () => {
      qrScanner.stop(); // 컴포넌트 언마운트 시 스캐너 중지
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>QR 코드 스캔</h1>
      <video ref={videoRef} style={{ width: '300px', height: 'auto' }} /> {/* 비디오 요소 */}
      <p>QR 코드 결과: {result}</p>
    </div>
  );
};

export default QRScan;
