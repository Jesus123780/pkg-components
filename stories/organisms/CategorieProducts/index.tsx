import React from "react";
import { Carousel } from "../../molecules/Slider";
import styles from "./styles.module.css";
import { Checkbox, Text } from "../../atoms";
import { Root } from "./types";

interface CategorieProductsProps {
  data: Root[];
  breakpoints: {
    [key: string]: {
      slidesPerView: number;
      spaceBetween: number | string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CategorieProducts: React.FC<CategorieProductsProps> = ({
  data = [],
  breakpoints,
  onChange = (event) => {
    console.log(event);
  },
}) => {
  return (
    <div>
      {/* @ts-ignore */}
      <Carousel breakpoints={breakpoints} pagination={false}>
        {data.map((item, index) => (
          <div key={item.carProId} className={styles.categorie} title={item.pName}>
            <div className={styles.cat_item}>
              <Checkbox
                className={styles.checkbox}
                checked={false}
                onChange={onChange}
              />
              <Text
                className={styles.cat_title}
                size="sm"
                align="center"
                color="gray"
              >
                {item.pName}
              </Text>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
