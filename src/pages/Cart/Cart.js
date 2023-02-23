import { Fragment } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import CartItem from '~/components/CartItem';
import Button from '~/components/Button';
import styles from './Cart.module.scss';
import { ArrowLeftIcon } from '~/components/Icons';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Cart() {
    return (
        <Fragment>
            <Header />
            <Breadcrumb title={'Cart'} />
            <div className={cx('cart border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]')}>
                <div className="container mx-auto">
                    <div className="relative overflow-x-auto">
                        <table className='className="cart-table w-full text-sm text-left'>
                            <thead className="text-[18px] bg-[#f4f5f7]">
                                <tr>
                                    <th
                                        scope="col"
                                        className="font-medium product-name py-5 first:pl-[100px] min-w-[370px]"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="font-medium product-price py-5 first:pl-[100px] min-w-[130px]"
                                    >
                                        Price
                                    </th>
                                    <th scope="col" className="font-medium py-5 first:pl-[100px]">
                                        Quantity
                                    </th>
                                    <th scope="col" className="font-medium py-5 first:pl-[100px]">
                                        Total
                                    </th>
                                    <th
                                        scope="col"
                                        className="font-medium py-5 first:pl-[100px] absolute overflow-hidden whitespace-nowrap w-[1px] h-[1px]"
                                    >
                                        Item Remove
                                    </th>
                                </tr>
                            </thead>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </table>
                    </div>
                    <div className="group-btn flex justify-between pt-[50px]">
                        <Button
                            primary
                            to={routes.products}
                            leftIcon={<ArrowLeftIcon className="mr-[5px]" />}
                            className="h-[46px] sm:px-[42px] px-[12px]"
                        >
                            Continue Shopping
                        </Button>
                        <div className="btn-wrap">
                            <Button second className="h-[46px] sm:px-[42px] px-[12px] border">
                                Clear cart
                            </Button>
                        </div>
                    </div>
                    <div className="cart-info pt-[50px]">
                        <div className="grid grid-cols-12 md:gap-x-[30px] max-lm:gap-y-[30px]">
                            <div className="md:col-span-6 col-span-12">
                                <div className="coupon flex flex-col lg:max-w-[400px]">
                                    <h2 className="title text-[18px] mb-[30px]">Coupon Discount</h2>
                                    <p className="desc mb-[15px]">Enter your coupon code if you have one.</p>
                                    <input
                                        type="text"
                                        name="coupon"
                                        placeholder="Coupon code"
                                        className="border border-[#cccccc] outline-none p-[15px_15px_13px] leading-[28px]"
                                    />
                                    <div className="btn-wrap inline-flex items-center pt-[30px]">
                                        <Button second type="submit" className=" border  h-[46px] px-[42px] ">
                                            Apply coupon
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-6 col-span-12">
                                <div className="cart-subtotal lg:max-w-[400px] ml-auto">
                                    <div className="border border-[#bfbfbf] bg-[#f9f9f9] px-[30px]">
                                        <ul className="content py-[30px]">
                                            <li className="item flex justify-between border-b border-[#cdcdcd] pb-[16px] mb-[17px]">
                                                <span className="font-bold">Subtotal:</span>
                                                <span>$602.00</span>
                                            </li>
                                            <li className="item flex justify-between">
                                                <span className="font-bold">Total:</span>
                                                <span>$602.00</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btn-wrap flex justify-center pt-[30px]">
                                        <Button
                                            primary
                                            className="h-[46px] leading-[46px] w-full justify-center"
                                            to={routes.checkout}
                                        >
                                            Proceed to checkout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Cart;
