import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Product.module.scss';
import request from '~/utils/httpRequest';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        request
            .get(config.apis.getAllProducts)
            .then((res) => setProducts(res.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="px-16">
            <div className="flex justify-between items-center">
                <h1>Product</h1>
                <Link
                    className="bg-blue-500 text-white hover:opacity-80 py-4 px-6 rounded-full"
                    to={config.routes.productEditAdmin}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">Create</span>
                </Link>
            </div>
            <table className="cart-table w-full text-sm text-left my-8">
                <thead className="text-[18px] bg-[#f4f5f7]">
                    <tr>
                        <th scope="col" className="font-medium product-name py-5 pl-[20px] min-w-[200px]">
                            Id
                        </th>
                        <th scope="col" className="font-medium product-name py-5  min-w-[370px]">
                            Product
                        </th>
                        <th scope="col" className="font-medium product-price py-5">
                            Price
                        </th>
                        <th scope="col" className="font-medium text-center py-5 ">
                            Quantity
                        </th>
                        <th scope="col" className="font-medium text-center py-5 min-w-[100px]">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 &&
                        products.map((item) => (
                            <tr
                                key={item._id}
                                className={cx('bg-white border-b dark:bg-gray-800 dark:border-gray-700')}
                            >
                                <td className="py-[16px] text-[16px]">{item._id}</td>
                                <td className="py-[16px] product-name pr-[25px] flex items-center font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <div className="product-img w-[100px]">
                                        <img src={item.image} alt="Art Deco Home" className="w-[74px] h-[74px]" />
                                    </div>
                                    <h2 className="product-name select-none">
                                        <div className="text-[18px] transition-all hover:text-primary ">
                                            {item.name}
                                        </div>
                                    </h2>
                                </td>
                                <td className="py-[16px] text-[16px]">${item.price.toFixed(2)}</td>
                                <td className="py-[16px] text-[16px] text-center">{item.quantity}</td>
                                <td className="py-[16px] text-[16px] text-center">
                                    <Link
                                        className="bg-green-500 text-white py-4 px-5 rounded-3xl mr-6"
                                        to={config.routes.productEditAdmin + '?name=' + item.slug}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Link>
                                    <button className="bg-red-500 text-white py-4 px-5 rounded-3xl mr-6">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;
