import { useSearchParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import request from '~/utils/httpRequest';
import styles from './OrderDetail.module.scss';
import { Fragment, useEffect, useState } from 'react';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function OrderDetail() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [billDetail, setBillDetail] = useState({});

    useEffect(() => {
        const id = searchParams.get('id');
        const customerID = searchParams.get('customerID');
        request
            .get(config.apis.getBill + '/' + customerID + '/' + id)
            .then((result) => setBillDetail(result.data))
            .catch((error) => console.log(error));
    }, [searchParams]);

    return (
        <div>
            {Object.keys(billDetail).length > 0 && (
                <Fragment>
                    <div className="mt-8">
                        <div className="flex items-center mb-10">
                            <button className="text-[20px] mr-10" onClick={() => navigate(-1)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <div className="title text-5xl font-medium ">Order Detai</div>
                            <div className="text-primary ml-8">{billDetail.billInfo._id}</div>
                        </div>
                        <div className="flex">
                            <div className="mr-40">
                                <div className="flex mt-4 text-[18px]">
                                    <strong className="mr-4">Name:</strong>
                                    {billDetail.billInfo.name}
                                </div>
                                <div className="flex mt-4 text-[18px]">
                                    <strong className="mr-4">Address:</strong>
                                    {billDetail.billInfo.address}
                                </div>
                                <div className="flex mt-4 text-[18px]">
                                    <strong className="mr-4">Phone:</strong>
                                    {billDetail.billInfo.phone}
                                </div>
                            </div>
                            <div>
                                <div className="flex mt-4 text-[18px]">
                                    <strong className="mr-4">Date:</strong>
                                    {format(new Date(billDetail.billInfo.createdAt), 'dd/MM/yyyy')}
                                </div>
                                <div className="flex mt-4 text-[18px]">
                                    <strong className="mr-4">Total:</strong>${billDetail.billInfo.total}
                                </div>
                                <div className="flex mt-4 text-[18px]">
                                    <strong className="mr-4">State:</strong>
                                    <span
                                        className={cx({
                                            'text-orange-400': billDetail.billInfo.state === 'Waiting to accept',
                                            'text-yellow-300': billDetail.billInfo.state === 'Shipping',
                                            'text-green-400': billDetail.billInfo.state === 'Complete',
                                            'text-gray-400': billDetail.billInfo.state === 'Cancel',
                                        })}
                                    >
                                        {billDetail.billInfo.state}
                                    </span>
                                </div>
                            </div>
                        </div>
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
                                            <div className="product-img w-[100px]">
                                                <img
                                                    src={item.product[0].image}
                                                    alt="Art Deco Home"
                                                    className="w-[74px] h-[74px]"
                                                />
                                            </div>
                                            <h2 className="product-name select-none">
                                                <div className="text-[18px] transition-all hover:text-primary ">
                                                    {item.product[0].name}
                                                </div>
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

export default OrderDetail;
