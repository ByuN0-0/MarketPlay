// components/QRScan.tsx
'use client';

import React, {useEffect, useRef, useState} from 'react';
import QrScanner from 'qr-scanner';
import Image from 'next/image';
import Fivehundredwon from '../../../public/image/500won.png';
import Onethousandwon from '../../../public/image/1000won.png';
import Fivethousandwon from '../../../public/image/5000won.png';

interface QRResult {
  price: number;
}

const QRScan: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오 요소를 참조하기 위한 ref
  const [result, setResult] = useState<QRResult | null>(null); // QR 코드 스캔 결과의 타입을 지정

  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current!, (result) => {
      try {
        // JSON 파싱
        const parsedResult: QRResult = JSON.parse(result); // 인터페이스 사용
        setResult(parsedResult); // QR 코드 결과를 상태에 저장
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    });

    qrScanner.start(); // QR 스캐너 시작

    return () => {
      qrScanner.stop(); // 컴포넌트 언마운트 시 스캐너 중지
    };
  }, []);

  return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        <h1>QR 코드 스캔</h1>
        <video ref={videoRef} style={{width: '200px', height: '200px'}}/>
        {/* 비디오 요소 */}
        <p>QR 코드 결과: {result?.price}</p>
        {/* 가격에 따라 이미지를 렌더링 */}
        <div>여기는 예시임
          <Image src={Fivehundredwon} alt={'500won'}/>
          <Image src={Onethousandwon} alt={'1000won'}/>
          <Image src={Fivethousandwon} alt={'5000won'}/>
          여기까지 예시 아래가 qr찍은 결과
        </div>
        {result && result.price === 500 && (
            <Image src={Fivehundredwon} alt={'500won'}/>
        )}
        {result && result.price === 1000 && (
            <div>
              <Image src={Onethousandwon} alt={'1000won'}/>
            </div>
        )}
        {result && result.price === 5000 && (
            <Image src={Fivethousandwon} alt={'5000won'}/>
        )}
      </div>
  );
};

export default QRScan;
