import classNames from 'classnames/bind';
import { useContext } from 'react';
import { QuickViewContext } from '~/pages/Home/Home';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import routes from '~/config/routes';
import { HeartIcon, MiniCartIcon, PlusIcon } from '../Icons';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem() {
    const handleShowQuickView = useContext(QuickViewContext);

    return (
        <div className={cx('wrapper', 'relative')}>
            <div
                className={cx(
                    'img',
                    'relative group after:bg-[rgba(0,0,0,.1)] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:opacity-0 after:transition-all after:pointer-events-none hover:after:opacity-100',
                )}
            >
                <Link to={routes.products} className="z-[5]">
                    <span className="bg-[#f14705] text-[14px] text-white block rounded-full absolute top-[15px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]">
                        Sale
                    </span>
                    <span className="bg-[#98d8ca] text-[14px] text-white block rounded-full absolute top-[70px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]">
                        -10%
                    </span>
                    <span className="bg-black text-white block leading-[28px] absolute top-[15px] right-[15px] px-[15px] z-[1]">
                        Out of Stock
                    </span>
                    <img src={images.product1_300x300} alt="Product" className="w-full " />
                </Link>
                <div className="flex justify-center absolute w-full top-1/2 left-auto transform -translate-y-1/2 z-[1]">
                    <button
                        className="bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] text-primary-hover transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mr-[15px] group-hover:delay-[0s] "
                        onClick={handleShowQuickView}
                    >
                        <PlusIcon width="2.1rem" height="2.1rem" />
                    </button>
                    <button className="bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] text-primary-hover transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mr-[15px] group-hover:delay-[0.15s] ">
                        <MiniCartIcon width="2.1rem" height="2.1rem" />
                    </button>
                    <button className="bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] text-primary-hover transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mr-[15px] group-hover:delay-[0.3s] ">
                        <HeartIcon width="2.1rem" height="2.1rem" />
                    </button>
                </div>
            </div>
            <div className="product-content text-center">
                <h3 className="mb-[5px]">
                    <a
                        className="transition-all hover:text-primary text-[16px] leading-[4.6rem] font-medium text-primary-hover"
                        href="/products/animi-dolor-pariatur"
                    >
                        Animi Dolor Pariatur
                    </a>
                </h3>
                <span className="product-price text-[18px] leading-[31px] text-[#666666]">$10.00</span>
            </div>
        </div>
    );
}

export default ProductItem;
