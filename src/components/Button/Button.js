import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ primary, second, children, className, ...propPass }) {
    return (
        <button className={cx('wapper', { primary, second, [className]: className })} {...propPass}>
            {children}
        </button>
    );
}

export default Button;
