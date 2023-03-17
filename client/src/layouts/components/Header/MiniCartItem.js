import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import { ExitIcon } from '~/components/Icons';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function MiniCartItem({ data, onOpenDialog }) {
    return (
        <div className={cx('minicart-item', 'flex relative border-b border-[#dddddd] pb-[25px]')}>
            <Link to={config.routes.products + '/' + data.slug}>
                <img src={data.image} alt="Product" className="w-[74px] h-[74px] object-cover" />
            </Link>
            <div className={cx('content', 'pl-[20px]')}>
                <h3 className="leading-[21px]">
                    <Link
                        to={config.routes.products + '/' + data.slug}
                        className="hover:text-primary transition-all font-medium"
                    >
                        {data.name}
                    </Link>
                    <div className="font-medium text-[15px] leading-[26px]">
                        Qty : <span className="text-[#666666]">{data.quantity}</span>
                    </div>
                    <div className="font-medium text-[13px] leading-[23px]">
                        Price: <span className="text-[#666666]">${data.price}</span>{' '}
                    </div>
                </h3>
            </div>
            <button className="absolute top-0 right-0" onClick={() => onOpenDialog(data.id)}>
                <ExitIcon width="1.6rem" height="1.6rem" />
            </button>
        </div>
    );
}

export default MiniCartItem;
