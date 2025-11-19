import React, { ChangeEvent,useState } from 'react';

import styles from './styles.module.css';

/**
 * Props for the OrderDiscount component.
 */
export interface OrderDiscountProps {
  /**
   * Fired every time the discount percentage changes.
   * @param value Discount percentage (0–100).
   */
  onChange?: (value: number) => void;

  /**
   * Initial discount percentage.
   */
  initialValue?: number;
}

/**
 * OrderDiscount Component
 * Allows users to pick a predefined discount or manually enter one.
 * Fully validated and built for scalable POS logic.
 */
export const OrderDiscount: React.FC<OrderDiscountProps> = ({
  onChange,
  initialValue = 0
}) => {
  const predefined: number[] = [1, 2, 5, 10, 15];

  const [custom, setCustom] = useState<string>('');
  const [selected, setSelected] = useState<number>(initialValue);

  /**
   * Selects a predefined discount.
   */
  const handleSelect = (value: number): void => {
    setCustom('');
    setSelected(value);
    onChange?.(value);
  };

  /**
   * Handles custom input discount.
   */
  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value;

    // Allow only digits up to 3 chars
    if (!/^\d{0,3}$/.test(raw)) {return;}

    setCustom(raw);

    // Convert safely
    const num = Number(raw);

    // Full validation
    if (isNaN(num) || num < 0 || num > 100) {
      setSelected(0);
      onChange?.(0);
      return;
    }

    setSelected(num);
    onChange?.(num);
  };

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Descuento</h4>

      <div className={styles.options}>
        {predefined.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handleSelect(p)}
            className={`${styles.optionBtn} ${
              selected === p ? styles.active : ''
            }`}
          >
            {p}%
          </button>
        ))}
      </div>

      <div className={styles.customWrapper}>
        <label className={styles.customLabel}>Otro porcentaje</label>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Ej: 7"
          className={styles.customInput}
          value={custom}
          onChange={handleCustomChange}
        />
      </div>

      <p className={styles.summary}>
        Descuento actual: <strong>{selected}%</strong>
      </p>
    </div>
  );
};
