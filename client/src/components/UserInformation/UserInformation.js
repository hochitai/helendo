import { useState } from 'react';
import Cookies from 'universal-cookie';
import classNames from 'classnames/bind';
import FormInput from '../FormInput/FormInput';
import request from '~/utils/httpRequest';
import config from '~/config';
import { SuccessDialog } from '~/components/Dialog';
import styles from './UserInformation.module.scss';

const cx = classNames.bind(styles);

function UserInformation() {
    const cookies = new Cookies();
    const [isShowDialog, setIsShowDialog] = useState(false);
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

    const handleSave = (e) => {
        e.preventDefault();
        const regName =
            '^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,16}$';
        const regAddress =
            '^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s/]{3,16}$';
        const regPhone = '(0[3|5|7|8|9])+([0-9]{8})';
        if (
            !(
                values['name'] === cookies.get('info').name &&
                values['address'] === cookies.get('info').address &&
                values['phone'] === cookies.get('info').phone
            ) &&
            values['name'].match(regName) &&
            values['address'].match(regAddress) &&
            values['phone'].match(regPhone)
        ) {
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
                        setIsShowDialog(true);
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

    const onAccept = () => {
        setIsShowDialog(false);
    };

    return (
        <div className="border p-[30px] rounded-2xl">
            <div className="mb-[40px]">
                <h2 className="text-[24px] font-medium">Information</h2>
                <h3 className="text-[18px] text-gray-400">Here you can manage your informatiton</h3>
            </div>
            <form className="ing-form">
                <div className="flex">
                    <div className="flex-1">
                        {input.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                className="mb-[20px]"
                                classOfForm="border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]"
                                label={input.label}
                                type={input.type}
                                name={input.name}
                                placeholder={input.label}
                                value={values[input.name]}
                                onChange={onChangeValue}
                            />
                        ))}
                    </div>
                </div>
                <button className="bg-primary text-white py-4 px-6 rounded-lg hover:opacity-70" onClick={handleSave}>
                    Save
                </button>
            </form>
            <div className="my-6 mr-20 font-medium text-red-400">{message}</div>
            {isShowDialog && <SuccessDialog title="Changed information successfully" onAccept={onAccept} />}
        </div>
    );
}

export default UserInformation;
