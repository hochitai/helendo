import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import config from '~/config';
import request from '~/utils/httpRequest';
import styles from './UserPurchase.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function UserPurchase() {
    const [listBill, setListBill] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        request
            .get(config.apis.getBill)
            .then((result) => {
                setListBill(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const showDetail = (id) => {
        navigate(config.routes.user + '/purchase-detail?id=' + id);
    };

    return (
        <table className="cart-table w-full text-sm text-left mt-20">
            <thead className="text-[18px] bg-[#f4f5f7]">
                <tr>
                    <th className="font-medium py-5 pl-4 w-1/5">ID</th>
                    <th className="font-medium py-5 ">Date</th>
                    <th className="font-medium py-5 w-2/5">Address</th>
                    <th className="font-medium py-5 ">State</th>
                    <th className="font-medium py-5 ">Total</th>
                    <th className="font-medium py-5  absolute overflow-hidden whitespace-nowrap w-[1px] h-[1px]"></th>
                </tr>
            </thead>
            <tbody>
                {listBill.map((bill) => (
                    <tr
                        key={bill._id}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => showDetail(bill._id)}
                    >
                        <td className="py-10 text-[16px]">{bill._id}</td>
                        <td className="py-10 text-[16px] text-blue-500">
                            {format(new Date(bill.createdAt), 'dd/MM/yyyy')}
                        </td>
                        <td className="py-10 text-[16px]">{bill.address}</td>
                        <td className="py-10 text-[16px]">{bill.state}</td>
                        <td className="py-10 text-[16px] text-yellow-500">${bill.total.toFixed(2)}</td>
                        <td className="py-10 text-[24px] font-medium">{'>'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserPurchase;
