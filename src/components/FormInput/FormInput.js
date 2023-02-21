import React from 'react';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

const FormInput = (props) => {
    const { label, onChange, id, type, errorMessage, className, ...inputProps } = props;

    // const [tgPassword, setTgPassword] = useState(true);

    return (
        <div className={cx('single-field w-full', { [className]: className })}>
            <label htmlFor={id} className="block mb-[5px]">
                {label} *
            </label>
            <input
                className="input-field border border-[#cfcfcf] outline-none w-full h-[40px] p-[10px]"
                id={id}
                type={type}
                onChange={onChange}
                {...inputProps}
            />
        </div>
    );
};

export default FormInput;
