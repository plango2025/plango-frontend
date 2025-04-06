import React, { useState } from "react";
import { CheckboxCard } from "@chakra-ui/react";
import styles from "./CommonCheckbox.module.scss";

interface CommonCheckboxProps {
  labels: string[]; // labels prop 추가
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({ labels }) => {
  const [selectedValues, setSelectedValues] = useState<Set<number>>(new Set());

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newSelectedValues = new Set(selectedValues);
    if (checked) {
      newSelectedValues.add(index);
    } else {
      newSelectedValues.delete(index);
    }
    setSelectedValues(newSelectedValues);
  };

  return (
    <div>
      {labels.map((label, index) => (
        <CheckboxCard.Root
          key={index}
          maxW="240px"
          colorPalette="teal"
          className={`${styles.customCheckboxCard} ${
            selectedValues.has(index) ? styles.selected : "" // 조건부 클래스 적용
          }`}
        >
          <CheckboxCard.HiddenInput
            checked={selectedValues.has(index)}
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          />
          <CheckboxCard.Control
            className={`${styles.customCheckboxControl} ${
              selectedValues.has(index) ? styles.selected : "" // Control에도 적용 가능 (선택 사항)
            }`}
          >
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
