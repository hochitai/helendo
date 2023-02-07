import classNames from 'classnames/bind';
import CustomSlider from '~/components/CustomSlider';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wapper')}>
            <CustomSlider />
        </div>
    );
}
export default Home;
