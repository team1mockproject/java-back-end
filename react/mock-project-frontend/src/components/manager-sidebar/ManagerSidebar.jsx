import { ConfigProvider, Menu } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveContext from '../client-context';
import { FaXmark } from 'react-icons/fa6';
const ManagerSidebar = (props) => {
    const { isShowSidebar, setIsShowSidebar } = props
    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)

    const items = [
        {
            key: '1',
            label: <span className='font-medium'>Management</span>,
            children: [
                {
                    key: '11',
                    label: <Link>Buyer</Link>,
                },
                {
                    key: '12',
                    label: <Link>Seller</Link>,
                },
                {
                    key: '13',
                    label: <Link>Staff</Link>,
                },
                {
                    key: '14',
                    label: <Link>Appraiser</Link>,
                },
                {
                    key: '15',
                    label: <Link>Auction Asset</Link>,
                },
                {
                    key: '16',
                    label: <Link>Financial</Link>,
                },
                {
                    key: '17',
                    label: <Link>Inventory</Link>,
                },
            ],
        },
        {
            key: '2',
            label: <Link className='font-medium'>Advertising</Link>
        },
        {
            key: '3',
            label: <Link className='font-medium'>Report</Link>
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedColor: 'var(--color-primary)',
                        itemSelectedBg: '#95aa9c'
                    }
                }
            }}
        >
            {isDesktop &&
                <Menu
                    className='w-[256px] h-screen'
                    defaultSelectedKeys={'11'}
                    mode="inline"
                    items={items}

                />
            }
            {isTablet &&
                <>
                    <div className={`absolute w-[256px] z-20 top-0 flex justify-end p-4 transition-all
                        ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}>
                        <FaXmark className='text-2xl text-red-500' onClick={() => { setIsShowSidebar(false) }} />
                    </div>
                    <Menu
                        className={`w-[256px] h-screen absolute top-0 left-0 pt-[70px] transition-all
                        ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}
                        defaultSelectedKeys={'11'}
                        mode="inline"
                        items={items}
                    />
                </>
            }
            {isMobile &&
                <>
                    <div className={`absolute w-[256px] z-20 top-0 flex justify-end p-4 transition-all
                    ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}>
                        <FaXmark className='text-2xl text-red-500' onClick={() => { setIsShowSidebar(false) }} />
                    </div>
                    <Menu
                        className={`w-[256px] h-screen absolute top-0 left-0 pt-[70px] transition-all
                    ${isShowSidebar ? 'translate-x-0' : '-translate-x-64'}`}
                        defaultSelectedKeys={'11'}
                        mode="inline"
                        items={items}
                    />
                </>
            }
        </ConfigProvider>
    )
}
export default ManagerSidebar