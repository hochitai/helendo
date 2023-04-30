import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import request from '~/utils/httpRequest';
import config from '~/config';
import UserOrderDetail from '~/components/UserOrderDetail/UserOrderDetail';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
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
        <div className="wrapper px-16">
            <h1>Order</h1>
            <div className="tab flex mb-4">
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
                    {orders.length > 0 &&
                        orders.map((bill) => (
                            <UserOrderDetail key={bill._id} data={bill} action={handleChangeBillState} />
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;
