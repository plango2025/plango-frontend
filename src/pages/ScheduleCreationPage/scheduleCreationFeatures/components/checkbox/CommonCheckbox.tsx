import React from "react";
import { CheckboxCard } from "@chakra-ui/react";
import styles from "./CommonCheckbox.module.scss";

interface CommonCheckboxProps {
  labels: string[]; // Still an array, but we'll assume labels.length is 1 for single-select scenarios
  large?: boolean;
  onChange?: (label: string, checked: boolean) => void;
  isChecked?: boolean; // External control for checked state
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  labels,
  large = false,
  onChange,
  isChecked = false, // Default to false if not provided
}) => {
  // We'll primarily use the `isChecked` prop for controlling the state
  // and manage `selectedValues` only if `isChecked` is not provided (i.e., for multi-select scenarios).
  // For the StepPage3 use case, `isChecked` will always be provided.

  // If you strictly want single selection from the outside, you can remove `selectedValues` state
  // and directly use `isChecked` prop.
  // However, keeping it makes the component more versatile if used elsewhere for multi-select.


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const label = labels[0]; // Assuming only one label per CommonCheckbox instance for single-select

    // We don't update internal state here if isChecked prop is provided,
    // as the parent (StepPage3) is responsible for controlling it.
    // If isChecked is NOT provided, then update internal state.
    if (onChange) {
      onChange(label, checked); // Notify parent of change
    }
  };

  const isActuallyChecked = isChecked; // Use the prop directly for rendering

  return (
    <div>
      {/* Assuming labels.length is always 1 for this specific single-select use case */}
      {labels.length > 0 && (
        <CheckboxCard.Root
          colorPalette="teal"
          className={`${styles.customCheckboxCard} 
                       ${large ? styles.large : ""} 
                       ${isActuallyChecked ? styles.selected : ""}`} // Use isActuallyChecked for styling
        >
          <CheckboxCard.HiddenInput
            checked={isActuallyChecked} // Controlled by the external prop
            onChange={handleCheckboxChange}
            // `readOnly` or `pointerEvents: 'none'` on the input for controlled behavior
            readOnly // Make input read-only, controlled by parent's `onChange`
          />
          <CheckboxCard.Control className={styles.customCheckboxControl}>
            <CheckboxCard.Label className={styles.customCheckboxLabel}>
              {labels[0]} {/* Display the first label */}
            </CheckboxCard.Label>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      )}
    </div>
  );
};

export default CommonCheckbox;
