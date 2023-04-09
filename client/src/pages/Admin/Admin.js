import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import { OrderAdmin } from './Order';

const cx = classNames.bind(styles);

function Admin() {
    return <OrderAdmin />;
}
export default Admin;
