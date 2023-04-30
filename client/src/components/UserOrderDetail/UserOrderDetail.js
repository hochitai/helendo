import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './UserOrderDetail.module.scss';
import UserOrderDetailItem from './UserOrderDetailItem';

const cx = classNames.bind(styles);

function UserOrderDetail({ data, action }) {
    const [isShowDetail, setIsShowDetail] = useState(false);

    return (
        <>
            <tr className={cx('transition-all bg-white', { 'bg-gray-200': isShowDetail })}>
                <td className="py-6 text-center">
                    <span
                        className={cx(
                            'text-[14px] py-3 px-5 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all',
                        )}
                        onClick={() => setIsShowDetail(!isShowDetail)}
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className={cx('transition-all', {
                                'rotate-90': isShowDetail,
                            })}
                        />
                    </span>
                </td>
                <td className="py-6">#{data._id.slice(0, 8)}</td>
                <td className="py-6">{format(new Date(data.createdAt), 'dd/MM/yyyy')}</td>
                <td className="py-6">{data.billDetail.length}</td>
                <td className="py-6">${data.total.toFixed(2)}</td>
                <td className="py-6">
                    <span
                        className={cx('py-3 px-4 rounded-full font-medium', {
                            'bg-green-200 text-green-600': data.state === 'Complete',
                            'bg-yellow-200 text-yellow-600': data.state === 'Waiting to accept',
                            'bg-red-200 text-red-600': data.state === 'Cancel',
                            'bg-blue-200 text-blue-600': data.state === 'Shipping',
                        })}
                    >
                        {data.state}
                    </span>
                </td>
                <td className="py-6 text-center">
                    {action && (data.state === 'Complete' || data.state === 'Cancel') ? (
                        ''
                    ) : (
                        <Fragment>
                            <button
                                className="text-[16px] text-white bg-primary w-[80px] py-3 px-4 rounded-lg hover:opacity-80"
                                onClick={(e) => action(e, data._id, data.state, false)}
                            >
                                Accept
                            </button>
                            {data.state === 'Waiting to accept' && (
                                <button
                                    className="ml-4 border border-solid border-gray-300 hover:bg-gray-100 transition-all px-5 py-3 rounded-lg min-w-fit"
                                    onClick={(e) => action(e, data._id, data.state, true)}
                                >
                                    Cancel
                                </button>
                            )}
                        </Fragment>
                    )}
                </td>
            </tr>

            <tr
                className={cx('scale-0 origin-top transition-all', {
                    'action-scale-in': isShowDetail,
                    hidden: !isShowDetail,
                })}
            >
                <td colSpan={7} className="px-6 pt-8">
                    <table className="border border-gray-200 w-full rounded-t-2xl">
                        <thead className="px-6 text-gray-400 text-left bg-gray-100 rounded-2xl overflow-hidden">
                            <tr className="">
                                <th className="py-6 pl-6 w-[220px]">Shipping address</th>
                                <th className="py-6 w-[160px]">Billing address</th>
                                <th className="py-6 w-[200px]">Shipping method</th>
                                <th className="py-6 text-center">Payment method</th>
                                <th className="py-6 text-center">Tracking number</th>
                                <th className="py-6 w-[200px] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-6 ">
                                    <p>{data.address}</p>
                                    <p>{data.phone}</p>
                                </td>
                                <td className="py-6 ">Same as shipping address</td>
                                <td className="py-6 ">Express delivery (DHL Express)</td>
                                <td className="py-6 text-center">VISA xxxx 5642</td>
                                <td className="py-6 underline text-center">ID25725728RS</td>
                                <td className="py-6 text-center">
                                    <button className="border border-solid border-gray-300 hover:bg-gray-100 transition-all px-5 py-3 rounded-lg min-w-fit">
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr
                className={cx('scale-0 origin-top transition-all', {
                    'action-scale-in-items': isShowDetail,
                    hidden: !isShowDetail,
                })}
            >
                <td colSpan={7} className="px-6 py-8">
                    <table className="border border-gray-200 w-full rounded-t-2xl">
                        <thead className="px-6 text-gray-400 text-left bg-gray-100 rounded-2xl overflow-hidden">
                            <tr className="">
                                <th className="py-6 pl-6 w-[400px]">Product</th>
                                <th className="py-6">Quantity</th>
                                <th className="py-6 ">Price</th>
                                <th className="py-6 ">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.billDetail.map((item) => (
                                <UserOrderDetailItem key={item._id} data={item} />
                            ))}
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    );
}

export default UserOrderDetail;
