import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import ProductItem from '~/components/ProductItem';
import styles from './CustomCarousel.module.scss';

const cx = classNames.bind(styles);

SwiperCore.use([Navigation]);

function CustomCarousel({ title }) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (
        <div className="width-content pt-[120px] mx-auto relative">
            <div className={cx('section-title', 'text-[36px] font-medium text-center pb-[10px] mb-[50px] relative ')}>
                <h2>{title}</h2>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={25}
                modules={[Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                className="relative"
            >
                <SwiperSlide>
                    <ProductItem />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem />
                </SwiperSlide>
            </Swiper>

            <div ref={navigationPrevRef} className="absolute top-3/4 -left-20 -translate-y-full text-4xl p-2 z-30">
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div ref={navigationNextRef} className="absolute top-3/4 -right-20 -translate-y-full text-4xl p-2 z-30">
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
}

export default CustomCarousel;
