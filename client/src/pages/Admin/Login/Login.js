import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import config from '~/config';
import styles from './Login.module.scss';
import request from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Login() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        userName: '',
        password: '',
    });
    const inputLogins = [
        {
            id: 1,
            name: 'userName',
            type: 'text',
            label: 'Username',
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            label: 'Password',
        },
    ];

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        request.post(config.apis.loginAdmin, values).then((res) => {
            console.log(res.data);
            if (res.data.statusId === 0) {
                cookies.set('token', res.data.token, { path: '/' });
                cookies.set('info', res.data.data, { path: '/' });
                cookies.set('resource', res.data.resource, { path: '/' });
                // navigate('/admin');
                window.location.reload();
            } else {
                setMessage(res.data.message);
            }
        });
    };

    return (
        <div className="bg-slate-200 fixed inset-0 flex justify-center items-center">
            <div className="relative flex w-[800px] h-[500px] bg-white rounded-3xl overflow-hidden">
                <div className="login-image absolute flex-1 -left-1/3 rotate-12 -top-1/4 shadow-2xl">
                    <img src={images.bgLoginAdmin} alt="login" className="" />
                </div>
                <div className="flex-1"></div>
                <div className="flex-1">
                    <form className="mx-16">
                        <div className="relative py-2 mb-24 text-center text-[24px] font-semibold mt-24 after:absolute after:w-[40px] after:h-[3px] after:bg-blue-500 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-md">
                            Login
                        </div>
                        {inputLogins.map((input) => (
                            <input
                                key={input.id}
                                name={input.name}
                                type={input.type}
                                className="py-6 border-b-[1px] border-gray-400 w-full mb-6"
                                placeholder={input.label}
                                value={values[input.name]}
                                onChange={onChangeValue}
                            />
                        ))}

                        <div className="text-blue-400">
                            <Link
                                className=" text-[14px] italic"
                                style={{ color: 'rgb(96 165 250 / var(--tw-text-opacity))' }}
                                to={config.routes.home}
                            >
                                Forget password?
                            </Link>
                        </div>
                        <button
                            className="mt-16 rounded-full bg-blue-500 text-white w-full h-[40px] hover:opacity-80"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <div className="message text-red-500 text-center mt-4">{message}</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
