import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Customer.module.scss';
import request from '~/utils/httpRequest';
import config from '~/config';

const cx = classNames.bind(styles);

function Login() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        request
            .get(config.apis.getAllCustomer)
            .then((res) => {
                setCustomers(res.data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <h1>Customer</h1>
            </div>
            <table className="cart-table w-full text-sm text-left my-8">
                <thead className="text-[18px] bg-[#f4f5f7]">
                    <tr>
                        <th scope="col" className="font-medium product-name py-5 pl-[20px] min-w-[200px]">
                            Id
                        </th>
                        <th scope="col" className="font-medium product-name py-5  min-w-[200px]">
                            Customer
                        </th>
                        <th scope="col" className="font-medium product-price py-5">
                            Username
                        </th>
                        <th scope="col" className="font-medium py-5 min-w-[200px]">
                            Address
                        </th>
                        <th scope="col" className="font-medium  py-5 ">
                            Phone
                        </th>
                        <th scope="col" className="font-medium text-center py-5 min-w-[100px]">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 &&
                        customers.map((item) => (
                            <tr
                                key={item._id}
                                className={cx('bg-white border-b dark:bg-gray-800 dark:border-gray-700')}
                            >
                                <td className="py-[16px] text-[16px]">{item._id}</td>
                                <td className="py-[16px] product-name pr-[25px] flex items-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <div className="product-img w-[100px]">
                                        <img src={item.avatar} alt="Art Deco Home" className="w-[74px] h-[74px]" />
                                    </div>
                                    <h2 className="product-name select-none">
                                        <div className="text-[18px] transition-all hover:text-primary ">
                                            {item.name}
                                        </div>
                                    </h2>
                                </td>
                                <td className="py-[16px] text-[16px]">{item.userName}</td>
                                <td className="py-[16px] text-[16px]">{item.address}</td>
                                <td className="py-[16px] text-[16px] ">{item.phone}</td>
                                <td className="py-[16px] text-[16px] text-center"></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Login;
