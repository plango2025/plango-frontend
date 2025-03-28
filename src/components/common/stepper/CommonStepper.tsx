import React from "react";
import styles from "./CommonStepper.module.scss";

function StepperView({
  steps,
  currentStep,
  onContinue,
  onBack,
}) {
  return (
    <div className={styles.layout1}>
      <div className={styles.stepper}>
        <div>
          {steps.map(({ label }, index) => (
            <div key={label} className={styles.stepperContainer}>
              <div
                className={`${styles.stepNumber} ${
                  index <= currentStep ? styles.active : ""
                }`}
              >
                {index + 1}
                {index < steps.length - 1 && (
                  <div
                    className={`${styles.stepLine} ${
                      index < currentStep ? styles.active : ""
                    }`}
                  ></div>
                )}
              </div>
              <div className={styles.stepLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.layout2}>
        <div className={styles.stepperContentLayout}>
          <div className={styles.stepperContent}>{steps[currentStep].content}</div>
        </div>

        <div className={styles.stepperControls}>
          <button onClick={onBack}>뒤로</button>
          <button onClick={onContinue}>계속</button>
        </div>
      </div>
    </div>
  );
}

export default StepperView;