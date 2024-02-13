import React from 'react'
import SwiperCore from 'swiper'
import {
    Swiper,
    SwiperSlide
} from 'swiper/react'
import {
    Navigation,
    Pagination,
    A11y
} from 'swiper/modules'

SwiperCore.use([Navigation, Pagination, A11y]);

interface CarouselProps {
    children: React.ReactNode[] | React.ReactNode;
    navigation?: boolean;
    pagination?: boolean;
    scrollbar?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
    children,
    navigation = true,
    pagination = true,
    scrollbar = true,
}) => {
  return (
    <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        scrollbar={scrollbar ? { draggable: true } : false}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
