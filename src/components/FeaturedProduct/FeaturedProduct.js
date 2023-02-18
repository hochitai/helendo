import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import Button from '~/components/Button';
import styles from './FeaturedProduct.module.scss';
import { ArrowRightIcon } from '../Icons';

const cx = classNames.bind(styles);

function FeaturedProduct({ type = 'leftImg', img, name, desc, price }) {
    return (
        <div className={cx('wrapper', 'flex justify-between items-center mx-auto xl:pt-[120px] lg:pt-[100px]')}>
            <Link
                to={routes.products}
                className={cx('block transition-all duration-500 hover:scale-[1.05] w-3/6', {
                    'order-first': type === 'leftImg',
                    'order-last': type === 'rightImg',
                })}
            >
                <img src={img} alt="Featured Product" />
            </Link>
            <div className={cx('content', 'w-3/6')}>
                <span className="text-[14px] leading-5 font-medium uppercase block mb-[5px] text-[#999999]">
                    Featured Product
                </span>
                <h2 className={cx('featured-product-title', 'relative pb-[10px] mb-[30px] ')}>
                    <Link to={routes.products} className="transition-all hover:text-primary text-[36px] ">
                        {name}
                    </Link>
                </h2>
                <p className="pr-32 text-justify">{desc}</p>
                <div className="mt-[60px] ">
                    <Button second small rightIcon={<ArrowRightIcon />}>
                        Only ${price}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProduct;
