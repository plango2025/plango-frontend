// CommonCheckbox.tsx
import { CheckboxCard, For, Stack } from "@chakra-ui/react";
import styles from "./CommonCheckbox.module.scss";

interface CommonCheckboxProps {
  labels: string[]; // labels prop 추가
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({ labels }) => {
  return (
    <div>
      {labels.map((label, index) => (
        <CheckboxCard.Root
          key={index}
          maxW="240px"
          colorPalette="teal"
          className={styles.customCheckboxCard}
        >
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control className={styles.customCheckboxControl}>
            <CheckboxCard.Label className={styles.customCheckboxLabel}>
              {label}
            </CheckboxCard.Label>
            <CheckboxCard.Indicator
              className={styles.customCheckboxIndicator}
            />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      ))}
    </div>
  );
};
export default CommonCheckbox;
