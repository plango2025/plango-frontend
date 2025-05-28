import React, { useState } from "react";
import { CheckboxCard } from "@chakra-ui/react";
import styles from "./CommonCheckbox.module.scss";

interface CommonCheckboxProps {
  labels: string[];
  large?: boolean;
  onChange?: (label: string, checked: boolean) => void;
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({ labels, large = false, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<Set<number>>(new Set());

  const handleCheckboxChange = (index: number, checked: boolean) => {
   
    
    const newSelectedValues = new Set(selectedValues);
    checked ? newSelectedValues.add(index) : newSelectedValues.delete(index);
    setSelectedValues(newSelectedValues);

    if (onChange) {
      onChange(labels[index], checked); // ✅ 외부 콜백 호출
    }
  };

  return (
    <div>
      {labels.map((label, index) => (
        <CheckboxCard.Root
          key={index}
          colorPalette="teal"
          className={`${styles.customCheckboxCard} 
                      ${large ? styles.large : ""} 
                      ${selectedValues.has(index) ? styles.selected : ""}`}
        >
          <CheckboxCard.HiddenInput
            checked={selectedValues.has(index)}
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          />
          <CheckboxCard.Control className={styles.customCheckboxControl}>
            <CheckboxCard.Label className={styles.customCheckboxLabel}>
              {label}
            </CheckboxCard.Label>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      ))}
    </div>
  );
};

export default CommonCheckbox;
