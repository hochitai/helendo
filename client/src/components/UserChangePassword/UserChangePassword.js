import { useState } from 'react';
import Cookies from 'universal-cookie';
import classNames from 'classnames/bind';
import FormInput from '../FormInput/FormInput';
import request from '~/utils/httpRequest';
import config from '~/config';
import { SuccessDialog } from '~/components/Dialog';
import styles from './UserChangePassword.module.scss';

const cx = classNames.bind(styles);

function UserChangePassword() {
    const cookies = new Cookies();
    const [message, setMessage] = useState('');
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [values, setValues] = useState({
        password: '',
        newPassword: '',
        repeatNewPassword: '',
    });

    const input = [
        {
            id: 1,
            name: 'password',
            type: 'password',
            label: 'Password',
        },
        {
            id: 2,
            name: 'newPassword',
            type: 'password',
            label: 'New Password',
            errorMessage:
                'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 3,
            name: 'repeatNewPassword',
            type: 'password',
            label: 'Repeat New Password',
            errorMessage: 'Password are not the same',
            pattern: values['newPassword'],
            required: true,
        },
    ];

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const regPassword = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`;
        if (
            values['password'] !== '' &&
            values['newPassword'] !== '' &&
            values['repeatNewPassword'] !== '' &&
            values['newPassword'].match(regPassword) &&
            values['password'] !== values['newPassword'] &&
            values['newPassword'] === values['repeatNewPassword']
        ) {
            request
                .post(config.apis.changePassword, values)
                .then((result) => {
                    if (result.data.statusId === 0) {
                        setIsShowDialog(true);
                    } else {
                        setMessage(result.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        cookies.set('token', error.response.data.token);
                        setMessage('Please submit again!!');
                    } else if (error.response.status === 403) {
                        cookies.remove('refreshToken');
                        cookies.remove('token');
                        cookies.remove('info');
                    } else {
                        setMessage('Changed failure');
                    }
                });
        }
    };

    const onAccept = () => {
        setIsShowDialog(false);
    };

    return (
        <div className={cx('border p-[30px] rounded-2xl')}>
            <div className="mb-[40px]">
                <h2 className="text-[24px] font-medium">Change password</h2>
                <h3 className="text-[18px] text-gray-400">Here you can change your password</h3>
            </div>
            <form className="ing-form">
                <div className="flex">
                    <div className="flex-1">
                        {input.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                className="mb-[20px]"
                                classOfForm="border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]"
                                value={values[input.name]}
                                onChange={onChangeValue}
                            />
                        ))}
                    </div>
                </div>
                <button className="bg-primary text-white py-4 px-6 rounded-lg hover:opacity-70" onClick={handleChange}>
                    Change
                </button>
            </form>
            <div className="my-6 mr-20 font-medium text-red-400">{message}</div>
            {isShowDialog && <SuccessDialog title="Changed information successfully" onAccept={onAccept} />}
        </div>
    );
}

export default UserChangePassword;
