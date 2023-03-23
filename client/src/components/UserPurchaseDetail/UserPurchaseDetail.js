import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import request from '~/utils/httpRequest';
import styles from './UserPurchaseDetail.module.scss';
import { Fragment, useEffect, useState } from 'react';
import config from '~/config';

const cx = classNames.bind(styles);

function UserPurchaseDetail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [billDetail, setBillDetail] = useState({});

    useEffect(() => {
        const id = searchParams.get('id');
        request
            .get(config.apis.getBill + '/' + id)
            .then((result) => setBillDetail(result.data))
            .catch((error) => console.log(error));
    }, [searchParams]);

    console.log(billDetail);

    return (
        <div>
            {Object.keys(billDetail).length > 0 && (
                <Fragment>
                    <div className="mt-8">
                        <h1 className="text-center">
                            <b>Infomation</b>
                        </h1>
                        <h3 className="mt-4">
                            <b>BillID:</b> {billDetail.billInfo._id}
                        </h3>
                        <h3 className="mt-4">
                            <b>Date:</b> {format(new Date(billDetail.billInfo.createdAt), 'dd/MM/yyyy')}
                        </h3>
                        <h3 className="mt-4">
                            <b>Name:</b> {billDetail.billInfo.name}
                        </h3>
                        <h3 className="mt-4">
                            <b>Address:</b> {billDetail.billInfo.address}
                        </h3>
                        <h3 className="mt-4">
                            <b>Phone:</b> {billDetail.billInfo.phone}
                        </h3>
                        <h3 className="mt-4">
                            <b>Total:</b> ${billDetail.billInfo.total}
                        </h3>
                    </div>
                    <table className="cart-table w-full text-sm text-left my-8">
                        <thead className="text-[18px] bg-[#f4f5f7]">
                            <tr>
                                <th
                                    scope="col"
                                    className="font-medium product-name py-5 first:pl-[100px] min-w-[370px]"
                                >
                                    Product
                                </th>
                                <th
                                    scope="col"
                                    className="font-medium product-price py-5 first:pl-[100px] min-w-[130px]"
                                >
                                    Price
                                </th>
                                <th scope="col" className="font-medium py-5 first:pl-[100px]">
                                    Quantity
                                </th>
                                <th scope="col" className="font-medium py-5 first:pl-[100px]">
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="font-medium py-5 first:pl-[100px] absolute overflow-hidden whitespace-nowrap w-[1px] h-[1px]"
                                >
                                    Item Remove
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {billDetail.data &&
                                billDetail.data.map((item) => (
                                    <tr
                                        key={item._id}
                                        className={cx('bg-white border-b dark:bg-gray-800 dark:border-gray-700')}
                                    >
                                        <td className="py-[16px] product-name pr-[25px] flex items-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            <Link className="product-img w-[100px]" to="/products/art-deco-home">
                                                <img
                                                    src={item.product[0].image}
                                                    alt="Art Deco Home"
                                                    className="w-[74px] h-[74px]"
                                                />
                                            </Link>
                                            <h2 className="product-name">
                                                <Link
                                                    className="text-[18px] transition-all hover:text-primary"
                                                    to="/products/art-deco-home"
                                                >
                                                    {item.product[0].name}
                                                </Link>
                                            </h2>
                                        </td>
                                        <td className="py-[16px] text-[16px]">${item.price.toFixed(2)}</td>
                                        <td className="py-[16px] text-[16px]">{item.quantity}</td>
                                        <td className="py-[16px] text-[16px]">${item.subTotal}</td>
                                        <td className="py-[16px] text-[16px] text-right"></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Fragment>
            )}
        </div>
    );
}

export default UserPurchaseDetail;
