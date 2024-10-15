// components/QRScan.tsx
'use client';

import React, {useEffect, useRef, useState} from 'react';
import QrScanner from 'qr-scanner';
import Image from 'next/image';
import Fivehundredwon from '../../../public/image/500won.png';
import Onethousandwon from '../../../public/image/1000won.png';
import Fivethousandwon from '../../../public/image/5000won.png';
import Onehundredwon from '../../../public/image/100won.png';
import Tenwon from '../../../public/image/10won.png';

interface QRResult {
  price: number;
  product: string | null;
}

const QRScan: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오 요소를 참조하기 위한 ref
  const [result, setResult] = useState<QRResult | null>(null); // QR 코드 스캔 결과의 타입을 지정
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const beepSound = useRef<HTMLAudioElement | null>(null); // 비프음 소리 파일을 위한 ref
  const priceSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, (qrjson) => {
        try {
          const parsedResult: QRResult = JSON.parse(qrjson);
          setResult(parsedResult);
          // 이전 가격 소리가 재생 중이라면 중지
          if (priceSound.current) {
            priceSound.current.pause();
            priceSound.current.currentTime = 0; // 소리 초기화
          }
          if (result !== null && result.product !== null) {
            priceSound.current = new Audio(`/sound/${parsedResult.product}.m4a`);
          } else {
            priceSound.current = new Audio(`/sound/s${parsedResult.price}.m4a`);
          }
          beepSound.current?.play();
          priceSound.current?.play();
          setError(null);
        } catch (error) {
          console.error('QR 코드 스캔 실패:', error);
          setError('QR 코드 형식이 올바르지 않습니다.');
        }
      });

      beepSound.current = new Audio('/sound/beep.mp3');
      qrScanner.start().catch((error) => {
        console.error('스캐너 시작 실패:', error);
        setError('카메라 접근 권한이 필요합니다. 브라우저 설정에서 허용해주세요.');
      });

      return () => {
        qrScanner.stop();
      };
    } else {
      setError('비디오 요소를 찾을 수 없습니다.');
    }
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
          {result && result.price === 600 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
              </div>
          )}
          {result && result.price === 700 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
              </div>
          )}
          {result && result.price === 800 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
              </div>
          )}
          {result && result.price === 830 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Tenwon} alt={'10won'} width={160}/>
                <Image src={Tenwon} alt={'10won'} width={160}/>
                <Image src={Tenwon} alt={'10won'} width={160}/>
              </div>
          )}
          {result && result.price === 900 && (
              <div>
                <Image src={Fivehundredwon} alt={'500won'} width={200}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
                <Image src={Onehundredwon} alt={'100won'} width={180}/>
              </div>
          )}
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

