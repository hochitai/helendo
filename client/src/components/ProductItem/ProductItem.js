import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { QuickViewContext } from '~/pages/Home/Home';
import config from '~/config';
import { HeartIcon, MiniCartIcon, PlusIcon } from '../Icons';
import styles from './ProductItem.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function ProductItem({ data = {}, handleAddToCart }) {
    const handleShowQuickView = useContext(QuickViewContext);

    return (
        <div className={cx('wrapper', 'relative')}>
            <div
                className={cx(
                    'img',
                    'relative group after:bg-[rgba(0,0,0,.1)] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:opacity-0 after:transition-all after:pointer-events-none hover:after:opacity-100',
                )}
            >
                <Link to={config.routes.products + '/' + data.slug} className="z-[5]">
                    {data.saleID && (
                        <Fragment>
                            <span className="bg-[#f14705] text-[14px] text-white block rounded-full absolute top-[15px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]">
                                Sale
                            </span>
                            <span className="bg-[#98d8ca] text-[14px] text-white block rounded-full absolute top-[70px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]">
                                -10%
                            </span>
                        </Fragment>
                    )}
                    {data.quantity <= 0 && (
                        <span className="bg-black text-white block leading-[28px] absolute top-[15px] right-[15px] px-[15px] z-[1]">
                            Out of Stock
                        </span>
                    )}
                    <img src={data.image} alt="Product" className="w-full " />
                </Link>
                <div className="flex justify-center absolute w-full top-1/2 left-auto transform -translate-y-1/2 z-[1]">
                    <Button
                        text
                        className={cx(
                            'bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] hover:text-primary transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mr-[15px] group-hover:delay-[0s] ',
                            { 'bg-slate-100': data.quantity === 0 },
                        )}
                        onClick={() => {
                            if (handleShowQuickView) return handleShowQuickView(data);
                            return handleAddToCart(
                                data._id,
                                data.name,
                                1,
                                data.price,
                                data.image,
                                data.saleID,
                                data.slug,
                                data.quantity,
                            );
                        }}
                        disabled={data.quantity === 0}
                    >
                        <PlusIcon width="2.1rem" height="2.1rem" />
                    </Button>
                    <Button
                        text
                        className="bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] hover:text-primary transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mr-[15px] group-hover:delay-[0.15s] "
                    >
                        <MiniCartIcon width="2.1rem" height="2.1rem" />
                    </Button>
                    <Button
                        text
                        className="bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] hover:text-primary transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible mr-[15px] group-hover:delay-[0.3s] "
                    >
                        <HeartIcon width="2.1rem" height="2.1rem" />
                    </Button>
                </div>
            </div>
            <div className="product-content text-center">
                <h3 className="mb-[5px]">
                    <a
                        className="transition-all text-[16px] leading-[4.6rem] font-medium hover:text-primary"
                        href="/products/animi-dolor-pariatur"
                    >
                        {data.name}
                    </a>
                </h3>
                <span className="product-price text-[18px] leading-[31px] text-[#666666]">
                    ${Number(data.price).toFixed(2)}
                </span>
            </div>
        </div>
    );
}

export default ProductItem;
