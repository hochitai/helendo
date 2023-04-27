import { Fragment, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPencil } from '@fortawesome/free-solid-svg-icons';

import FormInput from '~/components/FormInput/FormInput';

import styles from './ProductDetail.module.scss';
import request from '~/utils/httpRequest';
import config from '~/config';

const cx = classNames.bind(styles);

function ProductDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [values, setValues] = useState({
        name: '',
        price: 0,
        tagID: '',
        categoryID: '',
        sizeID: '',
    });
    const [types, setTypes] = useState({});

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
            name: 'price',
            type: 'number',
            label: 'Price',
            errorMessage: 'Price should be include number',
            pattern: `^[0-9]+$`,
            required: true,
        },
    ];

    useEffect(() => {
        if (searchParams.get('name')) {
            request.get(config.apis.getAllProducts + '/' + searchParams.get('name')).then((res) => {
                console.log(res.data);
                setValues({
                    _id: res.data._id,
                    name: res.data.name,
                    price: res.data.price,
                    tagID: res.data.tagID,
                    categoryID: res.data.categoryID,
                    sizeID: res.data.sizeID,
                });
            });
            request.get(config.apis.getTypes).then((res) => {
                setTypes(res.data);
            });
        } else {
            request.get(config.apis.getTypes).then((res) => {
                setTypes(res.data);
                setValues({
                    ...values,
                    sizeID: res.data.size[0]._id,
                    categoryID: res.data.cate[0]._id,
                    tagID: res.data.tag[0]._id,
                });
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (values._id) {
            request
                .post(config.apis.updateProduct, values)
                .then((res) => {
                    navigate(config.routes.productAdmin);
                })
                .catch((error) => console.log(error));
        } else {
            request
                .post(config.apis.createProduct, values)
                .then((res) => {
                    navigate(config.routes.productAdmin);
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <Fragment>
            <div className={cx('title flex')}>
                <button className="text-[20px] mr-10" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h1>Product Detail</h1>
            </div>
            <form>
                <div className="relative w-[200px] h-[200px] border rounded-2xl mb-10">
                    <img src="" alt="product" />
                    <label
                        htmlFor="img-Product"
                        className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer absolute bottom-0 right-0"
                    >
                        <FontAwesomeIcon icon={faPencil} />
                        <input type="file" hidden id="img-Product" />
                    </label>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                className="mb-[30px]"
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
                    <div className="flex-1 pl-20">
                        {types.cate && (
                            <div>
                                <h2>Category</h2>
                                <select
                                    className="min-w-[140px] h-[30px] border rounded-lg mt-2 mb-10 capitalize"
                                    name="categoryID"
                                    onChange={onChangeValue}
                                >
                                    {types.cate.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {types.size && (
                            <div>
                                <h2>Size</h2>
                                <select
                                    className="min-w-[140px] h-[30px] border rounded-lg mt-2 mb-10 capitalize"
                                    name="sizeID"
                                    onChange={onChangeValue}
                                >
                                    {types.size.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {types.tag && (
                            <div>
                                <h2>Tag</h2>
                                <select
                                    className="min-w-[140px] h-[30px] border rounded-lg mt-2 mb-10 capitalize"
                                    name="tagID"
                                    onChange={onChangeValue}
                                >
                                    {types.tag.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <button className="bg-blue-500 text-white px-10 py-4 rounded-2xl mt-10" onClick={handleSave}>
                    Save
                </button>
            </form>
        </Fragment>
    );
}

export default ProductDetail;
