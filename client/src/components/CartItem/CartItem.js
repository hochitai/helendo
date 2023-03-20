import { useState } from 'react';
import classNames from 'classnames/bind';

import { ExitIcon, MinusIcon, PlusIcon } from '../Icons';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { handleAddToCart } from '~/utils/handleLocalStorage';

const cx = classNames.bind(styles);

function CartItem({ data, onOpenDialog }) {
    const [count, setCount] = useState(data.quantity);

    const handleDecrease = (e) => {
        e.preventDefault();
        if (count > 1) {
            setCount(count - 1);
            handleAddToCart(data.id, data.name, -1, data.price, data.image, data.saleID, data.slug, data.totalQuantity);
        }
    };
    const handleIncrease = (e) => {
        e.preventDefault();
        if (count < data.totalQuantity) {
            setCount(count + 1);
            handleAddToCart(data.id, data.name, 1, data.price, data.image, data.saleID, data.slug, data.totalQuantity);
        }
    };

    const handleChanged = (e) => {
        e.preventDefault();
        const newCount = e.target.value;
        var regex = /^[0-9]+$/;
        if (newCount.match(regex)) {
            if (newCount < data.totalQuantity) {
                setCount(parseInt(newCount));
                handleAddToCart(
                    data.id,
                    data.name,
                    newCount - count,
                    data.price,
                    data.image,
                    data.saleID,
                    data.slug,
                    data.totalQuantity,
                );
            } else {
                setCount(parseInt(data.totalQuantity));
                handleAddToCart(
                    data.id,
                    data.name,
                    data.totalQuantity - count,
                    data.price,
                    data.image,
                    data.saleID,
                    data.slug,
                    data.totalQuantity,
                );
            }
        }
    };

    return (
        <tbody>
            <tr className={cx('bg-white border-b dark:bg-gray-800 dark:border-gray-700')}>
                <td className="py-[16px] product-name pr-[25px] flex items-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <Link className="product-img w-[100px]" to="/products/art-deco-home">
                        <img src={data.image} alt="Art Deco Home" className="w-[74px] h-[74px]" />
                    </Link>
                    <h2 className="product-name">
                        <Link className="text-[14px] transition-all hover:text-primary" to="/products/art-deco-home">
                            {data.name}
                        </Link>
                    </h2>
                </td>
                <td className="py-[16px] text-[16px]">${data.price.toFixed(2)}</td>
                <td className="py-[16px] text-[16px]">
                    <div className="relative inline-flex mr-[15px]">
                        <div className="flex justify-center w-[120px]">
                            <button
                                type="button"
                                className="cursor-pointer text-center absolute dec top-1/2 -translate-y-1/2 left-[4px]"
                                onClick={handleDecrease}
                            >
                                <MinusIcon width="1.6rem" height="1.6rem" />
                            </button>
                            <input
                                className="qty-input outline-none text-center w-[100px] px-[15px] h-[46px] leading-[40px]"
                                type="number"
                                name="qtybutton"
                                value={count}
                                onChange={handleChanged}
                            />
                            <button
                                type="button"
                                className="cursor-pointer text-center absolute inc top-1/2 -translate-y-1/2 right-[4px]"
                                onClick={handleIncrease}
                            >
                                <PlusIcon width="1.6rem" height="1.6rem" />
                            </button>
                        </div>
                    </div>
                </td>
                <td className="py-[16px] text-[16px]">${(count * data.price).toFixed(2)}</td>
                <td className="py-[16px] text-[16px] text-right">
                    <button
                        type="button"
                        className="item-remove flex items-start text-[20px]"
                        onClick={() => onOpenDialog(data.id)}
                    >
                        <ExitIcon width="2rem" height="2rem" />
                    </button>
                </td>
            </tr>
        </tbody>
    );
}

export default CartItem;
