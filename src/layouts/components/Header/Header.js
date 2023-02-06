import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import images from '~/assets/images';
import { MiniCartIcon, UserIcon } from '~/components/Icons';
import routes from '~/config/routes';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('container mx-auto flex justify-between items-center')}>
            <Link to={routes.home}>
                <img className={cx('object-contain')} src={images.logo} alt="Helendo" />
            </Link>
            <nav className={cx('flex justify-center')}>
                <NavLink className={(nav) => cx('nav-item', 'py-20 mr-20', { active: nav.isActive })} to={routes.home}>
                    Home
                </NavLink>
                <NavLink
                    className={(nav) => cx('nav-item', 'py-20 mr-20', { active: nav.isActive })}
                    to={routes.products}
                >
                    Products
                </NavLink>
                <NavLink className={(nav) => cx('nav-item', 'py-20', { active: nav.isActive })} to={routes.blogs}>
                    Blogs
                </NavLink>
            </nav>
            <div className={cx('actions', 'flex justify-end items-center')}>
                <Link to={routes.auth} className={cx('action-btn', 'mr-14')}>
                    <UserIcon />
                </Link>

                <button className={cx('action-btn', 'flex justify-end items-center ')}>
                    <MiniCartIcon />
                    <span className={cx('badge')}>1</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
