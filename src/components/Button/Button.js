import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    text,
    primary,
    second,
    small,
    disabled,
    leftIcon,
    rightIcon,
    to,
    href,
    onClick,
    className,
    children,
    ...propPass
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...propPass,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    const classes = cx('wapper', { text, primary, second, small, disabled, [className]: className });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
