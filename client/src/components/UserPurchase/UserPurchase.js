import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

import config from '~/config';
import request from '~/utils/httpRequest';
import UserOrderDetail from '../UserOrderDetail/UserOrderDetail';
import styles from './UserPurchase.module.scss';

const cx = classNames.bind(styles);

function UserPurchase() {
    const cookies = new Cookies();
    const [listBill, setListBill] = useState([]);

    useEffect(() => {
        request
            .get(config.apis.getBill)
            .then((res) => {
                setListBill(res.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    cookies.set('token', error.response.data.token);
                } else if (error.response.status === 403) {
                    cookies.remove('refreshToken');
                    cookies.remove('token');
                    cookies.remove('info');
                    cookies.remove('resource');
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('border p-[30px] rounded-2xl')}>
            <div className="mb-[40px]">
                <h2 className="text-[24px] font-medium">Order history</h2>
                <h3 className="text-[18px] text-gray-400">Here you can manage your order</h3>
            </div>
            {/* <div className="flex items-center justify-between mb-8">
                <div className="flex border flex-1 py-5 px-8 rounded-lg bg-gray-100 outline-none">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    <input
                        type="text"
                        className="flex-1 mx-4 bg-gray-100 "
                        placeholder="Search for Order ID"
                    
                    />
                </div>
                <div className="border py-4 px-6 ml-6 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faSliders} className="mr-2" />
                    Filter
                </div>
            </div> */}
            <table className="border border-gray-200 w-full rounded-t-2xl">
                <thead className="text-gray-400 text-left bg-gray-100 rounded-2xl overflow-hidden">
                    <tr>
                        <th className="py-6 w-[80px]"></th>
                        <th className="py-6 w-[180px]">OrderID</th>
                        <th className="py-6 w-[180px]">Date</th>
                        <th className="py-6 w-[120px]">Items</th>
                        <th className="py-6 w-[200px]">Total amound</th>
                        <th className="py-6 w-[200px]">Status</th>
                        <th className="py-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listBill.length > 0 && listBill.map((bill) => <UserOrderDetail key={bill._id} data={bill} />)}
                </tbody>
            </table>
        </div>
    );
}

export default UserPurchase;
