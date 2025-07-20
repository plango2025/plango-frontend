import { Slider } from "@chakra-ui/react";
import React, { useState } from "react";

interface CommonSliderProps {
  onValueChange: (value: number) => void;
}

const CommonSlider: React.FC<CommonSliderProps> = ({ onValueChange }) => {
  const [value, setValue] = useState<number>(50);

  // ValueChangeDetails 타입 맞춤
  const handleValueChange = (details: { value: number[] }) => {
    const newValue = details.value[0]; // 배열의 첫 번째 값
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Slider.Root
      max={200}
      width="400px"
      value={[value]}
      step={10}
      size="lg"
      colorPalette="teal"
      onValueChange={handleValueChange}
    >
      <div>

      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  );
};

export default CommonSlider;
