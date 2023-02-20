import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { ArroUpIcon } from '~/components/Icons';
import styles from './ScrollOnTop.module.scss';

const cx = classNames.bind(styles);

function ScrollOnTop() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        // Button is displayed after scrolling for 140 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset >= 140) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={cx(
                'scroll-top',
                'fixed right-14 bottom-14 w-[60px] h-[60px] flex justify-center items-center rounded-full z-50',
                {
                    block: isVisible,
                    hidden: !isVisible,
                },
            )}
            onClick={scrollToTop}
        >
            <ArroUpIcon />
        </button>
    );
}

export default ScrollOnTop;
