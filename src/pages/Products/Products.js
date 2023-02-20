import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import { ExitIcon } from '~/components/Icons';
import styles from './Products.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

const cateList = [
    {
        id: 'cate1',
        value: 'accessory',
        type: 'cate',
    },
    {
        id: 'cate2',
        value: 'decoration',
        type: 'cate',
    },
    {
        id: 'cate3',
        value: 'furniture',
        type: 'cate',
    },
];

const availList = [
    {
        id: 'avail1',
        value: 'In stock',
        type: 'avail',
    },
    {
        id: 'avail2',
        value: 'Out of stock',
        type: 'avail',
    },
];

const sizeList = [
    {
        id: 'size1',
        value: 'Large',
        type: 'size',
    },
    {
        id: 'size2',
        value: 'Medium',
        type: 'size',
    },
    {
        id: 'size3',
        value: 'Small',
        type: 'size',
    },
];

const tagList = [
    {
        id: 'tag1',
        value: 'accessory',
        type: 'tag',
    },
    {
        id: 'tag2',
        value: 'chair',
        type: 'tag',
    },
    {
        id: 'tag3',
        value: 'glass',
        type: 'tag',
    },
    {
        id: 'tag4',
        value: 'deco',
        type: 'tag',
    },
    {
        id: 'tag5',
        value: 'table',
        type: 'tag',
    },
];

// const colorList = [
//     {
//         id: 'color1',
//         value: 'black',
//         type: 'color',
//     },
//     {
//         id: 'color2',
//         value: 'green',
//         type: 'color',
//     },
//     {
//         id: 'color3',
//         value: 'gray',
//         type: 'color',
//     },
//     {
//         id: 'color4',
//         value: 'red',
//         type: 'color',
//     },
//     {
//         id: 'color5',
//         value: 'yellow',
//         type: 'color',
//     },
// ];

function Products() {
    const [filterProduct, setFilterProduct] = useState([]);
    const [grid, setGrid] = useState(3);

    const handleFilterPrice = (e) => {
        e.preventDefault();
        const priceFrom = e.target.elements.priceFrom.value;
        const priceTo = e.target.elements.priceTo.value;

        handleFilter('price', `$${priceFrom} - $${[priceTo]}`, 'price');
    };

    const addFilter = (id, value, type) => {
        setFilterProduct((prev) => [
            ...prev,
            {
                id: id,
                value: value,
                type: type,
            },
        ]);
    };

    const deleteFilter = (id) => {
        setFilterProduct((prev) => prev.filter((item) => item.id !== id));
    };

    const updateFilter = (id, value) => {
        setFilterProduct((prev) => prev.map((item) => (item.id === id ? { ...item, value } : item)));
    };

    const handleFilter = (id, value, type) => {
        const isExisted = filterProduct.filter((item) => item.id === id).length > 0;
        switch (type) {
            case 'tag':
            case 'cate':
                if (!isExisted) {
                    addFilter(id, value, type);
                }
                break;
            case 'avail':
            case 'size':
                if (!isExisted) {
                    addFilter(id, value, type);
                } else {
                    deleteFilter(id);
                }
                break;
            case 'price':
                if (!isExisted) {
                    addFilter(id, value, type);
                } else {
                    updateFilter(id, value);
                }
                break;
            default:
                throw new Error('Invalid type');
        }
    };

    const handleClearAll = () => setFilterProduct([]);

    console.log(filterProduct);

    return (
        <Fragment>
            <Header />
            <div className={cx('wrapper')}>
                <Breadcrumb title="Products" />
                <div className="product border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[45px]">
                            <div className="lg:col-span-3 col-span-12 max-md:order-2">
                                <div className="product-sidebar">
                                    <div className="product-sidebar-widget border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Categories</h2>
                                        <div className="flex flex-col items-start pt-[20px]">
                                            {/* <Button
                                                text
                                                className="transition-all hover:text-primary capitalize mb-[10px] last:mb-0"
                                            >
                                                accessory
                                            </Button>
                                            <Button
                                                text
                                                className="transition-all hover:text-primary capitalize mb-[10px] last:mb-0"
                                            >
                                                decoration
                                            </Button>
                                            <Button
                                                text
                                                className="transition-all hover:text-primary capitalize mb-[10px] last:mb-0"
                                            >
                                                furniture
                                            </Button> */}

                                            {cateList.map((cate) => (
                                                <Button
                                                    key={cate.id}
                                                    text
                                                    className="transition-all hover:text-primary capitalize mb-[10px] last:mb-0"
                                                    onClick={() => handleFilter(cate.id, cate.value, 'cate')}
                                                >
                                                    {cate.value}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="product-sidebar-widget border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Availability</h2>
                                        <ul className="flex flex-col pt-[20px]">
                                            {/* <li className="mb-[10px]">
                                                <label
                                                    htmlFor="filter-availability-1"
                                                    className="cursor-pointer transition-all hover:text-primary"
                                                >
                                                    <input
                                                        className="mr-[10px] cursor-pointer"
                                                        type="checkbox"
                                                        id="filter-availability-1"
                                                    />
                                                    In stock (17)
                                                </label>
                                            </li>
                                            <li className="mb-[10px]">
                                                <label
                                                    htmlFor="filter-availability-2"
                                                    className="cursor-pointer transition-all hover:text-primary"
                                                >
                                                    <input
                                                        className="mr-[10px] cursor-pointer"
                                                        type="checkbox"
                                                        id="filter-availability-2"
                                                    />
                                                    Out of stock (2)
                                                </label>
                                            </li> */}

                                            {availList.map((avail, index) => (
                                                <li key={avail.id} className="mb-[10px] select-none">
                                                    <label
                                                        htmlFor={`filter-availability-${index}`}
                                                        className="cursor-pointer transition-all hover:text-primary"
                                                    >
                                                        <input
                                                            className="mr-[10px] cursor-pointer"
                                                            type="checkbox"
                                                            id={`filter-availability-${index}`}
                                                            checked={
                                                                filterProduct.filter((item) => item.id === avail.id)
                                                                    .length > 0
                                                            }
                                                            onChange={() =>
                                                                handleFilter(avail.id, avail.value, 'avail')
                                                            }
                                                        />
                                                        {avail.value} (17)
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="product-sidebar-widget border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Size</h2>
                                        <ul className="flex flex-col pt-[20px]">
                                            {/* <li className="mb-[10px]">
                                                <label
                                                    htmlFor="lg-size"
                                                    className="cursor-pointer transition-all hover:text-primary"
                                                >
                                                    <input
                                                        className="mr-[10px] cursor-pointer"
                                                        type="checkbox"
                                                        id="lg-size"
                                                    />
                                                    Large (9)
                                                </label>
                                            </li>
                                            <li className="mb-[10px]">
                                                <label
                                                    htmlFor="md-size"
                                                    className="cursor-pointer transition-all hover:text-primary"
                                                >
                                                    <input
                                                        className="mr-[10px] cursor-pointer"
                                                        type="checkbox"
                                                        id="md-size"
                                                    />
                                                    Medium (7)
                                                </label>
                                            </li>
                                            <li className="mb-[10px]">
                                                <label
                                                    htmlFor="sm-size"
                                                    className="cursor-pointer transition-all hover:text-primary"
                                                >
                                                    <input
                                                        className="mr-[10px] cursor-pointer"
                                                        type="checkbox"
                                                        id="sm-size"
                                                    />
                                                    Small (3)
                                                </label>
                                            </li> */}
                                            {sizeList.map((size, index) => (
                                                <li key={size.id} className="mb-[10px] select-none">
                                                    <label
                                                        htmlFor={`size-${index}`}
                                                        className="cursor-pointer transition-all hover:text-primary"
                                                    >
                                                        <input
                                                            className="mr-[10px] cursor-pointer"
                                                            type="checkbox"
                                                            id={`size-${index}`}
                                                            checked={
                                                                filterProduct.filter((item) => item.id === size.id)
                                                                    .length > 0
                                                            }
                                                            onChange={() => handleFilter(size.id, size.value, 'size')}
                                                        />
                                                        {size.value} (3)
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="product-sidebar-widge border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Price</h2>
                                        <form className="price-filter-form pt-[20px]" onSubmit={handleFilterPrice}>
                                            <div className="price-form-field mb-[15px]">
                                                <label className="flex mb-[5px]" htmlFor="priceFrom">
                                                    Form
                                                </label>
                                                <div className="flex items-center border border-[#dddddd] px-[10px] h-[45px]">
                                                    <span className="text-[#777777] pr-[5px]">$</span>
                                                    <input
                                                        required=""
                                                        id="priceFrom"
                                                        name="priceFrom"
                                                        type="number"
                                                        className="w-full focus:outline-none"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div className="price-form-field">
                                                <label className="flex mb-[5px]" htmlFor="priceTo">
                                                    To
                                                </label>
                                                <div className="flex items-center border border-[#dddddd] px-[10px] h-[45px]">
                                                    <span className="text-[#777777] pr-[5px]">$</span>
                                                    <input
                                                        required=""
                                                        id="priceTo"
                                                        name="priceTo"
                                                        type="number"
                                                        className="w-full focus:outline-none"
                                                        placeholder="100"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div className="price-btn-wrap pt-[20px]">
                                                <button
                                                    type="submit"
                                                    className="flex items-center bg-black text-white px-[25px] py-[8px] h-[40px] transition-all hover:bg-primary"
                                                >
                                                    Filter
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div className="product-sidebar-widget border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Color</h2>
                                        <ul className="flex flex-wrap pt-[20px]">
                                            <li className="mr-[20px] mb-[6px]">
                                                <span className="w-[18px] h-[18px] rounded-full inline-block cursor-pointer opacity-80 black"></span>
                                            </li>
                                            <li className="mr-[20px] mb-[6px]">
                                                <span className="w-[18px] h-[18px] rounded-full inline-block cursor-pointer opacity-80 green"></span>
                                            </li>
                                            <li className="mr-[20px] mb-[6px]">
                                                <span className="w-[18px] h-[18px] rounded-full inline-block cursor-pointer opacity-80 gray"></span>
                                            </li>
                                            <li className="mr-[20px] mb-[6px]">
                                                <span className="w-[18px] h-[18px] rounded-full inline-block cursor-pointer opacity-80 red"></span>
                                            </li>
                                            <li className="mr-[20px] mb-[6px]">
                                                <span className="w-[18px] h-[18px] rounded-full inline-block cursor-pointer opacity-80 yellow"></span>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <div className="product-sidebar-widget">
                                        <h2 className="widget-title text-[18px] font-medium">Tags</h2>
                                        <div className="flex flex-wrap pt-[20px]">
                                            {/* <Button
                                                text
                                                className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                            >
                                                <span className="accessories">accessories</span>
                                            </Button>
                                            <Button
                                                text
                                                className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                            >
                                                <span className="chair">chair</span>
                                            </Button>
                                            <Button
                                                text
                                                className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                            >
                                                <span className="glass">glass</span>
                                            </Button>
                                            <Button
                                                text
                                                className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                            >
                                                <span className="deco">deco</span>
                                            </Button>
                                            <Button
                                                text
                                                className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                            >
                                                <span className="table">table</span>
                                            </Button> */}
                                            {tagList.map((tag) => (
                                                <Button
                                                    key={tag.id}
                                                    text
                                                    className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                                    onClick={() => handleFilter(tag.id, tag.value, 'tag')}
                                                >
                                                    <span className="table">{tag.value}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-9 col-span-12">
                                <ul className="active-filter-list flex flex-wrap items-center pb-[20px] -mb-[10px]">
                                    {/* <li className="mr-[10px] mb-[10px]">
                                        <Button
                                            second
                                            className="bg-[#e8e8e8] text-[14px] font-normal py-[6px] px-[8px] border-none rounded-[20px]"
                                            rightIcon={<ExitIcon width="1.4rem" height="1.4rem" />}
                                        >
                                            accessory
                                        </Button>
                                    </li>
                                    <li className="mb-[10px]">
                                        <Button
                                            text
                                            className="clear-btn text-[14px] transition-all hover:text-primary"
                                        >
                                            Clear All
                                        </Button>
                                    </li> */}
                                    {filterProduct.length > 0 &&
                                        filterProduct
                                            .slice(0)
                                            .reverse()
                                            .map((item, index) => (
                                                <li key={index} className="mr-[10px] mb-[10px]">
                                                    <Button
                                                        second
                                                        className="bg-[#e8e8e8] text-[14px] font-normal py-[6px] px-[8px] border-none rounded-[20px]"
                                                        rightIcon={
                                                            <span onClick={() => deleteFilter(item.id)}>
                                                                <ExitIcon width="1.4rem" height="1.4rem" />
                                                            </span>
                                                        }
                                                    >
                                                        {item.value}
                                                    </Button>
                                                </li>
                                            ))}
                                    {filterProduct.length > 0 && (
                                        <li className="mb-[10px]">
                                            <Button
                                                text
                                                className="clear-btn text-[14px] transition-all hover:text-primary"
                                                onClick={handleClearAll}
                                            >
                                                Clear All
                                            </Button>
                                        </li>
                                    )}
                                </ul>
                                <div className="product-toolbar grid grid-cols-12 pb-[25px]">
                                    <div className="md:col-span-6 sm:col-span-8 col-span-12">
                                        <div className="left-side flex max-xs:flex-col items-center">
                                            <div className="result-count lg:border-black lg:border-r inline-block leading-[12px] lg:pr-[17px]">
                                                <p className="max-xs:mb-[10px]">Showing 1-6 of 6</p>
                                            </div>
                                            <div className="sort-item sm:pl-[17px]">
                                                <div className="relative group">
                                                    <span className="flex items-center cursor-pointer ">
                                                        Sort by:<span className="mx-[5px]">Default</span>
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            className="ml-2 w-[14px] h-[12px]"
                                                        />
                                                    </span>
                                                    <ul className="sort-subitems bg-white border border-[#dddddd] absolute top-[calc(100%+30px)] sm:left-0 max-xs:left-1/2 max-xs:-translate-x-1/2 w-[210px] p-[10px] transition-all invisible opacity-0 group-hover:top-full group-hover:visible group-hover:opacity-100 z-[9]">
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="text-[#777777] text-[15px] leading-[24px] transition-all hover:text-[#222222] py-[5px] px-[10px] rounded-[4px]"
                                                            >
                                                                Default sorting
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="text-[#777777] text-[15px] leading-[24px] transition-all hover:text-[#222222] py-[5px] px-[10px] rounded-[4px]"
                                                            >
                                                                Sort by popularity
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="text-[#777777] text-[15px] leading-[24px] transition-all hover:text-[#222222] py-[5px] px-[10px] rounded-[4px]"
                                                            >
                                                                Sort by latest
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="text-[#777777] text-[15px] leading-[24px] transition-all hover:text-[#222222] py-[5px] px-[10px] rounded-[4px]"
                                                            >
                                                                Sort by price: low to high
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="text-[#777777] text-[15px] leading-[24px] transition-all hover:text-[#222222] py-[5px] px-[10px] rounded-[4px]"
                                                            >
                                                                Sort by price: high to low
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-span-6 sm:col-span-4 col-span-12">
                                        <div className="right-side flex items-center sm:justify-end justify-center pt-[25px] sm:pt-0">
                                            <ul className="flex">
                                                <li
                                                    className={cx(
                                                        'grid-03 item cursor-pointer transition-all hover:opacity-100 pr-[17px] last:px-0',
                                                        { 'active opacity-100': grid === 3, 'opacity-50': grid !== 3 },
                                                    )}
                                                    onClick={() => setGrid(3)}
                                                >
                                                    <img src={images.columns03} alt="Grid Product" />
                                                </li>
                                                <li
                                                    className={cx(
                                                        'grid-04  item cursor-pointer transition-all hover:opacity-100 pr-[17px] last:px-0',
                                                        { 'active opacity-100': grid === 4, 'opacity-50': grid !== 4 },
                                                    )}
                                                    onClick={() => setGrid(4)}
                                                >
                                                    <img src={images.columns04} alt="Grid Product" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-content-03 tab-style-common">
                                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-[25px] gap-y-[40px]">
                                        {grid === 3 && (
                                            <Fragment>
                                                <ProductItem />
                                                <ProductItem />
                                                <ProductItem />
                                                <ProductItem />
                                                <ProductItem />
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                                <div className="grid-content-04 tab-style-common">
                                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-[25px] gap-y-[40px]">
                                        {grid === 4 && (
                                            <Fragment>
                                                <ProductItem />
                                                <ProductItem />
                                                <ProductItem />
                                                <ProductItem />
                                                <ProductItem />
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                                <ul className="pagination flex justify-center pt-[40px]">
                                    <li className="px-[5px]">
                                        <button
                                            className=" bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]"
                                            type="button"
                                            disabled=""
                                        >
                                            Prev
                                        </button>
                                    </li>
                                    <li className="px-[5px]">
                                        <span
                                            className="active bg-[#f5f5f5] cursor-pointer flex items-center px-[13px] h-[34px] text-[12px] font-medium"
                                            id="1"
                                        >
                                            1
                                        </span>
                                    </li>
                                    <li className="px-[5px]">
                                        <button
                                            className=" bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]"
                                            type="button"
                                            disabled=""
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Products;
