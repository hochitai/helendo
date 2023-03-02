import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import styles from './Auth.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const SHOW_LOGIN = 'login';
const SHOW_REGISTER = 'register';

function Auth() {
    const [option, setOption] = useState(SHOW_LOGIN);
    const [values, setValues] = useState({
        name: '',
        password: '',
        rememberPass: false,
        regName: '',
        regPassword: '',
        regEmail: '',
    });

    const inputLogins = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            label: 'Username',
            errorMessage: "Name should be 1-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,16}$',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            label: 'Password',
            errorMessage:
                'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    const inputRegisters = [
        {
            id: 4,
            name: 'regName',
            type: 'text',
            label: 'Username',
            errorMessage: "Name should be 1-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,16}$',
            required: true,
        },
        {
            id: 5,
            name: 'regPassword',
            type: 'password',
            label: 'Password',
            errorMessage:
                'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 6,
            name: 'regEmail',
            type: 'email',
            label: 'Email',
            errorMessage: 'It should be a valid email address!',
            required: true,
        },
    ];

    const handleChecked = () => {
        setValues({ ...values, rememberPass: !values.rememberPass });
    };

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Register');
    };

    return (
        <Fragment>
            <Header />
            <Breadcrumb title={'Login'} />
            <div className="border-b border-[#ededed] xl:py-[155px] lg:py-[100px] md:py-[80px] py-[50px]">
                <div className="container md:max-w-[50rem] mx-auto">
                    <ul className="auth-menu flex justify-center pb-[50px]">
                        <li
                            className={cx('login mr-[45px] last:mr-0', {
                                'text-[#666666]': option !== SHOW_LOGIN,
                            })}
                            onClick={() => setOption(SHOW_LOGIN)}
                        >
                            <span className="font-semibold cursor-pointer text-[24px] leading-[42px]">Login</span>
                        </li>
                        <li
                            className={cx('login mr-[45px] last:mr-0', { 'text-[#666666]': option !== SHOW_REGISTER })}
                            onClick={() => setOption(SHOW_REGISTER)}
                        >
                            <span className="font-semibold cursor-pointer text-[24px] leading-[42px]">
                                Our Register
                            </span>
                        </li>
                    </ul>
                    <div className={cx('login-content tab-style-common', { hidden: option !== SHOW_LOGIN })}>
                        <form className="login-form">
                            <h3 className="title text-[18px] mb-[25px] font-medium">Login your account</h3>
                            {inputLogins.map((input) => (
                                <div key={input.id} className="single-field mb-[30px]">
                                    <input
                                        className="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.label}
                                        value={values[input.name]}
                                        onChange={onChangeValue}
                                    />
                                </div>
                            ))}
                            <div className="single-field flex justify-between items-center mb-[30px]">
                                <label className="flex cursor-pointer" htmlFor="rememberme" onChange={handleChecked}>
                                    <input type="checkbox" id="rememberme" className="cursor-pointer" />
                                    <span className="text-[14px] ml-[15px]">Remember me</span>
                                </label>
                                <a
                                    className="text-[14px] font-normal transition-all hover:text-primary"
                                    href="/lost-password"
                                >
                                    Lost your password?
                                </a>
                            </div>
                            <div className="button-wrap">
                                <Button
                                    primary
                                    type="submit"
                                    className="justify-center leading-[38px] text-[15px] h-[50px] w-full  transition-all px-[40px]"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className={cx('Register-content tab-style-common', { hidden: option !== SHOW_REGISTER })}>
                        <form className="register-form">
                            <h3 className="title text-[18px] mb-[25px] font-medium">Register An Account</h3>
                            {/* <div className="single-field mb-[30px]">
                                <input
                                    className="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="single-field mb-[30px]">
                                <input
                                    className="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                    type="email"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="single-field">
                                <input
                                    className="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div> */}
                            {inputRegisters.map((input) => (
                                <div key={input.id} className="single-field mb-[30px]">
                                    <input
                                        className="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.label}
                                        value={values[input.name]}
                                        onChange={onChangeValue}
                                    />
                                </div>
                            ))}
                            <p className="lg:max-w-[495px] mt-[20px] mb-[25px] leading-[28px]">
                                Your personal data will be used to support your experience throughout this website, to
                                manage access to your account, and for other purposes described in our
                                <a className="ml-[5px] font-medium" href="/privacy">
                                    privacy policy.
                                </a>
                            </p>
                            <div className="button-wrap">
                                <Button
                                    primary
                                    type="submit"
                                    className="justify-center leading-[38px] text-[15px] h-[50px] w-full  transition-all  px-[40px]"
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Auth;
