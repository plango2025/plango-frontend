import { Slider } from "@chakra-ui/react";
import { useState } from "react";

interface CommonSliderProps {
  onValueChange: (value: number) => void;
}

const CommonSlider = ({ onValueChange }: CommonSliderProps) => {
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
      onValueChange={handleValueChange}
    >
      <div></div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range style={{ backgroundColor: "#15bdb1" }} />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  );
};

export default CommonSlider;
