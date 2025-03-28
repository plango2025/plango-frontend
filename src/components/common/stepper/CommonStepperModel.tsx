import { useState } from "react";

const CommonStepperModel = (steps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    steps,
    handleContinue,
    handleBack,
  };
};

export default CommonStepperModel;