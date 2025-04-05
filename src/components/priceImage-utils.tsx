import Image from "next/image";
import Fivethousandwon from "../../../public/image/5000won.png";
import Onethousandwon from "../../../public/image/1000won.png";
import Fivehundredwon from "../../../public/image/500won.png";
import Onehundredwon from "../../../public/image/100won.png";
import Tenwon from "../../../public/image/10won.png";

const renderPriceImages = (price: number) => {
  const imageArray = [];
  const numOfFiveThousand = Math.floor(price / 5000);  // 5000원짜리 계산 추가
  const numOfThousand = Math.floor((price % 5000) / 1000);  // 1000원짜리 계산
  const numOfFiveHundred = Math.floor((price % 1000) / 500);  // 500원짜리 계산
  const numOfHundred = Math.floor((price % 500) / 100);  // 100원짜리 계산
  const numOfTen = Math.floor((price % 100) / 10);  // 10원짜리 계산

  // 5000원짜리 이미지 추가
  for (let i = 0; i < numOfFiveThousand; i++) {
    imageArray.push(<Image key={`fivethousand-${i}`} src={Fivethousandwon} alt="5000won" width={1000}/>);
  }

  // 1000원짜리 이미지 추가
  for (let i = 0; i < numOfThousand; i++) {
    imageArray.push(<Image key={`thousand-${i}`} src={Onethousandwon} alt="1000won" width={400}/>);
  }

  // 500원짜리 이미지 추가
  for (let i = 0; i < numOfFiveHundred; i++) {
    imageArray.push(<Image key={`fivehundred-${i}`} src={Fivehundredwon} alt="500won" width={200}/>);
  }

  // 100원짜리 이미지 추가
  for (let i = 0; i < numOfHundred; i++) {
    imageArray.push(<Image key={`hundred-${i}`} src={Onehundredwon} alt="100won" width={180}/>);
  }

  // 10원짜리 이미지 추가
  for (let i = 0; i < numOfTen; i++) {
    imageArray.push(<Image key={`ten-${i}`} src={Tenwon} alt="10won" width={160}/>);
  }

  return imageArray;
};

export default renderPriceImages;