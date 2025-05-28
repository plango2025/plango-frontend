import React, { useState } from "react";
import CommonSlider from "./CommonSlider";  // CommonSlider import

const ParentComponent = () => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderValueChange = (newValue: number) => {
    setSliderValue(newValue);  // 슬라이더 값을 업데이트
    console.log("Slider value in parent:", newValue);  // 부모 컴포넌트에서 값 확인
  };

  return (
    <div>
      <CommonSlider onValueChange={handleSliderValueChange} /> {/* 슬라이더 값 전달 */}
    </div>
  );
};

export default ParentComponent;
