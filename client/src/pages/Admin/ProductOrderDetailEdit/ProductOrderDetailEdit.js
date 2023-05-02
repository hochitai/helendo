import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import request from '~/utils/httpRequest';
import config from '~/config';
import FormInput from '~/components/FormInput/FormInput';
import styles from './ProductOrderDetailEdit.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProductOrderDetailEdit() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [values, setValues] = useState({
        name: '',
        address: '',
        phone: '',
        products: [],
    });

    useEffect(() => {
        request
            .get(config.apis.getAllProducts)
            .then((res) => setProducts(res.data))
            .catch((error) => console.log(error));
    }, []);

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            label: 'Name supplier',
            errorMessage: "Name supplier should be 3-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,16}$',
            required: true,
        },
        {
            id: 2,
            name: 'address',
            type: 'text',
            label: 'Address',
            errorMessage: "Address should be 4-200 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s0-9/]{4,200}$',
            required: true,
        },

        {
            id: 3,
            name: 'phone',
            type: 'text',
            label: 'Phone',
            errorMessage: "Phone number should be 10 numbers and shouldn't include any special character!",
            pattern: '(0[3|5|7|8|9])+([0-9]{8})',
            required: true,
        },
    ];

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleAdd = (e) => {
        if (!(products.length === values.products.length)) {
            const productTotal = products.length;
            for (let i = 0; i < productTotal; i++) {
                if (!values.products.find((item) => item.id === products[i]._id)) {
                    const newProducts = values.products;
                    newProducts.push({ position: i, id: products[i]._id, quantity: 1, price: 1 });
                    setValues((prev) => ({ ...prev, products: newProducts }));
                    break;
                }
            }
        }
    };

    const handleQuantity = (e, index) => {
        let newProducts = values.products;
        newProducts = newProducts.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: parseInt(e.target.value) };
            }
            return item;
        });
        setValues((prev) => ({ ...prev, products: newProducts }));
    };

    const handlePrice = (e, index) => {
        let newProducts = values.products;
        newProducts = newProducts.map((item, i) => {
            if (i === index) {
                return { ...item, price: parseInt(e.target.value) };
            }
            return item;
        });
        setValues((prev) => ({ ...prev, products: newProducts }));
    };

    const handleDelete = (id) => {
        let newProducts = values.products;
        newProducts = newProducts.filter((item) => item.id !== id);
        setValues((prev) => ({ ...prev, products: newProducts }));
    };

    const handleCreate = () => {
        request
            .post(config.apis.createOrder, values)
            .then((res) => navigate(-1))
            .catch((error) => console.log(error));
    };

    return (
        <div className="px-16">
            <h3 className="font-medium text-[20px] my-4">Create product order</h3>
            <div className="flex gap-40 mb-8">
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        classOfForm="border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]"
                        type={input.type}
                        name={input.name}
                        placeholder={input.label}
                        value={values[input.name]}
                        onChange={onChangeValue}
                        {...input}
                    />
                ))}
            </div>
            <table className="border border-gray-200 w-full rounded-t-2xl">
                <thead className="px-6 text-gray-400 text-left bg-gray-100 rounded-2xl overflow-hidden">
                    <tr className="">
                        <th className="py-6 pl-6 w-[600px]">Product</th>
                        <th className="py-6">Quantity</th>
                        <th className="py-6 ">Price</th>
                        <th className="py-6 w-[200px]">Total</th>
                        <th className="py-6 w-[80px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {values.products.length > 0 &&
                        values.products.map((item, index) => (
                            <tr key={item.id}>
                                <td className="p-6 flex ">
                                    <div className="product-img w-[100px]">
                                        <img
                                            src={products[item.position].image}
                                            alt="Art Deco Home"
                                            className="w-[74px] h-[74px] rounded-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between py-2">
                                        <h2 className="product-name text-[18px] transition-all ">
                                            {products[item.position].name}
                                        </h2>
                                        <h2 className="product-name text-[14px] text-gray-400">
                                            {item.id.slice(0, 8)}
                                        </h2>
                                    </div>
                                </td>
                                <td className="py-6 ">
                                    <input
                                        type="number"
                                        className="w-[50px] border p-2"
                                        min={1}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantity(e, index)}
                                    />
                                </td>
                                <td className="py-6 ">
                                    $
                                    <input
                                        type="number"
                                        className=" ml-4 w-[100px] border p-2"
                                        min={1}
                                        value={item.price}
                                        onChange={(e) => handlePrice(e, index)}
                                    />
                                </td>
                                <td className="py-6">${(item.quantity * item.price).toFixed(2)}</td>
                                <td className="py-6">
                                    <button
                                        className="bg-red-400 text-white p-3 rounded-lg hover:opacity-80"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {!(products.length === values.products.length) && (
                <div className="w-full flex justify-center items-center mt-8">
                    <button
                        className="px-8 py-3 bg-green-400 rounded-full text-white hover:opacity-80"
                        onClick={handleAdd}
                    >
                        ADD
                    </button>
                </div>
            )}
            <button
                className="ml-2 my-10 px-6 py-3 bg-green-500 text-white rounded-lg hover:opacity-80"
                onClick={handleCreate}
            >
                Create
            </button>
        </div>
    );
}

export default ProductOrderDetailEdit;
