import { Slider } from "@chakra-ui/react";

const CommonSlider = () => {
  return (
    <Slider.Root width="400px" defaultValue={[40]} step={10}>
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
