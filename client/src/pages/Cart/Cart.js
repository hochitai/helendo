import { Fragment } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import { useState, useEffect } from 'react';
import CartItem from '~/components/CartItem';
import Button from '~/components/Button';
import styles from './Cart.module.scss';
import { ArrowLeftIcon } from '~/components/Icons';
import routes from '~/config/routes';
import { handleRemoveItemCart } from '~/utils/handleLocalStorage';
import { DeleteDialog } from '~/components/Dialog';

const cx = classNames.bind(styles);

function Cart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [cartItemId, setCartItemId] = useState('');

    useEffect(() => {
        window.addEventListener('storage', () => {
            setCart(JSON.parse(localStorage.getItem('cart')));
        });
    }, []);

    const onCloseDialog = () => {
        setIsShowDialog(false);
    };

    const onOpenDialog = (id) => {
        setIsShowDialog(true);
        setCartItemId(id);
    };

    const onAccept = (id) => {
        setIsShowDialog(false);
        handleRemoveItemCart(id);
    };

    return (
        <Fragment>
            <Header />
            <Breadcrumb title={'Cart'} />
            <div className={cx('cart border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]')}>
                <div className="container mx-auto">
                    <div className="relative ">
                        <table className="cart-table w-full text-sm text-left">
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
                            <tbody>
                                {cart.length > 0 &&
                                    cart.map((ele) => <CartItem key={ele.id} data={ele} onOpenDialog={onOpenDialog} />)}
                            </tbody>
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
                        {/* <div className="btn-wrap">
                            <Button second className="h-[46px] sm:px-[42px] px-[12px] border">
                                Clear cart
                            </Button>
                        </div> */}
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
                                                <span>
                                                    $
                                                    {cart
                                                        .reduce(
                                                            (accumulator, currentValue) =>
                                                                accumulator +
                                                                currentValue.quantity * currentValue.price,
                                                            0,
                                                        )
                                                        .toFixed(2)}
                                                </span>
                                            </li>
                                            <li className="item flex justify-between">
                                                <span className="font-bold">Total:</span>
                                                <span>
                                                    $
                                                    {cart
                                                        .reduce(
                                                            (accumulator, currentValue) =>
                                                                accumulator +
                                                                currentValue.quantity * currentValue.price,
                                                            0,
                                                        )
                                                        .toFixed(2)}
                                                </span>
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
            {isShowDialog && <DeleteDialog onClose={onCloseDialog} onAccept={() => onAccept(cartItemId)} />}
        </Fragment>
    );
}
export default Cart;
