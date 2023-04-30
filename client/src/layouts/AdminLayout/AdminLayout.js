import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import config from '~/config';
import { LoginAdmin } from '~/pages/Admin/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBox, faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove('token', { path: '/' });
        cookies.remove('info', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
        cookies.remove('resource', { path: '/' });
        window.location.reload(false);
    };

    return !cookies.get('token') && !cookies.get('refreshToken') ? (
        <LoginAdmin />
    ) : cookies.get('resource') ? (
        <div className={cx('wrapper relative flex')}>
            <div className="wrapper w-[100px] fixed top-0 left-0 bottom-0 pr-[40px] bg-primary h-screen  flex flex-col items-center ">
                <img src={images.logoIcon} alt="Logo Icon" className="mt-20" />
                <nav className={cx('flex flex-1 flex-col mt-40 ')}>
                    <NavLink
                        className={(nav) =>
                            cx('nav-item', 'w-full text-[18px]  p-4 mb-4 text-center', {
                                'bg-white/20 text-gray-100 rounded-2xl': nav.isActive,
                                'text-gray-300/70': !nav.isActive,
                            })
                        }
                        to={config.routes.admin + '/'}
                    >
                        <FontAwesomeIcon icon={faHome} />
                    </NavLink>
                    <NavLink
                        className={(nav) =>
                            cx('nav-item', 'w-full text-[18px]  p-4 mb-4 text-center', {
                                'bg-white/20 text-gray-100 rounded-2xl': nav.isActive,
                                'text-gray-300/70': !nav.isActive,
                            })
                        }
                        to={config.routes.orderAdmin}
                    >
                        <FontAwesomeIcon icon={faList} />
                    </NavLink>
                    <NavLink
                        className={(nav) =>
                            cx('nav-item', 'w-full text-[18px]  p-4 mb-4 text-center', {
                                'bg-white/20 text-gray-100 rounded-2xl': nav.isActive,
                                'text-gray-300/70': !nav.isActive,
                            })
                        }
                        to={config.routes.productAdmin}
                    >
                        <FontAwesomeIcon icon={faBox} />
                    </NavLink>
                    <NavLink
                        className={(nav) =>
                            cx('nav-item', 'w-full text-[18px]  p-4 mb-4 text-center', {
                                'bg-white/20 text-gray-100 rounded-2xl': nav.isActive,
                                'text-gray-300/70': !nav.isActive,
                            })
                        }
                        to={config.routes.customerAdmin}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                </nav>
                <button className="w-full text-[18px] p-4 mb-20 text-center flex-end" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
            </div>
            <div
                className={cx(
                    'content w-full fixed top-0 bottom-0 left-[60px] pr-[60px] bg-slate-50 z-10 rounded-l-[30px] overflow-scroll',
                )}
            >
                <div className="flex justify-end py-5 border-b border-gray-300 mb-4 mr-20">
                    <div className="flex items-center">
                        <p>Teo</p>
                        <img
                            src={images.avatar}
                            alt="user"
                            className="w-[40px] h-[40px] ml-4 rounded-full border border-solid"
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
    ) : (
        <LoginAdmin />
    );
}

export default AdminLayout;
