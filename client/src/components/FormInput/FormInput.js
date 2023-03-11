import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

const FormInput = (props) => {
    const { label, hasLabel = true, onChange, id, type, errorMessage, className, classOfForm, ...inputProps } = props;

    const [focused, setFocused] = useState(false);

    const handleFocused = () => {
        setFocused(true);
    };

    return (
        <div className={cx('single-field w-full', { [className]: className })}>
            {hasLabel && (
                <label htmlFor={id} className="block mb-[5px]">
                    {label} *
                </label>
            )}
            <input
                className={cx('input-field border border-[#cfcfcf] outline-none w-full h-[40px] p-[10px]', {
                    [classOfForm]: classOfForm,
                })}
                id={id}
                type={type}
                onChange={onChange}
                onBlur={handleFocused}
                focused={focused.toString()}
                {...inputProps}
            />
            <span className="text-[14px] text-red-400 hidden pt-4">{errorMessage}</span>
        </div>
    );
};

export default FormInput;
