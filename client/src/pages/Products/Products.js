import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import Pagination from '~/components/Pagination';

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
        value: 'in-stock',
        type: 'avail',
    },
    {
        id: 'avail2',
        value: 'out-of-stock',
        type: 'avail',
    },
];

const sizeList = [
    {
        id: 'size1',
        value: 'large',
        type: 'size',
    },
    {
        id: 'size2',
        value: 'medium',
        type: 'size',
    },
    {
        id: 'size3',
        value: 'small',
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

const GRID_3 = 3;
const GRID_4 = 4;

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [listProduct, setListProduct] = useState(24);
    const [filterProduct, setFilterProduct] = useState({
        limit: 12,
        page: 1,
        search: [],
    });
    const [grid, setGrid] = useState(GRID_3);

    useEffect(() => {
        const filter = Object.fromEntries([...searchParams]);
        let filterArray = [];
        let tempArray = [];

        if (filter.cate) {
            tempArray = filter.cate.split(',');
            filterArray = filterArray.concat(
                tempArray
                    .filter((value) => {
                        if (cateList.find((element) => element.value === value)) {
                            return true;
                        }
                        return false;
                    })
                    .map((value) => {
                        const id = cateList.find((element) => element.value === value).id;
                        return {
                            id: id,
                            type: 'cate',
                            value: value,
                        };
                    }),
            );
        }
        if (filter.tag) {
            tempArray = filter.tag.split(',');
            filterArray = filterArray.concat(
                tempArray
                    .filter((value) => {
                        if (tagList.find((element) => element.value === value)) {
                            return true;
                        }
                        return false;
                    })
                    .map((value) => {
                        const id = tagList.find((element) => element.value === value).id;
                        return {
                            id: id,
                            type: 'tag',
                            value: value,
                        };
                    }),
            );
        }
        if (filter.avail) {
            tempArray = filter.avail.split(',');
            filterArray = filterArray.concat(
                tempArray
                    .filter((value) => {
                        if (availList.find((element) => element.value === value)) {
                            return true;
                        }
                        return false;
                    })
                    .map((value) => {
                        const id = availList.find((element) => element.value === value).id;
                        return {
                            id: id,
                            type: 'avail',
                            value: value,
                        };
                    }),
            );
        }
        if (filter.size) {
            tempArray = filter.size.split(',');
            filterArray = filterArray.concat(
                tempArray
                    .filter((value) => {
                        if (sizeList.find((element) => element.value === value)) {
                            return true;
                        }
                        return false;
                    })
                    .map((value) => {
                        const id = sizeList.find((element) => element.value === value).id;
                        return {
                            id: id,
                            type: 'size',
                            value: value,
                        };
                    }),
            );
        }
        if (filter.priceFrom && filter.priceTo) {
            filterArray = filterArray.concat([
                {
                    id: 'priceId',
                    type: 'price',
                    value: {
                        priceFrom: filter.priceFrom,
                        priceTo: filter.priceTo,
                    },
                },
            ]);
        } else {
            if (filter.priceFrom) {
                filterArray = filterArray.concat([
                    {
                        id: 'priceId',
                        type: 'price',
                        value: {
                            priceFrom: filter.priceFrom,
                        },
                    },
                ]);
            }
            if (filter.priceTo) {
                filterArray = filterArray.concat([
                    {
                        id: 'priceId',
                        type: 'price',
                        value: {
                            priceTo: filter.priceTo,
                        },
                    },
                ]);
            }
        }
        if (filter.name) {
            filterArray = filterArray.concat([
                {
                    id: 'name',
                    type: 'name',
                    value: filter.name,
                },
            ]);
        }

        if (filter.page) {
            setFilterProduct((prev) => ({ ...prev, search: filterArray, page: parseInt(filter.page) }));
        } else {
            setFilterProduct((prev) => ({ ...prev, search: filterArray }));
        }
    }, [searchParams]);

    const handleFilterPrice = (e) => {
        e.preventDefault();
        const priceFrom = e.target.elements.priceFrom.value;
        const priceTo = e.target.elements.priceTo.value;
        if (!isNaN(priceFrom) && !isNaN(priceTo)) {
            if (!!priceFrom || !!priceTo) {
                addFilter('price1', priceFrom + ',' + priceTo, 'price');
            }
        }
    };

    const addFilter = (id, value, type) => {
        if (type === 'price') {
            const price = value.split(',');
            if (!searchParams.has('priceFrom') && !searchParams.has('priceTo')) {
                if (!!price[0] && !!price[1]) {
                    setSearchParams((prev) => {
                        return [...prev.entries(), ['priceFrom', price[0]], ['priceTo', price[1]]];
                    });
                } else {
                    if (!!price[0]) {
                        setSearchParams((prev) => {
                            return [...prev.entries(), ['priceFrom', price[0]]];
                        });
                    }
                    if (!!price[1]) {
                        setSearchParams((prev) => {
                            return [...prev.entries(), ['priceTo', price[1]]];
                        });
                    }
                }
            } else {
                if (!!price[0] && !!price[1]) {
                    setSearchParams({
                        ...Object.fromEntries([...searchParams]),
                        priceFrom: price[0],
                        priceTo: price[1],
                    });
                } else {
                    if (!!price[0]) {
                        searchParams.delete('priceTo');
                        setSearchParams({
                            ...Object.fromEntries([...searchParams]),
                            priceFrom: price[0],
                        });
                    }
                    if (!!price[1]) {
                        searchParams.delete('priceFrom');
                        setSearchParams({
                            ...Object.fromEntries([...searchParams]),
                            priceTo: price[1],
                        });
                    }
                }
            }
        } else {
            if (!searchParams.has(type)) {
                setSearchParams((prev) => {
                    return [...prev.entries(), [type, value]];
                });
            } else if (!searchParams.get(type).includes(value)) {
                if (type === 'page' || type === 'name') {
                    setSearchParams({ ...Object.fromEntries([...searchParams]), [type]: value });
                } else {
                    const newValue = searchParams.get(type) + ',' + value;
                    setSearchParams({ ...Object.fromEntries([...searchParams]), [type]: newValue });
                }
            } else {
                if (type === 'page' || type === 'name') {
                    setSearchParams({ ...Object.fromEntries([...searchParams]), [type]: value });
                }
            }
        }
    };

    const deleteFilter = (type, value) => {
        let typeArr = searchParams.get(type).split(',');
        typeArr = typeArr.filter((val) => {
            return val !== value;
        });
        if (typeArr.length > 0) {
            setSearchParams({
                ...Object.fromEntries([...searchParams]),
                [type]: typeArr.join(','),
            });
        } else {
            searchParams.delete(type);
            setSearchParams(searchParams);
        }
    };

    const updateFilter = (id, value, type) => {
        if (filterProduct.search.filter((item) => item.id === id).length > 0) {
            deleteFilter(type, value);
        } else {
            addFilter(id, value, type);
        }
    };

    const handleClearAll = () => setSearchParams({});

    const handlePageChanged = (newPage) => {
        addFilter('page', newPage, 'page');
    };

    const handleFilterSearch = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        if (name) {
            addFilter('name', name, 'name');
        }
    };

    return (
        <Fragment>
            <Header />
            <div className={cx('wrapper')}>
                <Breadcrumb title="Products" />
                <div className="product border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
                    <div className="container mx-auto">
                        <div className="product-search border-b border-[#dddddd] mb-[25px]">
                            <form className="search-filter-form pt-[20px]" onSubmit={handleFilterSearch}>
                                <div className="search-form-field mb-[15px]">
                                    <div className="flex items-center border border-[#dddddd] px-[10px] h-[45px]">
                                        <input
                                            required=""
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="w-full focus:outline-none"
                                            placeholder="Search name"
                                        />
                                        <Button type="submit" primary small>
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[45px]">
                            <div className="lg:col-span-3 col-span-12 max-md:order-2">
                                <div className="product-sidebar">
                                    <div className="product-sidebar-widget border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Categories</h2>
                                        <div className="flex flex-col items-start pt-[20px]">
                                            {cateList.map((cate) => (
                                                <Button
                                                    key={cate.id}
                                                    text
                                                    className="transition-all hover:text-primary capitalize mb-[10px] last:mb-0"
                                                    onClick={() => addFilter(cate.id, cate.value, cate.type)}
                                                >
                                                    {cate.value}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="product-sidebar-widget border-b border-[#dddddd] pb-[30px] mb-[25px]">
                                        <h2 className="widget-title text-[18px] font-medium">Availability</h2>
                                        <ul className="flex flex-col pt-[20px]">
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
                                                                filterProduct.search.filter(
                                                                    (item) => item.id === avail.id,
                                                                ).length > 0
                                                            }
                                                            onChange={() =>
                                                                updateFilter(avail.id, avail.value, avail.type)
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
                                                                filterProduct.search.filter(
                                                                    (item) => item.id === size.id,
                                                                ).length > 0
                                                            }
                                                            onChange={() =>
                                                                updateFilter(size.id, size.value, size.type)
                                                            }
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
                                                    From
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

                                    <div className="product-sidebar-widget">
                                        <h2 className="widget-title text-[18px] font-medium">Tags</h2>
                                        <div className="flex flex-wrap pt-[20px]">
                                            {tagList.map((tag) => (
                                                <Button
                                                    key={tag.id}
                                                    text
                                                    className='transition-all hover:text-primary mb-[10px] mr-[10px] capitalize after:content-[","] last:after:content-none'
                                                    onClick={() => addFilter(tag.id, tag.value, tag.type)}
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
                                    {filterProduct.search.length > 0 &&
                                        filterProduct.search.map((item) => (
                                            <li key={item.id} className="mr-[10px] mb-[10px]">
                                                <Button
                                                    second
                                                    className="bg-[#e8e8e8] text-[14px] font-normal py-[6px] px-[8px] border-none rounded-[20px]"
                                                    rightIcon={
                                                        <span onClick={() => deleteFilter(item.type, item.value)}>
                                                            <ExitIcon width="1.4rem" height="1.4rem" />
                                                        </span>
                                                    }
                                                >
                                                    {item.type === 'price'
                                                        ? item.value.priceFrom && item.value.priceTo
                                                            ? `$${item.value.priceFrom} - $${item.value.priceFrom}`
                                                            : item.value.priceFrom
                                                            ? `more $${item.value.priceFrom} `
                                                            : `less $${item.value.priceTo} `
                                                        : item.value}
                                                </Button>
                                            </li>
                                        ))}
                                    {filterProduct.search.length > 0 && (
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
                                                        {
                                                            'active opacity-100': grid === GRID_3,
                                                            'opacity-50': grid !== GRID_3,
                                                        },
                                                    )}
                                                    onClick={() => setGrid(GRID_3)}
                                                >
                                                    <img src={images.columns03} alt="Grid Product" />
                                                </li>
                                                <li
                                                    className={cx(
                                                        'grid-04  item cursor-pointer transition-all hover:opacity-100 pr-[17px] last:px-0',
                                                        {
                                                            'active opacity-100': grid === GRID_4,
                                                            'opacity-50': grid !== GRID_4,
                                                        },
                                                    )}
                                                    onClick={() => setGrid(GRID_4)}
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

                                <Pagination
                                    limit={filterProduct.limit}
                                    page={filterProduct.page}
                                    total={listProduct}
                                    onChangePage={handlePageChanged}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Products;
