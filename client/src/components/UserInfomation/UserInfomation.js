import { Fragment, useState } from 'react';
import Cookies from 'universal-cookie';
import classNames from 'classnames/bind';
import FormInput from '../FormInput/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils/httpRequest';
import config from '~/config';
import styles from './UserInfomation.module.scss';

const cx = classNames.bind(styles);

function UserInfomation() {
    const cookies = new Cookies();
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        name: cookies.get('info').name || '',
        address: cookies.get('info').address || '',
        phone: cookies.get('info').phone || '',
    });

    const input = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            label: 'Name',
            errorMessage: "Name should be 3-16 characters and shouldn't include any special character!",
            pattern:
                '^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,16}$',
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

    const handleSave = (e) => {
        e.preventDefault();
        if (
            !(
                values['name'] === cookies.get('info').name &&
                values['address'] === cookies.get('info').address &&
                values['phone'] === cookies.get('info').phone
            )
        ) {
            console.log('Khong giong nhau');
            request
                .post(config.apis.updateInfo, values)
                .then((result) => {
                    if (result.data.statusId === 0) {
                        const dataCokis = cookies.get('info');
                        cookies.set('info', {
                            ...dataCokis,
                            name: values['name'],
                            address: values['address'],
                            phone: values['phone'],
                        });
                        setMessage('Changed successfully');
                    } else {
                        setMessage('Changed failure');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setMessage('Changed failure');
                });
        }
    };

    return (
        <Fragment>
            <h1 className={cx('mt-32 text-primary')}>Infomation</h1>
            <form className="ing-form">
                <div className="flex">
                    <div className="relative w-[200px] h-[200px] mb-20">
                        <img src={cookies.get('info').avatar} alt="" className="w-[200px] h-[200px] rounded-full " />
                        <label
                            htmlFor="userAvatar"
                            className="bg-primary px-3 py-1 cursor-pointer rounded-full absolute bottom-0 right-0"
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </label>
                        <input type="file" hidden id="userAvatar" />
                    </div>
                    <div className="flex-1 mx-40">
                        {input.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                className="mb-[20px]"
                                classOfForm="border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]"
                                value={values[input.name]}
                                onChange={onChangeValue}
                            />
                        ))}
                    </div>
                </div>
                <button className="bg-primary py-4 px-6" onClick={handleSave}>
                    Save
                </button>
            </form>
            <div className="mt-20 mr-20 font-medium">{message}</div>
        </Fragment>
    );
}

export default UserInfomation;
