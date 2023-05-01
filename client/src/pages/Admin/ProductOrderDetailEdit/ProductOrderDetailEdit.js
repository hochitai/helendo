import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import request from '~/utils/httpRequest';
import config from '~/config';
import FormInput from '~/components/FormInput/FormInput';
import ProductOrderDetailItem from '~/components/ProductOrderDetail/ProductOrderDetailItem';
import styles from './ProductOrderDetailEdit.module.scss';

const cx = classNames.bind(styles);

function ProductOrderDetailEdit() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        address: '',
        products: [],
    });

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            label: 'Name',
            errorMessage: "Name should be 3-16 characters and shouldn't include any special character!",
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
    ];

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    return (
        <div className="px-16">
            <h3 className="font-medium text-[20px] my-4">Create product order</h3>
            <div className="flex gap-40 px-20 mb-8">
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
                        <th className="py-6 pl-6 w-[400px]">Product</th>
                        <th className="py-6">Quantity</th>
                        <th className="py-6 ">Price</th>
                        <th className="py-6 ">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {data.billDetail.map((item) => (
                        <ProductOrderDetailItem key={item._id} data={item} />
                    ))} */}
                </tbody>
            </table>
            <div className="w-full flex justify-center items-center mt-8">
                <button className="px-8 py-3 bg-green-400 rounded-full text-white hover:opacity-80">ADD</button>
            </div>
        </div>
    );
}

export default ProductOrderDetailEdit;
