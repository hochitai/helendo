import classNames from 'classnames/bind';
import SildeBar from '../components/SildeBar';
import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);

function UserLayout({ children }) {
    return (
        <div className={cx('wrapper relative flex')}>
            <SildeBar />
            <div className="w-1/5"></div>
            <div className={cx('content w-4/5 mx-20')}>{children}</div>
        </div>
    );
}

export default UserLayout;
