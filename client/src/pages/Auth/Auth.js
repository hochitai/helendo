import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import classNames from 'classnames/bind';
import BounceLoader from 'react-spinners/BounceLoader';

import request from '~/utils/httpRequest';
import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import styles from './Auth.module.scss';
import Button from '~/components/Button';
import FormInput from '~/components/FormInput';
import apis from '~/config/apis';

const cx = classNames.bind(styles);

const SHOW_LOGIN = 'login';
const SHOW_REGISTER = 'register';

function Auth() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [resultRegister, setResultRegister] = useState({});
    const [resultLogin, setResultLogin] = useState({});
    const [option, setOption] = useState(SHOW_LOGIN);
    const [values, setValues] = useState({
        userName: '',
        password: '',
        rememberPass: false,
        regName: '',
        regPassword: '',
        regNickName: '',
        regPhone: '',
    });

    const inputLogins = [
        {
            id: 1,
            name: 'userName',
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
            errorMessage: "Name should be 3-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,16}$',
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
            name: 'regNickName',
            type: 'text',
            label: 'Nickname',
            errorMessage: "Name should be 3-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,16}$',
            required: true,
        },
        {
            id: 7,
            name: 'regPhone',
            type: 'text',
            label: 'Phone',
            errorMessage: "Phone number should be 10 numbers and shouldn't include any special character!",
            pattern: '(0[3|5|7|8|9])+([0-9]{8})',
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

    const handleLogin = async (e) => {
        e.preventDefault();

        if (values.userName && values.password) {
            setLoading(true);
            await request
                .post(apis.login, {
                    userName: values.userName,
                    password: values.password,
                })
                .then((res) => {
                    setResultLogin(res.data);
                    if (res.data.statusId === 0) {
                        cookies.set('token', res.data.token, { path: '/' });
                        cookies.set('refreshToken', res.data.refreshToken, { path: '/' });
                        cookies.set('info', res.data.data, { path: '/' });
                        navigate('/');
                    }
                })
                .catch((error) => {
                    setResultLogin(error.response.data);
                });
            setLoading(false);
            setValues({ ...values, regName: '', regPassword: '', regNickName: '', regPhone: '' });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (values.regName && values.regPassword && values.regNickName && values.regPhone) {
            setLoading(true);
            await request
                .post(apis.register, {
                    userName: values.regName,
                    password: values.regPassword,
                    name: values.regNickName,
                    phone: values.regPhone,
                })
                .then((res) => {
                    console.log(res.data);
                    setResultRegister(res.data);
                })
                .catch((error) => {
                    console.log(error.data);
                    setResultRegister(error.data);
                });
            setLoading(false);
            setValues({ ...values, regName: '', regPassword: '', regNickName: '', regPhone: '' });
        }
    };

    return (
        <Fragment>
            <Header />
            <Breadcrumb title={'Login'} />
            {loading && (
                <div className="flex justify-center items-center fixed bg-gray-700 inset-0 z-[999] opacity-70">
                    <BounceLoader color="#DCB14A" />
                </div>
            )}
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
                        <form className="login-form" onSubmit={handleLogin}>
                            <h3 className="title text-[18px] mb-[25px] font-medium">Login your account</h3>
                            {inputLogins.map((input) => (
                                <FormInput
                                    key={input.id}
                                    classOfForm="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                    className="mb-[30px]"
                                    label={input.label}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.label}
                                    value={values[input.name]}
                                    onChange={onChangeValue}
                                />
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
                            <div className="mt-8 ">
                                {loading || (
                                    <span
                                        className={cx('block text-center text-[20px]', {
                                            'text-red-500': resultLogin.statusId === 1,
                                            'text-green-500': resultLogin.statusId === 0,
                                        })}
                                    >
                                        {resultLogin.message}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className={cx('Register-content tab-style-common', { hidden: option !== SHOW_REGISTER })}>
                        <form className="register-form" onSubmit={handleRegister}>
                            <h3 className="title text-[18px] mb-[25px] font-medium">Register An Account</h3>
                            {inputRegisters.map((input) => (
                                <FormInput
                                    key={input.id}
                                    className="mb-[30px]"
                                    classOfForm="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.label}
                                    value={values[input.name]}
                                    onChange={onChangeValue}
                                    // hasLabel={false}
                                    {...input}
                                />
                            ))}
                            <p className="lg:max-w-[495px] mt-[20px] mb-[25px] leading-[28px] text-justify">
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
                            <div className="mt-8 ">
                                {loading || (
                                    <span
                                        className={cx('block text-center text-[20px]', {
                                            'text-red-500': resultRegister.statusId === 1,
                                            'text-green-500': resultRegister.statusId === 0,
                                        })}
                                    >
                                        {resultRegister.message}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Auth;
