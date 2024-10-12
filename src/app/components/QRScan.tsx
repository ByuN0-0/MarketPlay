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
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const beepSound = useRef<HTMLAudioElement | null>(null); // 비프음 소리 파일을 위한 ref
  useEffect(() => {
    beepSound.current = new Audio('/sound/beep.mp3');
    const qrScanner = new QrScanner(videoRef.current!, (scanResult) => {
      try {
        // JSON 파싱
        const parsedResult: QRResult = JSON.parse(scanResult); // 인터페이스 사용
        setResult(parsedResult); // QR 코드 결과를 상태에 저장
        beepSound.current?.play(); // 비프음 재생
        setError(null); // 에러 초기화
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        setError('QR 코드 스캔 실패. 다시 시도해 주세요.'); // 에러 메시지 저장
      }
    });

    qrScanner.start(); // QR 스캐너 시작

    return () => {
      qrScanner.stop(); // 컴포넌트 언마운트 시 스캐너 중지
    };
  }, []);

  return (
      <div>
        <div style={{textAlign: 'center', padding: '20px'}}>
          <div style={{fontSize: '60px'}}>도담 마트</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <video
                ref={videoRef}
                style={{
                  width: '400px',
                  height: '400px',
                  borderStyle: 'solid',
                  borderWidth: '3px',
                }}
            />
          </div>
        </div>

        {/* QR 코드 결과 출력 및 에러 메시지 */}
        <div style={{padding: '20px', textAlign: 'center'}}>
          {error ? <p style={{color: 'red'}}>{error}</p> : <p>QR 코드 결과: {result?.price}</p>}
        </div>

        {/* 이미지와 결과에 따른 렌더링 */}
        <div style={{textAlign: 'center'}}>
          {/* 가격에 따라 이미지를 렌더링 */}
          <hr/>
          {result && result.price === 500 && <Image src={Fivehundredwon} alt={'500won'} width={200}/>}
          {result && result.price === 1000 && <Image src={Onethousandwon} alt={'1000won'} width={400}/>}
          {result && result.price === 1500 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 2000 && (
              <div>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 2500 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 3000 && (
              <div>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 4000 && (
              <div>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 4500 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 5000 && <Image src={Fivethousandwon} alt={'5000won'} width={1000}/>}
          {result && result.price === 5500 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
              </div>
          )}
          {result && result.price === 6000 && (
              <div>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
              </div>
          )}
          {result && result.price === 6500 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
              </div>
          )}
          {result && result.price === 7000 && (
              <div>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 7500 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 8000 && (
              <div>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
          {result && result.price === 9000 && (
              <div>
                <Image src={Fivethousandwon} alt={'5000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
                <Image src={Onethousandwon} alt={'1000won'} width={400}/>
              </div>
          )}
        </div>
      </div>
  );
};

export default QRScan;

