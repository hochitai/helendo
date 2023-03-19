import { useState } from 'react';
import classNames from 'classnames';

import images from '~/assets/images';
import Button from '~/components/Button';
import { RightTriangleIcon, StarIcon } from '~/components/Icons';
import styles from './ProductDetailItem.module.scss';
import FormInput from '../FormInput';

const cx = classNames.bind(styles);

const OPTION_1 = 'description';
const OPTION_2 = 'additional';
const OPTION_3 = 'reviews';

function MoreInfomation({ description, features, weight, dimensions, name, image }) {
    const [infoProduct, setInfoProduct] = useState(OPTION_1);
    const [values, setValues] = useState({
        star: 5,
        review: '',
        name: '',
        email: '',
    });

    const inputs = [
        {
            id: 'reviewer-name',
            name: 'name',
            type: 'text',
            label: 'Name',
            errorMessage: "Name should be 1-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{1,16}$',
            required: true,
        },
        {
            id: 'reviewer-email',
            name: 'email',
            type: 'email',
            label: 'Email',
            errorMessage: 'It should be a valid email address!',
            required: true,
        },
    ];

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleChangeStar = (quantity) => {
        setValues({ ...values, star: quantity });
    };

    const handleSubmitReview = (e) => {
        // e.preventDefault();
        console.log('ok');
    };
    return (
        <div className="product-detail-tab pt-[95px]">
            <div className="container mx-auto">
                <ul className="product-detail-tab-menu flex max-sm:flex-wrap border-b border-[#dddddd] pb-[20px]">
                    <li
                        className={cx(
                            "description select-none font-medium transition-all hover:text-primary relative flex after:content-['/'] after:px-[20px] cursor-pointer",
                            { 'text-primary active': infoProduct === OPTION_1 },
                        )}
                        onClick={() => setInfoProduct(OPTION_1)}
                    >
                        <span>Description</span>
                    </li>
                    <li
                        className={cx(
                            "select-none font-medium transition-all hover:text-primary relative flex] after:content-['/'] after:px-[20px] cursor-pointer",
                            { 'text-primary active': infoProduct === OPTION_2 },
                        )}
                        onClick={() => setInfoProduct(OPTION_2)}
                    >
                        <span>Additional information</span>
                    </li>
                    <li
                        className={cx(
                            'select-none font-medium transition-all hover:text-primary relative flex] cursor-pointer',
                            {
                                'text-primary active': infoProduct === OPTION_3,
                            },
                        )}
                        onClick={() => setInfoProduct(OPTION_3)}
                    >
                        <span>Reviews</span>
                    </li>
                </ul>
                <div className="product-detail-content">
                    <div
                        className={cx('tab-style-common description', {
                            block: infoProduct === OPTION_1,
                            hidden: infoProduct !== OPTION_1,
                        })}
                    >
                        <div className="description-wrap border-b border-[#dddddd] py-[30px]">
                            <div className="grid grid-cols-12 lm:gap-x-[30px] max-sm:gap-y-[30px]">
                                <div className="lm:col-span-7 col-span-12 self-center">
                                    <div>
                                        <h2 className="text-[24px] mb-[10px] font-medium">Description</h2>
                                        <p className="text-justify leading-[28px]">{description}</p>
                                    </div>
                                </div>
                                <div className="lm:col-span-5 col-span-12">
                                    <img className="w-full" src={image} alt="Product" />
                                </div>
                            </div>
                        </div>
                        <div className="description-wrap border-b border-[#dddddd] py-[30px]">
                            <div className="grid grid-cols-12 lm:gap-x-[30px] max-sm:gap-y-[30px]">
                                <div className="lm:col-span-7 col-span-12 self-center">
                                    <div>
                                        <h2 className="text-[24px] mb-[10px] font-medium">Features</h2>
                                        <ul className="features-list">
                                            {features.map((feature, index) => (
                                                <li className="mb-[5px] last:mb-0" key={index}>
                                                    <span className="flex items-center cursor-pointer transition-all hover:text-primary">
                                                        <RightTriangleIcon className="mr-[10px]" />
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="lm:col-span-5 col-span-12">
                                    <img className="w-full" src={image} alt="Product" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={cx('tab-style-common additional-information', {
                            block: infoProduct === OPTION_2,
                            hidden: infoProduct !== OPTION_2,
                        })}
                    >
                        <div className="overflow-x-auto relative pt-[25px]">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pb-4 pr-6 text-gray-900 whitespace-nowrap text-[16px]"
                                        >
                                            <span className="font-bold">Weight</span>
                                            <span className="font-normal ml-[5px]">{weight} kg</span>
                                        </th>
                                        <th
                                            scope="row"
                                            className="pb-4 pr-6 text-gray-900 whitespace-nowrap text-[16px]"
                                        >
                                            <span className="font-bold">Dimensions</span>
                                            <span className="font-normal ml-[5px]">{dimensions}</span>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        className={cx('tab-style-common reviews active', {
                            block: infoProduct === OPTION_3,
                            hidden: infoProduct !== OPTION_3,
                        })}
                    >
                        <div className="reviews-wrap pt-[25px]">
                            <h2 className="text-[26px] font-medium">Be the first to review “{name}”</h2>
                            <span className="block mb-[10px]">Your rating</span>
                            <ul className="product-rating flex">
                                {[...Array(5)].map((value, index) => {
                                    const starQuantity = index + 1;
                                    return (
                                        <li
                                            key={index}
                                            className="cursor-pointer"
                                            onClick={() => handleChangeStar(starQuantity)}
                                        >
                                            <StarIcon
                                                className={cx({
                                                    'text-[#f5a623]': starQuantity <= values.star,
                                                    'text-[#999999]': starQuantity > values.star,
                                                })}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                            <form className="pt-[25px]">
                                <div className="single-field mb-[20px]">
                                    <label htmlFor="your-review" className="block mb-[5px]">
                                        Your review *
                                    </label>
                                    <textarea
                                        className="textarea-field border border-[#cfcfcf] outline-none w-full h-[140px] p-[10px]"
                                        id="your-review"
                                        type="text"
                                        value={values['review']}
                                        name="review"
                                        onChange={onChangeValue}
                                    ></textarea>
                                </div>
                                <div className="group-field flex">
                                    {inputs.map((input, index) => (
                                        <FormInput
                                            key={input.id}
                                            className={cx({ 'ml-[20px]': index !== 0 })}
                                            value={values[input.name]}
                                            onChange={onChangeValue}
                                            {...input}
                                        />
                                    ))}
                                </div>
                                <div className="submit-field mt-[35px]" />
                                <Button primary small type="submit" onClick={handleSubmitReview}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoreInfomation;
