import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ limit, page, total, onChangePage }) {
    const totalPages = Math.ceil(total / limit);
    const handlePageChanged = (newPage) => {
        if (onChangePage) {
            onChangePage(newPage);
        }
    };

    return (
        <ul className="pagination flex justify-center pt-[40px]">
            <li className="px-[5px]">
                <Button
                    className=" bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]"
                    type="button"
                    disabled={page <= 1}
                    onClick={() => handlePageChanged(page - 1)}
                >
                    Prev
                </Button>
            </li>
            {[...Array(totalPages)].map((value, index) => {
                const currentPage = index + 1;

                return (
                    <li className="px-[5px]" key={index}>
                        <Button
                            className={cx(
                                'page-number',
                                'bg-[#f5f5f5] cursor-pointer flex items-center px-[13px] h-[34px] text-[12px] font-medium',
                                { 'bg-primary': page === currentPage },
                            )}
                            disabled={page === currentPage}
                            onClick={() => handlePageChanged(currentPage)}
                        >
                            {currentPage}
                        </Button>
                    </li>
                );
            })}
            <li className="px-[5px]">
                <Button
                    className=" bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]"
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => handlePageChanged(page + 1)}
                >
                    Next
                </Button>
            </li>
        </ul>
    );
}

export default Pagination;
