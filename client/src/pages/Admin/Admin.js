import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import { useEffect, useState } from 'react';
import request from '~/utils/httpRequest';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faDollar, faSackDollar, faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Admin() {
    const [year, setYear] = useState('2023');
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        request
            .get(config.apis.getStatisticOfYear, {
                params: {
                    year,
                },
            })
            .then((res) => setStatistics(res.data))
            .catch((error) => console.log(error));
    }, [year]);

    console.log(statistics);

    return (
        <>
            <div className="chart px-16">
                <div className="flex justify-between items-center mb-4">
                    <div className="font-medium text-[18px]">Dashboard</div>
                </div>
                <div className="flex">
                    <div className="flex-[2]">
                        <div className="flex">
                            <div className="flex flex-col flex-1 items-center justify-center  bg-white shadow-sm py-2 rounded-lg">
                                <div className="py-1 px-3 mb-2 rounded-full shadow-xl bg-blue-300/40 text-blue-400 text-[12px]">
                                    <FontAwesomeIcon icon={faDollar} />
                                </div>
                                <p className="text-gray-400 text-[12px]">Total</p>
                                <p className="font-medium text-[14px]">$200</p>
                            </div>
                            <div className="flex flex-col flex-1 items-center justify-center  bg-white shadow-sm py-2 rounded-lg mx-5 ">
                                <div className="py-1 px-2 mb-2 rounded-full shadow-xl bg-green-300/40 text-green-400 text-[12px]">
                                    <FontAwesomeIcon icon={faSackDollar} />
                                </div>
                                <p className="text-gray-400 text-[12px]">Income</p>
                                <p className="font-medium text-[14px]">$200</p>
                            </div>
                            <div className="flex flex-col flex-1 items-center justify-center  bg-white shadow-sm py-2 rounded-lg mx-5">
                                <div className="py-1 px-2 mb-2 rounded-full shadow-xl bg-purple-300/40 text-purple-400 text-[12px]">
                                    <FontAwesomeIcon icon={faCoins} />
                                </div>
                                <p className="text-gray-400 text-[12px]">Spending</p>
                                <p className="font-medium text-[14px]">$200</p>
                            </div>
                            <div className="flex flex-col flex-1 items-center justify-center  bg-white shadow-sm py-2 rounded-lg">
                                <div className="py-1 px-2 mb-2 rounded-full shadow-xl bg-orange-300/40 text-orange-400 text-[12px]">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <p className="text-gray-400 text-[12px]">Customers</p>
                                <p className="font-medium text-[12px]">20</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 grid-rows-[1fr,30px] h-[530px] text-center pl-[50px] mt-4 relative bg-white px-4 pb-4 pt-[30px] rounded-2xl shadow-sm">
                            <ul className="absolute top-0 left-0 h-full w-[50px] flex flex-col justify-between items-start pb-[40px] pl-4 pt-[40px] text-[12px]">
                                <li>$1000</li>
                                <li>$800</li>
                                <li>$600</li>
                                <li>$400</li>
                                <li>$200</li>
                                <li>0</li>
                            </ul>
                            <select
                                className="absolute top-4 right-10 border border-gray-400 px-4 py-2 rounded-sm"
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>

                            {statistics.length > 0 &&
                                [...Array(12)].map((value, index) => {
                                    const TOTAL = 1000;
                                    const valueStatistic = statistics.find(
                                        (value) => value._id.month === index + 1 && value._id.year.toString() === year,
                                    );
                                    // let colorSta = '';
                                    // if (!!valueStatistic) {
                                    //     colorSta = ` h-[${Math.floor((valueStatistic.total / TOTAL) * 100)}px]`;
                                    // }
                                    const PERCENT_DISPLAY = (500 / 100).toFixed(2);
                                    return (
                                        <div
                                            key={index}
                                            className={cx(
                                                'group flex justify-self-center self-end w-[40px] relative z-10',
                                                {
                                                    'bg-blue-400': !!valueStatistic,
                                                    'bg-slate-400 h-[100px] opacity-70': !!!valueStatistic,
                                                },
                                            )}
                                            style={{
                                                height: valueStatistic
                                                    ? `${
                                                          Math.floor((valueStatistic.total / TOTAL) * 100) *
                                                          PERCENT_DISPLAY
                                                      }px`
                                                    : '',
                                            }}
                                        >
                                            {!!valueStatistic && (
                                                <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                                                    ${valueStatistic.total}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            <p className="leading-[30px] text-[12px] font-medium">Jan</p>
                            <p className="leading-[30px] text-[12px] font-medium">Feb</p>
                            <p className="leading-[30px] text-[12px] font-medium">Mar</p>
                            <p className="leading-[30px] text-[12px] font-medium">Apr</p>
                            <p className="leading-[30px] text-[12px] font-medium">May</p>
                            <p className="leading-[30px] text-[12px] font-medium">Jun</p>
                            <p className="leading-[30px] text-[12px] font-medium">Jul</p>
                            <p className="leading-[30px] text-[12px] font-medium">Aug</p>
                            <p className="leading-[30px] text-[12px] font-medium">Sep</p>
                            <p className="leading-[30px] text-[12px] font-medium">Oct</p>
                            <p className="leading-[30px] text-[12px] font-medium">Nov</p>
                            <p className="leading-[30px] text-[12px] font-medium">Dec</p>
                        </div>
                    </div>
                    <div className="char flex-1"></div>
                </div>

                {/* <div className="h-[200px]">
                    <div className="w-[20px] h-full bg-blue-400"></div>
                </div>
                <div className=" flex justify-between items-center">
                    <p>Jan</p>
                    <p>Feb</p>
                    <p>Mar</p>
                    <p>Apr</p>
                    <p>May</p>
                    <p>Jun</p>
                    <p>Jul</p>
                    <p>Aug</p>
                    <p>Sep</p>
                    <p>Oct</p>
                    <p>Nov</p>
                    <p>Dec</p>
                </div> */}
            </div>
        </>
    );
}
export default Admin;
