import { useState, useEffect, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import images from '~/assets/images';
import { ExitIcon, MiniCartIcon, UserIcon } from '~/components/Icons';
import MiniCartItem from './MiniCartItem';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import { handleRemoveItemCart } from '~/utils/handleLocalStorage';
import { DeleteDialog } from '~/components/Dialog';
import config from '~/config';

const cx = classNames.bind(styles);

function Header({ type = 'block', fixed = false }) {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const info = cookies.get('info');
    const [isSticky, setIsSticky] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [cartItemId, setCartItemId] = useState('');

    useEffect(() => {
        // Button is displayed after scrolling for 90 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset >= 90) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        !fixed && window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener('storage', () => {
            setCart(JSON.parse(localStorage.getItem('cart')));
        });
    }, []);

    const onCloseDialog = () => {
        setIsShowDialog(false);
    };

    const onOpenDialog = (id) => {
        setIsShowDialog(true);
        setCartItemId(id);
    };

    const onAccept = (id) => {
        setIsShowDialog(false);
        handleRemoveItemCart(id);
    };

    const handleLogout = () => {
        cookies.remove('token', { path: '/' });
        cookies.remove('info', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
        cookies.remove('resource', { path: '/' });
        window.location.reload(false);
    };

    return (
        <header
            className={cx('w-full bg-white z-[100]', {
                transparent: type === 'transparent',
                isSticky,
            })}
        >
            <div className="container mx-auto flex justify-between items-center   ">
                <Link to={routes.home}>
                    <img className={cx('object-contain')} src={images.logo} alt="Helendo" />
                </Link>
                <nav className={cx('flex justify-center')}>
                    <NavLink
                        className={(nav) => cx('nav-item', 'py-12 mr-16', { active: nav.isActive })}
                        to={routes.home}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={(nav) => cx('nav-item', 'py-12 mr-16', { active: nav.isActive })}
                        to={routes.products}
                    >
                        Products
                    </NavLink>
                    <NavLink className={(nav) => cx('nav-item', 'py-12', { active: nav.isActive })} to={routes.blogs}>
                        Blogs
                    </NavLink>
                </nav>
                <div className={cx('actions', 'flex justify-end items-center')}>
                    <button
                        className={cx('action-btn', 'flex justify-end items-center mr-14')}
                        onClick={() => setShowCart(true)}
                    >
                        <MiniCartIcon />
                        <span className={cx('badge')}>{cart.length}</span>
                    </button>

                    {!!!token ? (
                        <Link to={routes.auth} className={cx('action-btn', 'mr-14')}>
                            <UserIcon />
                        </Link>
                    ) : (
                        <button className="relative pl-4 group after:absolute after:right-0 after:-bottom-[6px] after:transparent after:w-[100px] after:h-[8px]">
                            <img
                                src={info.avatar || images.avatar}
                                alt="avatar"
                                className="object-cover w-12 h-12 rounded-full shadow border border-solid border-slate-300"
                            />

                            <ul className="pt-[10px] border-[1px] border-slate-200 border-solid bg-white w-[160px] rounded-lg shadow-xl absolute top-[36px] right-[10px] scale-0 origin-top-right transition-all  group-hover:scale-100 z-50">
                                <li className="py-2 mb-2 font-medium h-full block border-b cursor-default">User</li>
                                <li className="hover:bg-primary">
                                    <Link
                                        to={config.routes.user}
                                        className="hover:text-white p-4 text-[14px] h-full block"
                                    >
                                        Account settings
                                    </Link>
                                </li>

                                <li
                                    className="p-4  text-[14px] hover:bg-primary hover:text-white transition-all rounded-b-lg"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </li>
                            </ul>
                        </button>
                    )}
                </div>
                <div className={cx('minicart-area', { active: showCart })}>
                    <div
                        className={cx('minicart-area-overlay', 'bg-black opacity-0 transition-all cursor-pointer', {
                            'opacity-30 fixed inset-0': showCart,
                            hidden: !showCart,
                        })}
                        onClick={() => setShowCart(false)}
                    ></div>
                    <div className={cx('minicart-inner', 'fixed inset-y-0 right-0')}>
                        <button className="text-4xl" onClick={() => setShowCart(false)}>
                            <ExitIcon />
                        </button>
                        <div className={cx('minicart-list', 'pt-10 flex-1')}>
                            {cart.length > 0 ? (
                                cart.map((ele) => <MiniCartItem key={ele.id} data={ele} onOpenDialog={onOpenDialog} />)
                            ) : (
                                <div className="text-center p-16 text-4xl">Cart is empty</div>
                            )}
                        </div>
                        {cart.length > 0 && (
                            <Fragment>
                                <div className="minicart-subtotal flex justify-between text-[24px] font-medium pt-[40px]">
                                    <span>Subtotal:</span>
                                    <span>
                                        $
                                        {cart
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue.quantity * currentValue.price,
                                                0,
                                            )
                                            .toFixed(2)}
                                    </span>
                                </div>
                                <Button second to={routes.cart} className="mt-[40px] w-full justify-center">
                                    View cart
                                </Button>
                                <Button
                                    primary
                                    to={routes.checkout}
                                    className="w-full justify-center text-primary mt-[15px]"
                                >
                                    Checkout
                                </Button>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
            {isShowDialog && <DeleteDialog onClose={onCloseDialog} onAccept={() => onAccept(cartItemId)} />}
        </header>
    );
}

export default Header;
