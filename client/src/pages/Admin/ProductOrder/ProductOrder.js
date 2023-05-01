import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import request from '~/utils/httpRequest';
import config from '~/config';
import ProductOrderDetail from '~/components/ProductOrderDetail/ProductOrderDetail';
import styles from './ProductOrder.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProductOrder() {
    const [type] = useState('All');
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

    return (
        <div className="wrapper px-16">
            <div className="flex justify-between items-center">
                <h1>Product Orders</h1>
                <Link
                    className="bg-blue-500 text-white hover:opacity-80 py-4 px-6 rounded-full"
                    to={config.routes.productOrderEditAdmin}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">Create</span>
                </Link>
            </div>
            <table className="border border-gray-200 w-full rounded-t-2xl">
                <thead className="text-gray-400 text-left bg-gray-100 rounded-2xl overflow-hidden">
                    <tr>
                        <th className="py-6 w-[80px]"></th>
                        <th className="py-6 w-[180px]">ID</th>
                        <th className="py-6 w-[180px]">Date</th>
                        <th className="py-6 w-[120px]">Items</th>
                        <th className="py-6 w-[200px]">Total amound</th>
                        <th className="py-6 w-[200px]">Name</th>
                        <th className="py-6 text-center">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((bill) => <ProductOrderDetail key={bill._id} data={bill} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ProductOrder;
