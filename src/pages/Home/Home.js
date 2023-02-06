// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Swiper slidesPerView={1}>
                <SwiperSlide className={cx('flex justify-between')}>
                    <h1>Content</h1>
                    <img src={images.slider1} alt="slider" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
export default Home;
