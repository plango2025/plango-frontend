import React from "react";
import { Button, ButtonGroup, Stack, Steps } from "@chakra-ui/react";
import stepPageChanger, { getSteps } from "./StepperPresenter";
import styles from "./Stepper.module.scss";

const CommonStepperPresenter = () => {
  const steps = getSteps();

  return (
    <Steps.Root
      orientation="vertical"
      height="400px"
      defaultStep={1}
      count={steps.length}
    >
      <div className={styles.layout1}>
        <Steps.List className={styles.stepperProgress}>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.progressTitle}>
              <div className={styles.indicatorLayout}>
                <Steps.Indicator className={styles.indicator} />
              </div>

              <div className={styles.progressTitles}>
                <Steps.Title className={styles.progressTitle}>
                  {step.progressTitle}
                </Steps.Title>
                <div className={styles.progeressSubTitle}>
                  {step.progressSubTitle}
                </div>
              </div>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
      </div>

      <Stack className={styles.layout2}>
        {steps.map((step, index) => (
          <Steps.Content
            key={index}
            index={index}
            className={styles.stepContent}
          >
            <div className={styles.stepperContent}>
              <div className={styles.titleBox}>
                <div className={styles.stepTitle}>{step.title}</div>

                <div className={styles.stepSubTitle}>{step.subTitle}</div>
              </div>

              <div className={styles.contentLayout}>
                {stepPageChanger(step.content)}
              </div>
            </div>
          </Steps.Content>
        ))}
        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

        <ButtonGroup size="lg" variant="outline" className={styles.buttonGroup}>
          <Steps.PrevTrigger asChild>
            <Button>Prev</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button>Next</Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Stack>




    </Steps.Root>
  );
};

export default CommonStepperPresenter;
