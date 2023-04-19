import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import config from '~/config';
import request from '~/utils/httpRequest';
import styles from './UserPurchase.module.scss';
import UserOrderDetail from '../UserOrderDetail/UserOrderDetail';

const cx = classNames.bind(styles);

function UserPurchase() {
    const [listBill, setListBill] = useState([]);

    useEffect(() => {
        request
            .get(config.apis.getBill)
            .then((result) => {
                setListBill(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="border p-[30px] rounded-2xl">
            <div className="mb-[40px]">
                <h2 className="text-[24px] font-medium">Order history</h2>
                <h3 className="text-[18px] text-gray-400">Here you can manage your order</h3>
            </div>
            <table className="border border-gray-200 w-full rounded-t-2xl">
                <thead className="text-gray-400 text-left bg-gray-100 rounded-2xl overflow-hidden">
                    <tr>
                        <th className="py-6 w-[80px]"></th>
                        <th className="py-6 w-[140px]">OrderID</th>
                        <th className="py-6 w-[140px]">Date</th>
                        <th className="py-6 w-[100px]">Items</th>
                        <th className="py-6 w-[200px]">Total amound</th>
                        <th className="py-6 w-[200px]">Status</th>
                        <th className="py-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <UserOrderDetail />
                    <UserOrderDetail />
                    <UserOrderDetail />
                </tbody>
            </table>
        </div>
    );
}

export default UserPurchase;
