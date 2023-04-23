import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneVolume, faPencil } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import Header from '~/layouts/components/Header/Header';
import UserPurchase from '~/components/UserPurchase';
import UserInformation from '~/components/UserInformation/UserInformation';
import UserChangePassword from '~/components/UserChangePassword';
import { useState } from 'react';
import styles from './User.module.scss';
import ErrorAuth from '~/components/ErrorAuth/ErrorAuth';

const cx = classNames.bind(styles);

function User() {
    const cookies = new Cookies();
    const [isAuth] = useState(!!cookies.get('info') && !!cookies.get('token'));
    const Component = {
        Information() {
            return <UserInformation />;
        },
        ChangePassword() {
            return <UserChangePassword />;
        },
        OrderHistory() {
            return <UserPurchase />;
        },
    };

    const [setting, setSetting] = useState('Information');
    const Comp = Component[setting];

    return (
        <>
            <Header />
            {isAuth ? (
                <div className="container mx-auto mt-[60px]">
                    <div className="relative border rounded-2xl overflow-hidden p-2">
                        <img
                            src={images.bgUser}
                            alt="Background User"
                            className="h-[130px] w-full bg-cover rounded-2xl"
                        />
                        <div className="user-infomation mx-[20px] my-[30px]">
                            <h2 className="text-[24px] text-gray-600 mb-4">{cookies.get('info').name}</h2>
                            <div className="flex items-center text-gray-400 text-[14px]">
                                <div className="flex items-center mr-6 ">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span className="ml-4">Teo@gmail.com</span>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                    <span className="ml-4">(+84) 0912345678</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[24px] left-[50px] ">
                            <div className="p-1 w-[120px] h-[120px] rounded-full overflow-hidden bg-white shadow-md">
                                <img
                                    src={images.avatar}
                                    alt=""
                                    className=" bg-cover rounded-full border border-solid"
                                />
                                <label
                                    htmlFor="user-avatar"
                                    className="absolute top-0 right-0 py-2 px-3 bg-white rounded-lg border border-solid text-[12px] text-gray-600 shadow-md cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </label>
                                <input type="file" id="user-avatar" hidden />
                            </div>
                        </div>
                    </div>
                    <ul className="flex items-center border rounded-2xl overflow-hidden py-3 mt-[20px]">
                        <li
                            className={cx('p-4 mx-4 rounded-2xl text-center select-none cursor-pointer', {
                                'bg-gray-100': setting === 'Information',
                            })}
                            onClick={() => setSetting('Information')}
                        >
                            Account settings
                        </li>
                        <li
                            className={cx('p-4 mx-4 rounded-2xl text-center select-none cursor-pointer', {
                                'bg-gray-100': setting === 'ChangePassword',
                            })}
                            onClick={() => setSetting('ChangePassword')}
                        >
                            Change password
                        </li>
                        <li
                            className={cx('p-4 mx-4 rounded-2xl text-center select-none cursor-pointer', {
                                'bg-gray-100': setting === 'OrderHistory',
                            })}
                            onClick={() => setSetting('OrderHistory')}
                        >
                            Order history
                        </li>
                    </ul>
                    <div className="mt-[20px]">{<Comp />}</div>
                </div>
            ) : (
                <ErrorAuth />
            )}
        </>
    );
}
export default User;
