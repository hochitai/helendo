import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useState } from 'react';
import request from '~/utils/httpRequest';
import config from '~/config';
import { format } from 'date-fns';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    const navigate = useNavigate();
    const [type, setType] = useState('All');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getBills(type);
    }, [type]);

    const getBills = async (type) => {
        switch (type) {
            case 'All':
                await request
                    .get(config.apis.getAllBill)
                    .then((result) => {
                        setOrders(result.data);
                    })
                    .catch((error) => console.log(error));
                break;
            case 'Waiting to accept':
            case 'Shipping':
            case 'Complete':
            case 'Cancel':
                await request
                    .get(config.apis.getBillByState, {
                        params: {
                            state: type,
                        },
                    })
                    .then((result) => {
                        setOrders(result.data);
                    })
                    .catch((error) => console.log(error));
                break;
            default:
                break;
        }
    };

    const showDetail = (id, customerID) => {
        navigate(config.routes.orderDetailAdmin + '?id=' + id + '&customerID=' + customerID);
    };

    const handleChangeBillState = async (e, billID, state, isCancel) => {
        e.preventDefault();
        e.stopPropagation();
        if (state === 'Waiting to accept') {
            console.log('waiting');
            if (isCancel) {
                await request.post(config.apis.changeBillState, {
                    billID,
                    state: 'Cancel',
                });
            } else {
                await request.post(config.apis.changeBillState, {
                    billID,
                    state: 'Shipping',
                });
            }
        } else if (state === 'Shipping') {
            console.log('shipping');
            await request.post(config.apis.changeBillState, {
                billID,
                state: 'Complete',
            });
        }
        getBills(type);
    };

    return (
        <div className="wrapper">
            <h1>Order</h1>
            <div className="tab flex">
                <div
                    className={cx('tab-item border px-6 py-2 mr-4 rounded-tl-3xl rounded-br-3xl select-none', {
                        'bg-primary text-white pointer-events-none': type === 'All',
                        'cursor-pointer': type !== 'All',
                    })}
                    onClick={() => setType('All')}
                >
                    All
                </div>
                <div
                    className={cx('tab-item border px-6 py-2 mr-4 rounded-tl-3xl rounded-br-3xl select-none', {
                        'bg-primary text-white pointer-events-none': type === 'Waiting to accept',
                        'cursor-pointer': type !== 'Waiting to accept',
                    })}
                    onClick={() => setType('Waiting to accept')}
                >
                    Waiting to accept
                </div>
                <div
                    className={cx('tab-item border px-6 py-2 mr-4 rounded-tl-3xl rounded-br-3xl select-none', {
                        'bg-primary text-white pointer-events-none': type === 'Shipping',
                        'cursor-pointer': type !== 'Shipping',
                    })}
                    onClick={() => setType('Shipping')}
                >
                    Shipping
                </div>
                <div
                    className={cx('tab-item border px-6 py-2 mr-4 rounded-tl-3xl rounded-br-3xl select-none', {
                        'bg-primary text-white pointer-events-none': type === 'Complete',
                        'cursor-pointer': type !== 'Complete',
                    })}
                    onClick={() => setType('Complete')}
                >
                    Complete
                </div>
                <div
                    className={cx('tab-item border px-6 py-2 mr-4 rounded-tl-3xl rounded-br-3xl select-none', {
                        'bg-primary text-white pointer-events-none': type === 'Cancel',
                        'cursor-pointer': type !== 'Cancel',
                    })}
                    onClick={() => setType('Cancel')}
                >
                    Cancel
                </div>
            </div>
            <table className="cart-table w-full text-sm text-left mt-5">
                <thead className="text-[18px] bg-[#f4f5f7]">
                    <tr>
                        <th className="font-medium py-5 pl-4 w-1/5">ID</th>
                        <th className="font-medium py-5 ">Date</th>
                        <th className="font-medium py-5 w-1/5">CustomerID</th>
                        <th className="font-medium py-5 w-[300px]">State</th>
                        <th className="font-medium py-5 ">Total</th>
                        <th className="font-medium py-5 w-[120px] "></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr
                            className="cursor-pointer hover:bg-slate-50"
                            key={order._id}
                            onClick={() => showDetail(order._id, order.customerID)}
                        >
                            <td className="py-10 text-[16px]">{order._id}</td>
                            <td className="py-10 text-[16px]"> {format(new Date(order.createdAt), 'dd/MM/yyyy')}</td>
                            <td className="py-10 text-[16px]">{order.customerID}</td>

                            <td className="py-10 text-[16px] flex items-center">
                                <span
                                    className={cx('w-[10px] h-[10px] rounded-full', {
                                        'bg-orange-400': order.state === 'Waiting to accept',
                                        'bg-yellow-300': order.state === 'Shipping',
                                        'bg-green-400': order.state === 'Complete',
                                        'bg-gray-400': order.state === 'Cancel',
                                    })}
                                ></span>
                                <span className="ml-4">{order.state}</span>
                            </td>
                            <td className="py-10 text-[16px] ">${order.total}</td>
                            <td className="font-medium flex justify-center">
                                {order.state === 'Complete' || order.state === 'Cancel' ? (
                                    ''
                                ) : (
                                    <Fragment>
                                        <button
                                            className="text-[16px] text-white bg-primary w-[80px] py-2 px-4 rounded-full"
                                            onClick={(e) => handleChangeBillState(e, order._id, order.state, false)}
                                        >
                                            Accept
                                        </button>
                                        {order.state === 'Waiting to accept' && (
                                            <button
                                                className="text-[20px] text-red-500 w-[20px] mx-4"
                                                onClick={(e) => handleChangeBillState(e, order._id, order.state, true)}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        )}
                                    </Fragment>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;
