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
                    <th scope="col" className="font-medium product-name py-5">
                        ID
                    </th>
                    <th scope="col" className="font-medium product-price py-5 ">
                        Date
                    </th>
                    <th scope="col" className="font-medium py-5 ">
                        Info
                    </th>
                    <th scope="col" className="font-medium py-5 ">
                        State
                    </th>
                    <th scope="col" className="font-medium py-5 ">
                        Total
                    </th>
                    <th
                        scope="col"
                        className="font-medium py-5  absolute overflow-hidden whitespace-nowrap w-[1px] h-[1px]"
                    ></th>
                </tr>
            </thead>
            <tbody>
                {listBill.map((bill) => (
                    <tr
                        key={bill._id}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => showDetail(bill._id)}
                    >
                        <td className="py-4 text-[16px]">{bill._id}</td>
                        <td className="py-4 text-[16px]">{format(new Date(bill.createdAt), 'dd/MM/yyyy')}</td>
                        <td className="py-4 text-[16px]">
                            <h3 className="py-2">Name: {bill.name}</h3>
                            <h3 className="py-2">Address: {bill.address}</h3>
                            <h3 className="py-2">Phone: {bill.phone}</h3>
                        </td>
                        <td className="py-4 text-[16px]">{bill.state}</td>
                        <td className="py-4 text-[16px]">${bill.total.toFixed(2)}</td>
                        <td className="py-4 text-[24px]">{'>'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserPurchase;
