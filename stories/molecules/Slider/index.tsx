import React from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import styles from "./styles.module.css";
SwiperCore.use([Navigation, Pagination, A11y]);

interface CarouselProps {
  children: React.ReactNode[] | React.ReactNode;
  navigation?: boolean;
  pagination?: boolean;
  scrollbar?: boolean;
  breakpoints?: {
    [key: string]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  navigation = true,
  pagination = true,
  scrollbar = false,
  breakpoints,
}) => {
  return (
    <div className={styles.swiper_container}>
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={30}
        className={styles.carousel}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        scrollbar={scrollbar ? { draggable: true } : false}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
