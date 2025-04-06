// components/QRScan.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import Image from "next/image";

import renderPriceImages from "./priceImage-utils";
import hypernymUtils from "../utils/hypernym-utils";
import wordUtils from "../utils/word-utils";

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
          console.error("QR 코드 스캔 실패:", error);
          setError("QR 코드 형식이 올바르지 않습니다.");
        }
      });

      beepSound.current = new Audio("/sound/beep.mp3");
      qrScanner.start().catch((error) => {
        console.error("스캐너 시작 실패:", error);
        setError("카메라 접근 권한이 필요합니다. 브라우저 설정에서 허용해주세요.");
      });

      return () => {
        qrScanner.stop();
      };
    } else {
      setError("비디오 요소를 찾을 수 없습니다.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            도담 마트
          </h1>
          <p className="text-gray-600 text-xl">QR 코드를 스캔하여 상품 정보를 확인하세요</p>
        </div>

        {/* 스캐너 영역 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <video
              ref={videoRef}
              className="w-96 h-96 rounded-xl shadow-lg border-4 border-purple-400"
            />
            <div className="absolute inset-0 border-2 border-white rounded-xl opacity-50 pointer-events-none"></div>
          </div>
        </div>

        {/* 결과 및 에러 메시지 */}
        <div className="py-6 px-8 bg-white rounded-xl shadow-md mb-8 min-h-24 text-center">
          {error ? (
            <p className="text-red-500 text-lg">{error}</p>
          ) : result ? (
            result.hypernym ? (
              <div className="animate-fadeIn">
                <p className="text-4xl font-bold text-purple-700 mb-2">
                  {hypernymUtils(result.hypernym)}
                </p>
                <p className="text-3xl text-blue-600">{wordUtils(result.product)}</p>
              </div>
            ) : result.product ? (
              <div className="animate-fadeIn">
                <p className="text-3xl font-medium">
                  <span className="text-blue-600">{result.product}</span> -
                  <span className="text-purple-700 font-bold"> {result.price}원</span>
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold text-purple-700 animate-fadeIn">{result.price}원</p>
            )
          ) : (
            <p className="text-gray-500 italic">QR 코드를 스캔해주세요</p>
          )}
        </div>

        {/* 상품 이미지 */}
        {result?.product && result?.hypernym && (
          <div className="bg-white p-6 rounded-xl shadow-md text-center mb-8 animate-fadeIn">
            <Image
              src={`/image/${result.product}.png`}
              alt={result.product}
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* 가격 이미지 */}
        {result && result?.price && (
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn">
            {renderPriceImages(result.price)}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QRScan;
