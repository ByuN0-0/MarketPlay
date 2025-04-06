import Image from "next/image";

const renderPriceImages = (price: number) => {
  const imageArray = [];
  const numOfFiveThousand = Math.floor(price / 5000); // 5000원짜리 계산 추가
  const numOfThousand = Math.floor((price % 5000) / 1000); // 1000원짜리 계산
  const numOfFiveHundred = Math.floor((price % 1000) / 500); // 500원짜리 계산
  const numOfHundred = Math.floor((price % 500) / 100); // 100원짜리 계산
  const numOfTen = Math.floor((price % 100) / 10); // 10원짜리 계산

  // 5000원짜리 이미지 추가
  for (let i = 0; i < numOfFiveThousand; i++) {
    imageArray.push(
      <div key={`fivethousand-${i}`} className="money-item">
        <Image
          src="/image/5000won.png"
          alt="5000won"
          width={180}
          height={80}
          className="rounded-lg shadow-md hover:scale-105 transition-transform"
        />
        <span className="money-label">₩5,000</span>
      </div>
    );
  }

  // 1000원짜리 이미지 추가
  for (let i = 0; i < numOfThousand; i++) {
    imageArray.push(
      <div key={`thousand-${i}`} className="money-item">
        <Image
          src="/image/1000won.png"
          alt="1000won"
          width={160}
          height={70}
          className="rounded-lg shadow-md hover:scale-105 transition-transform"
        />
        <span className="money-label">₩1,000</span>
      </div>
    );
  }

  // 500원짜리 이미지 추가
  for (let i = 0; i < numOfFiveHundred; i++) {
    imageArray.push(
      <div key={`fivehundred-${i}`} className="money-item">
        <Image
          src="/image/500won.png"
          alt="500won"
          width={120}
          height={120}
          className="rounded-full shadow-md hover:scale-105 transition-transform"
        />
        <span className="money-label">₩500</span>
      </div>
    );
  }

  // 100원짜리 이미지 추가
  for (let i = 0; i < numOfHundred; i++) {
    imageArray.push(
      <div key={`hundred-${i}`} className="money-item">
        <Image
          src="/image/100won.png"
          alt="100won"
          width={110}
          height={110}
          className="rounded-full shadow-md hover:scale-105 transition-transform"
        />
        <span className="money-label">₩100</span>
      </div>
    );
  }

  // 10원짜리 이미지 추가
  for (let i = 0; i < numOfTen; i++) {
    imageArray.push(
      <div key={`ten-${i}`} className="money-item">
        <Image
          src="/image/10won.png"
          alt="10won"
          width={100}
          height={100}
          className="rounded-full shadow-md hover:scale-105 transition-transform"
        />
        <span className="money-label">₩10</span>
      </div>
    );
  }

  return (
    <>
      {imageArray.length > 0 ? (
        <>
          <style jsx global>{`
            .money-item {
              position: relative;
              margin: 0.5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .money-label {
              margin-top: 0.25rem;
              font-size: 0.8rem;
              color: #666;
              font-weight: 500;
            }
          `}</style>
          {imageArray}
        </>
      ) : (
        <p className="text-gray-500 italic">금액이 없습니다</p>
      )}
    </>
  );
};

export default renderPriceImages;
