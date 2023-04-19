import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './UserOrderDetail.module.scss';
import UserOrderDetailItem from './UserOrderDetailItem';
import { Fragment, useState } from 'react';

const cx = classNames.bind(styles);

function UserOrderDetail({ data }) {
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
                <td className="py-6">#112234</td>
                <td className="py-6">09/11/2022</td>
                <td className="py-6">3</td>
                <td className="py-6">$752.12</td>
                <td className="py-6">
                    <span className="py-3 px-4 rounded-full bg-green-200 text-green-600 font-medium">Shipped</span>
                </td>
                <td className="py-6 text-center">
                    <button className="border border-solid border-gray-300 hover:bg-gray-100 transition-all px-5 py-3 rounded-lg min-w-fit">
                        Cancel
                    </button>
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
                                <td className="p-6 ">12 phuong a tp ho chi minh viet nam</td>
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
                            <UserOrderDetailItem />
                            <UserOrderDetailItem />
                            <UserOrderDetailItem />
                            <UserOrderDetailItem />
                            {/* <tr>
                                    <td className="p-6 flex ">
                                        <Link className="product-img w-[100px]" to={config.routes.products}>
                                            <img
                                                src={images.product1}
                                                alt="Art Deco Home"
                                                className="w-[74px] h-[74px] rounded-lg"
                                            />
                                        </Link>
                                        <Link
                                            className="flex flex-col justify-between group py-2"
                                            to={config.routes.products}
                                        >
                                            {' '}
                                            <h2 className="product-name text-[18px] transition-all group-hover:text-primary">
                                                Art Deco Home
                                            </h2>
                                            <h2 className="product-name text-[14px] text-gray-400">#134567</h2>
                                        </Link>
                                    </td>
                                    <td className="py-6 ">1</td>
                                    <td className="py-6 ">$120.00</td>
                                    <td className="py-6">$120.00</td>
                                </tr> */}
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    );
}

export default UserOrderDetail;
