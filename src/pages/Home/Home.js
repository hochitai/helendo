import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <container classNames={cx('wrapper')}>
            <h1>Home</h1>
        </container>
    );
}
export default Home;
