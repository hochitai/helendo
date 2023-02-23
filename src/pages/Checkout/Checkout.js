import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import styles from './Checkout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import FormInput from '~/components/FormInput';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Checkout() {
    const [showLogin, setShowLogin] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);
    const [loginValues, setLoginValues] = useState({
        name: '',
        password: '',
    });

    const [coupon, setCoupon] = useState('');

    const [billValues, setBillValues] = useState({
        billName: '',
        streetAddress: '',
        district: '',
        city: '',
        phone: '',
        note: '',
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

    const inputBills = [
        {
            id: 3,
            name: 'billName',
            type: 'text',
            label: 'Username',
            errorMessage: "Name should be 1-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,16}$',
            required: true,
        },
        {
            id: 4,
            name: 'streetAddress',
            type: 'text',
            label: 'Street Address',
            errorMessage: "Street Address should be 4-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s0-9/]{4,16}$',
            required: true,
        },
        {
            id: 5,
            name: 'district',
            type: 'text',
            label: 'District',
            errorMessage: "District should be 3-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s0-9/]{3,16}$',
            required: true,
        },
        {
            id: 6,
            name: 'city',
            type: 'text',
            label: 'Town / City',
            errorMessage: "City should be 1-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,16}$',
            required: true,
        },
        {
            id: 7,
            name: 'phone',
            type: 'text',
            label: 'Phone',
            errorMessage: "Phone number should be 10 numbers and shouldn't include any special character!",
            pattern: '(0[3|5|7|8|9])+([0-9]{8})',
            required: true,
        },
    ];

    const onChangeLoginValue = (e) => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const onChangeBillValue = (e) => {
        setBillValues({ ...billValues, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login');
    };

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        console.log('Apply coupon');
    };

    return (
        <Fragment>
            <Header />
            <Breadcrumb title={'Checkout'} />
            <div className={cx('checkout border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]')}>
                <div className="customer-info">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[30px]">
                            <div className="xl:col-span-7 lg:col-span-6 col-span-12">
                                <div className="customer-zone flex items-center bg-[#f4f5f7] p-[14px_30px_14px]">
                                    <div className="icon text-green-500 mr-[10px]">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <h2 className="title text-[16px] leading-[28px] max-sm:whitespace-nowrap max-sm:text-ellipsis overflow-hidden font-medium">
                                        Returning customer?
                                    </h2>
                                    <Button
                                        type="button"
                                        className="ml-[5px] pl-0 transition-all hover:text-primary"
                                        onClick={() => setShowLogin(!showLogin)}
                                    >
                                        Click here to login
                                    </Button>
                                </div>
                                {showLogin && (
                                    <div className="returning-form-wrap border border-[#dddddd] p-[30px] mt-[30px]">
                                        <p className="text-[#777777] text-[16px] font-normal mb-[20px]">
                                            If you have shopped with us before, please enter your details in the boxes
                                            below. If you are a new customer, please proceed to the Billing &amp;
                                            Shipping section.
                                        </p>
                                        <form className="returning-form">
                                            {inputLogins.map((input) => (
                                                <FormInput
                                                    key={input.id}
                                                    {...input}
                                                    className="mb-[20px]"
                                                    value={loginValues[input.name]}
                                                    onChange={onChangeLoginValue}
                                                />
                                            ))}
                                            <Button
                                                primary
                                                type="submit"
                                                onClick={handleLogin}
                                                className="leading-[38px] text-[15px] h-[40px] px-[32px]"
                                            >
                                                Login
                                            </Button>
                                        </form>
                                    </div>
                                )}
                            </div>
                            <div className="xl:col-span-5 lg:col-span-6 col-span-12">
                                <div className="coupon-zone flex items-center bg-[#f4f5f7] p-[14px_30px_14px]">
                                    <div className="icon text-green-500 mr-[10px]">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <h2 className="title text-[16px] leading-[28px] max-sm:whitespace-nowrap max-sm:text-ellipsis overflow-hidden font-medium">
                                        Have a coupon?
                                    </h2>
                                    <Button
                                        type="button"
                                        className="ml-[5px] pl-0 transition-all hover:text-primary"
                                        onClick={() => setShowCoupon(!showCoupon)}
                                    >
                                        Click here to enter your code
                                    </Button>
                                </div>
                                {showCoupon && (
                                    <div className="returning-form-wrap border border-[#dddddd] p-[30px] mt-[30px]">
                                        <p className="text-[#777777] text-[16px] font-normal mb-[20px]">
                                            If you have a coupon code, please apply it below.
                                        </p>
                                        <form className="returning-form">
                                            <div className="flex flex-col w-full  mb-[20px]">
                                                <input
                                                    className="border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]"
                                                    type="text"
                                                    placeholder="Coupon code"
                                                    value={coupon}
                                                    onChange={(e) => setCoupon(e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                primary
                                                type="submit"
                                                className="transition-all hover:bg-primary hover:text-white leading-[38px] text-[15px] h-[40px] px-[32px]"
                                                onClick={handleApplyCoupon}
                                            >
                                                Apply Coupon
                                            </Button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-wrap pt-[25px]">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[50px]">
                            <div className="lg:col-span-7 col-span-12">
                                <div className="billing">
                                    <h2 className="title text-[18px] mb-[20px] font-medium">Billing Details</h2>
                                    <form className="billing-form">
                                        {inputBills.map((input) => (
                                            <FormInput
                                                key={input.id}
                                                {...input}
                                                className="mb-[20px]"
                                                classOfForm="border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]"
                                                value={billValues[input.name]}
                                                onChange={onChangeBillValue}
                                            />
                                        ))}
                                        <div className="additional-info">
                                            <h3 className="text-[18px] mb-[15px] font-medium">
                                                Additional information
                                            </h3>
                                            <div className="flex flex-col w-full lg:mb-[20px]">
                                                <label htmlFor="billing-notes" className="mb-[5px]">
                                                    Order notes (optional)
                                                </label>
                                                <textarea
                                                    className="border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full min-h-[120px]"
                                                    type="text"
                                                    id="billing-notes"
                                                    spellCheck={false}
                                                    value={billValues.note}
                                                    onChange={(e) =>
                                                        setBillValues({ ...billValues, note: e.target.value })
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="lg:col-span-5 col-span-12">
                                <div className="order-info">
                                    <div className="inner bg-[#f6f6f6] border border-[#bfbfbf] p-[40px_45px_50px]">
                                        <h2 className="title text-[18px] mb-[20px] font-medium">Your order</h2>
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-[18px] bg-[#f4f5f7]">
                                                <tr>
                                                    <th scope="col" className="font-normal py-3">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="font-normal py-3 text-right">
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="border-t border-[#cdcdcd] text-[14px] leading-[20px]">
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-normal whitespace-nowrap">
                                                        Art Deco Home X14
                                                    </th>
                                                    <td className="py-[15px] text-right">$30.00</td>
                                                </tr>
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-normal whitespace-nowrap">
                                                        Animi Dolor Pariatur X5
                                                    </th>
                                                    <td className="py-[15px] text-right">$10.00</td>
                                                </tr>
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-normal whitespace-nowrap">
                                                        Dark Green Jug X1
                                                    </th>
                                                    <td className="py-[15px] text-right">$19.00</td>
                                                </tr>
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-normal whitespace-nowrap">
                                                        Drinking Glasses X1
                                                    </th>
                                                    <td className="py-[15px] text-right">$21.00</td>
                                                </tr>
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-normal whitespace-nowrap">
                                                        Helen Chair X1
                                                    </th>
                                                    <td className="py-[15px] text-right">$92.00</td>
                                                </tr>
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-bold whitespace-nowrap">
                                                        Subtotal
                                                    </th>
                                                    <td className="py-[15px] text-right">$602.00</td>
                                                </tr>
                                                <tr className="border-t border-[#cdcdcd]">
                                                    <th scope="row" className="py-[15px] font-bold whitespace-nowrap">
                                                        Total
                                                    </th>
                                                    <td className="py-[15px] text-right">$602.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="check pt-[30px] border-t border-[#cdcdcd]">
                                            <div className="payment-info pb-[20px]">
                                                <h2 className="text-[18px] mb-[10px]">Check payments</h2>
                                                <p>
                                                    Please send a check to Store Name, Store Street, Store Town, Store
                                                    State / County, Store Postcode.
                                                </p>
                                            </div>
                                            <div className="payment-info">
                                                <h2 className="text-[18px] mb-[10px]">What is PayPal?</h2>
                                                <p>
                                                    Pay via PayPal; you can pay with your credit card if you don’t have
                                                    a PayPal account.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="pt-[35px]">
                                        Your personal data will be used to process your order, support your experience
                                        throughout this website, and for other purposes described in our
                                        <Link className="ml-[5px] font-medium" to={routes.home}>
                                            privacy policy.
                                        </Link>
                                    </p>
                                    <div className="payment-btn-wrap pt-[35px]">
                                        <Button
                                            primary
                                            className="w-full justify-center px-[42px] h-[46px] leading-[44px]"
                                            type="submit"
                                        >
                                            Place Order
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Checkout;
