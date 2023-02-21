import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';

const cx = classNames.bind(styles);

function Breadcrumb({ title }) {
    return (
        <div className={cx('breadcrumb bg-[#f4f5f7] py-[80px]')}>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 items-center">
                    <div className="lg:col-span-6 col-span-12">
                        <p className="max-lg:text-center text-[36px] mb-[15px] md:mb-0 font-medium capitalize">
                            {title}
                        </p>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <ul className="breadcrumb-list flex lg:justify-end justify-center uppercase text-[14px]">
                            <li className='relative after:pr-[15px] after:ml-[15px] after:content-["/"]'>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <span className="text-[#777777] font-medium">{title}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;
