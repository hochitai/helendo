import classNames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPurchase from '~/components/UserPurchase';
import UserPurchaseDetail from '~/components/UserPurchaseDetail';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User() {
    const { info } = useParams();
    let Comp = UserPurchase;

    switch (info) {
        case 'purchase-history':
            Comp = UserPurchase;
            break;
        case 'purchase-detail':
            Comp = UserPurchaseDetail;
            break;
        default: {
            Comp = UserPurchase;
        }
    }

    return <Comp></Comp>;
}
export default User;
