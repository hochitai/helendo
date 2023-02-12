import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import routes from '~/config/routes';
import images from '~/assets/images';
import { ExitIcon, MiniCartIcon, UserIcon } from '~/components/Icons';
import MiniCartItem from './MiniCartItem';
import styles from './Header.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
    const [showCart, setShowCart] = useState(false);

    return (
        <header className={cx('container mx-auto flex justify-between items-center absolute inset-x-0 top-0 z-10')}>
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

                <button
                    className={cx('action-btn', 'flex justify-end items-center mr-14')}
                    onClick={() => setShowCart(true)}
                >
                    <MiniCartIcon />
                    <span className={cx('badge')}>1</span>
                </button>

                <Tippy
                    render={(attrs) => (
                        <div className={cx('user-info')} {...attrs}>
                            {/* Các chức năng của User */}
                        </div>
                    )}
                >
                    <button>
                        <img
                            src={images.avatar}
                            alt="avatar"
                            className="object-cover w-12 h-12 rounded-full shadow border border-solid border-slate-300"
                        />
                    </button>
                </Tippy>
            </div>
            <div className={cx('minicart-area', { active: showCart })} onClick={() => setShowCart(false)}>
                <div className={cx('minicart-inner', 'fixed inset-y-0 right-0')}>
                    <button className="text-4xl" onClick={() => setShowCart(false)}>
                        <ExitIcon />
                    </button>
                    <div className={cx('minicart-list', 'pt-10 flex-1')}>
                        <MiniCartItem />
                        <MiniCartItem />
                        <MiniCartItem />
                    </div>
                    <div className="minicart-subtotal flex justify-between text-[24px] font-medium pt-[40px]">
                        <span>Subtotal:</span>
                        <span>$202.00</span>
                    </div>
                    <Button second className="mt-[40px] w-full justify-center">
                        View cart
                    </Button>
                    <Button primary className="w-full justify-center">
                        Checkout
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
