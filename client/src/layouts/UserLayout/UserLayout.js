import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import styles from './UserLayout.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function UserLayout({ children }) {
    return (
        <Fragment>
            <Header fixed />
            <div className={cx('wrapper relative flex')}>
                <div className="wrapper w-1/5 ml-40">
                    <div className="mt-40"></div>
                    <nav className={cx('flex flex-col ')}>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] pl-6 py-4 mb-4 ', {
                                    'relative after:absolute after:bottom-0 after:left-6 after:w-1/4 after:h-1 after:bg-primary':
                                        nav.isActive,
                                })
                            }
                            to={config.routes.user + '/infomation'}
                        >
                            Infomation
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] pl-6 py-4 mb-4 ', {
                                    'relative after:absolute after:bottom-0 after:left-6 after:w-1/4 after:h-1 after:bg-primary':
                                        nav.isActive,
                                })
                            }
                            to={config.routes.user + '/purchase-history'}
                        >
                            Purchase History
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                cx('nav-item', 'w-full  text-[18px] pl-6 py-4 mb-4 ', {
                                    'relative after:absolute after:bottom-0 after:left-6 after:w-1/4 after:h-1 after:bg-primary':
                                        nav.isActive,
                                })
                            }
                            to={config.routes.user + '/change-password'}
                        >
                            Change Password
                        </NavLink>
                    </nav>
                </div>
                <div className={cx('content w-4/5 mx-20')}>{children}</div>
            </div>
        </Fragment>
    );
}

export default UserLayout;
