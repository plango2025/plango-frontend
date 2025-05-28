import { ColorSwatch, HStack, Slider } from "@chakra-ui/react";
import styles from "./CommonSlider.module.scss"
import React, { useState } from "react";

interface CommonSliderProps {
  onValueChange: (value: number) => void;  // 부모로 슬라이더 값을 전달할 콜백 함수
}

const CommonSlider: React.FC<CommonSliderProps> = ({ onValueChange }) => {
  const [value, setValue] = useState<number>(50);  // 슬라이더의 값 상태 관리

  const handleSliderChange = (newValue: number[]) => {
    const newValueNumber = newValue[0];
    setValue(newValueNumber);  // 슬라이더 값 업데이트
    onValueChange(newValueNumber);  // 부모로 값 전달
  };

  return (
    <Slider.Root max = {200} width="400px" defaultValue={[value]} step={10} size={"lg"} colorPalette="teal">
      <HStack justify="space-between">
        <Slider.Label>Volume</Slider.Label>
        <div className={styles.valueTextLayout}>
        <Slider.ValueText />
        만원
        </div>
      </HStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range/>
        </Slider.Track>
        <Slider.Thumbs/>
      </Slider.Control>
    </Slider.Root>
  );
};

export default CommonSlider;
