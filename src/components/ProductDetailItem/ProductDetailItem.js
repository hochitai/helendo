import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import Button from '~/components/Button';
import { HeartIcon, MinusIcon, PlusIcon } from '~/components/Icons';
import styles from './ProductDetailItem.module.scss';
import MoreInfomation from './MoreInfomation';

const cx = classNames.bind(styles);

function ProductDetailItem({ title }) {
    const [count, setCount] = useState(1);

    const handleDecrease = () => {
        if (count > 1) setCount(count - 1);
    };
    const handleIncrease = () => {
        setCount(count + 1);
    };

    const handleChanged = (e) => {
        const newCount = e.target.value;
        var regex = /^[0-9]+$/;
        if (newCount.match(regex)) {
            setCount(parseInt(newCount));
        }
    };

    return (
        <Fragment>
            <div className="product-detail border-b border-[#ededed] md:py-[90px] py-[50px]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[25px]">
                        <div className="lg:col-span-6 col-span-12">
                            <div className="product-detail-img relative">
                                <img
                                    className="w-full"
                                    src={images.product1_585x585}
                                    alt="Product"
                                    width="585"
                                    height="585"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="product-detail-content">
                                <h3 className="mb-[10px] font-medium capitalize">{title}</h3>
                                <span className="product-price text-[30px] leading-[42px] text-[#999999] mb-[25px]">
                                    $10.00
                                </span>
                                <p className="text-[14px] leading-[24px] lg:max-w-[450px]">
                                    At vero accusamus et iusto odio dignissimos blanditiis praesentiums dolores molest.
                                </p>
                            </div>
                            <div className="flex py-[30px]">
                                <div className="relative inline-flex border border-[#dddddd] mr-[15px] ">
                                    <div className="flex justify-center w-[120px]">
                                        <button className="cursor-pointer translate-x-3/4" onClick={handleDecrease}>
                                            <MinusIcon width="1.6rem" height="1.6rem" />
                                        </button>
                                        <input
                                            className="qty-input outline-none text-center w-[100px] px-[15px] h-[46px] leading-[40px]"
                                            value={count}
                                            onChange={handleChanged}
                                            onBlur={() => console.log('hello')}
                                        />
                                        <button className="cursor-pointer -translate-x-3/4" onClick={handleIncrease}>
                                            <PlusIcon width="1.6rem" height="1.6rem" />
                                        </button>
                                    </div>
                                </div>
                                <Button primary className="mr-[15px] w-[162px] h-[46px] justify-center">
                                    Add to cart
                                </Button>
                                <button className="border border-[#dddddd] border-solid text-[20px] w-[46px] h-[46px] leading-[46px] inline-flex justify-center items-center transition-all hover:text-primary ">
                                    <HeartIcon width="2rem" height="2rem" />
                                </button>
                            </div>
                            <div className="other-info">
                                <div className="sku-wrap font-medium">
                                    <span>SKU:</span>
                                    <span className="text-[#666666] ml-[5px]">500</span>
                                </div>
                                <div className="category-wrap font-medium">
                                    <span>Categories:</span>
                                    <span className="text-[#666666] ml-[5px]">accessory</span>
                                </div>
                                <div className="category-wrap font-medium">
                                    <span>Tags:</span>
                                    <span className="text-[#666666] ml-[5px]">accessories</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MoreInfomation />
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetailItem;
