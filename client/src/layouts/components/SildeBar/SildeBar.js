import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import classNames from 'classnames/bind';
import styles from './SildeBar.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function SlideBar() {
    const cookies = new Cookies();
    const [info, setInfo] = useState(cookies.get('info') || {});

    return (
        <div className="wrapper w-1/5 fixed top-0 bottom-0 left-0 h-screen bg-primary ">
            <div className="w-3/4 mx-auto mt-4 ">
                <img src={info.avatar} alt="avatar" className="rounded-full h-[200px] object-cover" />
            </div>
            <div className="text-center mt-8 text-[24px]">{info.name}</div>
            <nav className={cx('flex justify-center flex-col ')}>
                <NavLink
                    className={(nav) =>
                        cx('nav-item', 'w-full text-center text-[24px] p-12 ', { active: nav.isActive })
                    }
                    to={config.routes.home}
                >
                    Home
                </NavLink>
                <NavLink
                    className={(nav) =>
                        cx('nav-item', 'w-full text-center text-[24px] p-12  mr-16', { active: nav.isActive })
                    }
                    to={config.routes.user + '/purchase-history'}
                >
                    Purchase History
                </NavLink>
                <NavLink
                    className={(nav) =>
                        cx('nav-item', 'w-full text-center text-[24px] p-12  mr-16', { active: nav.isActive })
                    }
                    to={config.routes.user + '/infomation'}
                >
                    Information
                </NavLink>
            </nav>
        </div>
    );
}

export default SlideBar;
