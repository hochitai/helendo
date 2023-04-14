import { Cookies } from 'react-cookie';
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

    return !cookies.get('token') ? (
        <LoginAdmin />
    ) : (
        cookies.get('resource') && (
            <div className={cx('wrapper relative flex ')}>
                <div className="wrapper w-[60px] fixed top-0 left-0 bottom-0 bg-primary h-screen rounded-r-full flex flex-col justify-between">
                    <nav className={cx('flex flex-col mt-40')}>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] py-4 mb-4 text-center', {
                                    'bg-amber-200': nav.isActive,
                                })
                            }
                            to={config.routes.admin + '/'}
                        >
                            <FontAwesomeIcon icon={faHome} />
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] py-4 mb-4 text-center', {
                                    'bg-amber-200': nav.isActive,
                                })
                            }
                            to={config.routes.orderAdmin}
                        >
                            <FontAwesomeIcon icon={faList} />
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] py-4 mb-4 text-center', {
                                    'bg-amber-200': nav.isActive,
                                })
                            }
                            to={config.routes.productAdmin}
                        >
                            <FontAwesomeIcon icon={faBox} />
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] py-4 mb-4 text-center', {
                                    'bg-amber-200': nav.isActive,
                                })
                            }
                            to={config.routes.customerAdmin}
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </NavLink>
                    </nav>
                    <button className="w-full text-[18px] py-4 mb-20 text-center ">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                </div>
                <div className="w-[60px]"></div>
                <div className={cx('content flex-1 mx-20 ')}>
                    <div className="flex justify-end py-5 border-b border-gray-300 mb-4">
                        <div className="flex items-center">
                            <p>Teo</p>
                            <img src={images.avatar} alt="user" className="w-[40px] h-[40px] ml-4 rounded-full" />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        )
    );
}

export default AdminLayout;
