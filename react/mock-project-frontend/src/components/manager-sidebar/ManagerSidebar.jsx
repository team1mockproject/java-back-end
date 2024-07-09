import { ConfigProvider, Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveContext from '../../context/responsive-context';
import { FaXmark } from 'react-icons/fa6';
const ManagerSidebar = (props) => {
    const { isShowSidebar, setIsShowSidebar } = props
    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)
    const [selectedSidebar, setSelectedSidebar] = useState()

    if (localStorage.getItem('sidebar_item') === null) {
        localStorage.setItem('sidebar_item', '11')
    }

    const items = [
        {
            key: '1',
            label: <span className='font-medium text-base'>Management</span>,
            children: [
                {
                    key: '11',
                    label: <Link to={"/manager"} className='text-base' onClick={() => {
                        setIsShowSidebar(false)
                        localStorage.setItem('sidebar_item', '11')
                        setSelectedSidebar(localStorage.getItem('sidebar_item'))
                    }}>Buyer</Link>,
                },
                {
                    key: '12',
                    label: <Link to={"/manager/seller"} className='text-base' onClick={() => {
                        setIsShowSidebar(false)
                        localStorage.setItem('sidebar_item', '12')
                        setSelectedSidebar(localStorage.getItem('sidebar_item'))
                    }}>Seller</Link>,
                },
                {
                    key: '13',
                    label: <Link className='text-base' onClick={() => {
                        setIsShowSidebar(false)
                        localStorage.setItem('sidebar_item', '13')
                        setSelectedSidebar(localStorage.getItem('sidebar_item'))
                    }}>Staff</Link>,
                },
                {
                    key: '14',
                    label: <Link className='text-base' onClick={() => {
                        setIsShowSidebar(false)
                        localStorage.setItem('sidebar_item', '14')
                        setSelectedSidebar(localStorage.getItem('sidebar_item'))
                    }}>Appraiser</Link>,
                },
                {
                    key: '15',
                    label: <span className='text-base'>Auction Asset</span>,
                    children: [
                        {
                            key: '151',
                            label: <Link className='text-base' onClick={() => {
                                setIsShowSidebar(false)
                                localStorage.setItem('sidebar_item', '151')
                                setSelectedSidebar(localStorage.getItem('sidebar_item'))
                            }}>Auction</Link>
                        },
                        {
                            key: '152',
                            label: <Link className='text-base' onClick={() => {
                                setIsShowSidebar(false)
                                localStorage.setItem('sidebar_item', '152')
                                setSelectedSidebar(localStorage.getItem('sidebar_item'))
                            }}>Asset</Link>
                        }
                    ]
                },
                {
                    key: '16',
                    label: <Link className='text-base' onClick={() => {
                        setIsShowSidebar(false)
                        localStorage.setItem('sidebar_item', '16')
                        setSelectedSidebar(localStorage.getItem('sidebar_item'))
                    }}>Financial</Link>,
                },
                {
                    key: '17',
                    label: <Link className='text-base' onClick={() => {
                        setIsShowSidebar(false)
                        localStorage.setItem('sidebar_item', '17')
                        setSelectedSidebar(localStorage.getItem('sidebar_item'))
                    }}>Inventory</Link>,
                },
            ],
        },
        {
            key: '2',
            label: <Link className='font-medium text-base' onClick={() => {
                setIsShowSidebar(false)
                localStorage.setItem('sidebar_item', '2')
                setSelectedSidebar(localStorage.getItem('sidebar_item'))
            }}>Advertising</Link>
        },
        {
            key: '3',
            label: <Link className='font-medium text-base' onClick={() => {
                setIsShowSidebar(false)
                localStorage.setItem('sidebar_item', '3')
                setSelectedSidebar(localStorage.getItem('sidebar_item'))
            }}>Report</Link>
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedColor: 'var(--color-primary)',
                        itemSelectedBg: '#95aa9c',
                    }
                }
            }}
        >
            {isDesktop &&
                <Menu
                    className='w-[256px] h-[calc(100vh-70px)]'
                    selectedKeys={localStorage.getItem('sidebar_item')}
                    mode="inline"
                    items={items}

                />
            }
            {isTablet &&
                <>
                    <div className={`absolute w-[256px] z-40 top-0 flex justify-end p-4 transition-all
                        ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}>
                        <FaXmark className='text-2xl text-red-500' onClick={() => { setIsShowSidebar(false) }} />
                    </div>
                    <Menu
                        className={`w-[256px] h-screen absolute z-30 top-0 left-0 pt-[70px] transition-all
                        ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}
                        selectedKeys={localStorage.getItem('sidebar_item')}
                        mode="inline"
                        items={items}
                    />
                </>
            }
            {isMobile &&
                <>
                    <div className={`absolute w-[256px] z-40 top-0 flex justify-end p-4 transition-all
                    ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}>
                        <FaXmark className='text-2xl text-red-500' onClick={() => { setIsShowSidebar(false) }} />
                    </div>
                    <Menu
                        className={`w-[256px] h-screen absolute z-30 top-0 left-0 pt-[70px] transition-all
                    ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}
                        selectedKeys={localStorage.getItem('sidebar_item')}
                        mode="inline"
                        items={items}
                    />
                </>
            }
        </ConfigProvider>
    )
}
export default ManagerSidebar