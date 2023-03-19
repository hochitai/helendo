import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { HeartIcon, MinusIcon, PlusIcon } from '~/components/Icons';
import styles from './ProductDetailItem.module.scss';
import MoreInfomation from './MoreInfomation';
import request from '~/utils/httpRequest';
import config from '~/config';

const cx = classNames.bind(styles);

function ProductDetailItem({ data }) {
    const [count, setCount] = useState(1);
    const [types, setTypes] = useState({});

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

    useEffect(() => {
        let typeData = {};
        const getTypes = async () => {
            await request
                .get(config.apis.searchCate, {
                    params: {
                        id: data.categoryID,
                    },
                })
                .then((res) => {
                    typeData = { ...typeData, cateName: res.data.name };
                });
            await request
                .get(config.apis.searchTag, {
                    params: {
                        id: data.tagID,
                    },
                })
                .then((res) => {
                    typeData = { ...typeData, tagName: res.data.name };
                });
            setTypes(typeData);
        };
        if (Object.keys(data).length !== 0) {
            getTypes();
        }
    }, [data]);

    console.log(types);

    return (
        <Fragment>
            <div className={cx('product-detail border-b border-[#ededed] md:py-[90px] py-[50px]')}>
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[25px]">
                        <div className="lg:col-span-6 col-span-12">
                            <div className="product-detail-img relative">
                                <img className="w-full" src={data.image} alt="Product" width="585" height="585" />
                            </div>
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="product-detail-content">
                                <h3 className="mb-[10px] font-medium capitalize text-[30px]">{data.name}</h3>
                                <span className="product-price text-[30px] leading-[42px] text-[#999999] mb-[25px]">
                                    ${Number(data.price).toFixed(2)}
                                </span>
                                <p className="text-[14px] leading-[24px] lg:max-w-[450px]">{data.feeling}</p>
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
                                <Button
                                    primary
                                    className="mr-[15px] w-[162px] h-[46px] justify-center"
                                    disabled={data.quantity <= 0}
                                >
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
                                    <span className="text-[#666666] ml-[5px]">{types.cateName}</span>
                                </div>
                                <div className="category-wrap font-medium">
                                    <span>Tags:</span>
                                    <span className="text-[#666666] ml-[5px]">{types.tagName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MoreInfomation
                        description={data.description}
                        features={String(data.features).split(';')}
                        weight={data.weight}
                        dimensions={data.dimensions}
                        name={data.name}
                        image={data.image}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetailItem;
