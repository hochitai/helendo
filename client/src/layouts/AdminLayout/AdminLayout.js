import { Fragment } from 'react';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import config from '~/config';
import { LoginAdmin } from '~/pages/Admin/Login';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const cookies = new Cookies();

    return !cookies.get('token') ? (
        <LoginAdmin />
    ) : (
        cookies.get('resource') && (
            <Fragment>
                <div className={cx('wrapper relative flex')}>
                    <div className="wrapper w-1/5 ">
                        <div className="mt-40"></div>
                        <nav className={cx('flex flex-col ')}>
                            <NavLink
                                className={(nav) =>
                                    cx('nav-item', 'w-full  text-[18px] pl-6 py-4 mb-4 ', {
                                        'relative after:absolute after:bottom-0 after:left-6 after:w-1/4 after:h-1 after:bg-primary':
                                            nav.isActive,
                                    })
                                }
                                to={config.routes.Admin + '/infomation'}
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
                                to={config.routes.Admin + '/purchase-history'}
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
                                to={config.routes.Admin + '/change-password'}
                            >
                                Change Password
                            </NavLink>
                        </nav>
                    </div>
                    <div className={cx('content w-4/5 mx-20')}>{children}</div>
                </div>
            </Fragment>
        )
    );
}

export default AdminLayout;
