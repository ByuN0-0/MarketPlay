// components/QRScan.tsx
'use client';

import React, {useEffect, useRef, useState} from 'react';
import QrScanner from 'qr-scanner';
import Image from 'next/image';

import renderPriceImages from './priceImage-utils';
import hypernymUtils from '../utils/hypernym-utils';
import wordUtils from '../utils/word-utils';

interface QRResult {
  price: number;
  product: string | null;
  hypernym: string | null;
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

          const audioFile = parsedResult.product
              ? `/sound/${parsedResult.product}.m4a`
              : `/sound/s${parsedResult.price}.m4a`;

          priceSound.current = new Audio(audioFile);
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
        <div style={{padding: '40px', textAlign: 'center'}}>
          {error ? (
              <p style={{color: 'red'}}>{error}</p>
          ) : result ? (
              result.hypernym ? (
                  <p style={{fontSize: '50px', textAlign: 'center'}}>{hypernymUtils(result.hypernym)} - {wordUtils(result.product)}</p>
              ) : (
                  <p>{result.price}원, {result.product}</p>
              )
          ) : null}
        </div>

        {/* 이미지와 결과에 따른 렌더링 */}
        <div style={{textAlign: 'center'}}>
          {result?.product && <Image src={`/image/${result.product}.png`} alt={result.product} width={400}/>}
          {result && renderPriceImages(result.price)}
        </div>
      </div>
  );
};

export default QRScan;

