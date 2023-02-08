import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import ScrollOnTop from '~/components/ScrollOnTop';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper relative')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
            <ScrollOnTop />
        </div>
    );
}

export default DefaultLayout;
