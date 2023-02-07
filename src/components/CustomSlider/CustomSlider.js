import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from 'swiper/core';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { ArrowRightIcon } from '~/components/Icons';
import styles from './CustomSlider.module.scss';

const cx = classNames.bind(styles);

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);

function CustomeSlider() {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">0' + (index + 1) + '</span>';
        },
    };

    const autoplay = {
        delay: 5000,
        disableOnInteraction: false,
    };
    return (
        <div className="wrapper">
            <Swiper pagination={pagination} autoplay={autoplay} className="home-slider">
                <SwiperSlide>
                    <div className="slide-inner bg-[#f1f1f1] flex items-center h-[900px] ">
                        <div className={cx('recommend-product', 'mx-auto flex px-6')}>
                            <div className="mt-24 w-3/6">
                                <span className="text-primary text-[24px] block mb-[25px]">Helendo store</span>
                                <h2 className="text-[60px] leading-[66px] mb-[30px] font-medium">Spice jars</h2>
                                <p className="block text-[16px] leading-relaxed">
                                    There are many variations of passages of Lorem Ipsum available, but
                                    <br />
                                    the majority have suffered alteration in some form.
                                </p>
                                <div className="mt-[60px] shopping-link">
                                    <Link
                                        to={routes.products}
                                        className="text-[18px] transition-all text-primary-hover font-medium flex items-center"
                                    >
                                        Shop Now
                                        <ArrowRightIcon />
                                    </Link>
                                </div>
                            </div>

                            <img src={images.slider1} alt="slider" className="ml-auto w-3/6" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner bg-[#f1f1f1] flex items-center h-[900px]">
                        <div className={cx('recommend-product', 'mx-auto flex px-6')}>
                            <div className="mt-24 w-3/6">
                                <span className="text-primary text-[24px] block mb-[25px]">Helendo store</span>
                                <h2 className="text-[60px] leading-[66px] mb-[30px] font-medium">Rattan Bag</h2>
                                <p className="block text-[16px] leading-relaxed">
                                    There are many variations of passages of Lorem Ipsum available, but
                                    <br />
                                    the majority have suffered alteration in some form.
                                </p>
                                <div className="mt-[60px] shopping-link">
                                    <Link
                                        to={routes.products}
                                        className="text-[18px] transition-all text-primary-hover font-medium flex items-center"
                                    >
                                        Shop Now
                                        <ArrowRightIcon />
                                    </Link>
                                </div>
                            </div>

                            <img src={images.slider2} alt="slider" className="ml-auto " />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner bg-[#f1f1f1] flex items-center h-[900px]">
                        <div className={cx('recommend-product', 'mx-auto flex px-6')}>
                            <div className="mt-24 w-3/6">
                                <span className="text-primary text-[24px] block mb-[25px]">Helendo store</span>
                                <h2 className="text-[60px] leading-[66px] mb-[30px] font-medium">Alarm Clock</h2>
                                <p className="block text-[16px] leading-relaxed">
                                    There are many variations of passages of Lorem Ipsum available, but
                                    <br />
                                    the majority have suffered alteration in some form.
                                </p>
                                <div className="mt-[60px] shopping-link">
                                    <Link
                                        to={routes.products}
                                        className="text-[18px] transition-all text-primary-hover font-medium flex items-center"
                                    >
                                        Shop Now
                                        <ArrowRightIcon />
                                    </Link>
                                </div>
                            </div>

                            <img src={images.slider3} alt="slider" className="ml-auto " />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default CustomeSlider;
