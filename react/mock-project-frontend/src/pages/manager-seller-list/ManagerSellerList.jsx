import { Button, Col, ConfigProvider, Input, Modal, Pagination, Row, Select, Table } from "antd"
import { IoSearch } from "react-icons/io5";
import "./ManagerSellerList.css"
import { useContext, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { ResponsiveContext } from "../../context/responsive-context/ResponsiveContext";
const ManagerSellerList = () => {
    const [sellerData, setSellerData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [pageCurrent, setPageCurrent] = useState(1)
    const [confirmStatus, setConfirmStatus] = useState('')

    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)

    const onChangeDesktop = (pagination, filter, sorter, extra) => {
        setPageCurrent(pagination.current)
    }

    const onChangeTabMob = (current) => {
        setPageCurrent(current)
    }

    const columns = [
        {
            title: 'No.',
            key: 'no',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + 10 * (pageCurrent - 1)}</>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <span className={`${record.status === 'Verified' ? 'text-blue-500' : (record.status === 'Suspend' ? 'text-red-500' : '')}`}>{record.status}</span>
                )
            }
        },
    ]
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Pending',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Pending',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '4',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Suspend',
        },
        {
            key: '5',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '6',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Suspend',
        },
        {
            key: '7',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '8',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '9',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Suspend',
        },
        {
            key: '10',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '11',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '12',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '13',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '14',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '15',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '16',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '17',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '18',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '19',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '20',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
        {
            key: '21',
            name: 'Joe Black',
            age: 32,
            email: 'abc@gmail.com',
            password: '123456',
            address: 'New York No. 1 Lake Park',
            career: 'Doctor',
            phone: '+1 123 456 7890',
            cooperationHistory: 'ABC Auction...',
            status: 'Verified',
        },
    ]
    return (
        <div className="w-full px-8 pt-8">
            {isDesktop &&
                <div className=" ml-[247px]">
                    <h2 className="text-center text-3xl font-medium uppercase mb-4">Seller List</h2>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)'
                                },
                                Button: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)',
                                },
                                Select: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)'
                                },
                                Table: {

                                }
                            }
                        }}
                    >
                        <Row justify={"space-between"}>
                            {/* Search Component */}
                            <Col xs={16} className="flex">
                                <Input className="h-full rounded-tr-none rounded-br-none" />
                                <Button className="h-full rounded-tl-none rounded-bl-none">
                                    <IoSearch className="text-xl" />
                                </Button>
                            </Col>
                            {/* Filter Component */}
                            <Col xs={6} className="flex items-center gap-3">
                                <span>Status: </span>
                                <Select
                                    className="w-full rounded-none"
                                    size="large"
                                    defaultValue={'All'}
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'All',
                                        },
                                        {
                                            value: 'Pending',
                                            label: 'Pending',
                                        },
                                        {
                                            value: 'Verified',
                                            label: 'Verified',
                                        },
                                        {
                                            value: 'Suspend',
                                            label: 'Suspend',
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
                        {/* Table Component */}
                        <Table
                            className="mt-4 cursor-pointer"
                            columns={columns}
                            dataSource={data}
                            pagination={{
                                defaultCurrent: 1,
                                defaultPageSize: 10,
                                position: ["bottomCenter"],

                            }}
                            onChange={onChangeDesktop}
                            onRow={(record) => ({
                                onClick: () => {
                                    setIsModalOpen(true)
                                    setSellerData(record)
                                }
                            })}
                        />
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorPrimary: '#d9d9d9',
                                    colorPrimaryHover: '#d9d9d9',
                                    activeShadow: '0 0 0 0px rgba(255, 255, 255, 0)'
                                }
                            }
                        }}
                    >
                        {/* Modal Component */}
                        <Modal
                            className="seller-detail-info"
                            title='Seller Information'
                            open={isModalOpen}
                            onCancel={() => {
                                setIsModalOpen(false)
                            }}
                            onOk={() => {
                                setIsConfirmOpen(true)
                                setConfirmStatus('Verified')
                            }}
                            okText='Accept'
                            footer={(_, { OkBtn }) => (
                                <>
                                    {sellerData.status === 'Pending' &&
                                        <>
                                            <OkBtn />
                                            <Button
                                                className="bg-red-500 border border-red-500 text-white hover:!border-red-500 hover:!text-white hover:!bg-red-500"
                                                onClick={() => {
                                                    setIsConfirmOpen(true)
                                                    setConfirmStatus('Reject')
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    }
                                    {sellerData.status === 'Verified' &&
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white hover:!border-red-500 hover:!text-white hover:!bg-red-500"
                                            onClick={() => {
                                                setIsConfirmOpen(true)
                                                setConfirmStatus('Suspend')
                                            }}
                                        >
                                            Suspend
                                        </Button>
                                    }
                                    {sellerData.status === 'Suspend' &&
                                        <Button
                                            className="bg-blue-500 border border-blue-500 text-white hover:!border-blue-500 hover:!text-white hover:!bg-blue-500"
                                            onClick={() => {
                                                setIsConfirmOpen(true)
                                                setConfirmStatus('Unsuspend')
                                            }}
                                        >
                                            Unsuspend
                                        </Button>
                                    }
                                </>
                            )}
                            centered={true}>
                            <p className="italic text-center -mt-3"><span className="font-medium">Id:</span> {sellerData.key}</p>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={20} className="pr-1">
                                    <label className="font-semibold" htmlFor="name">Name</label>
                                    <Input readOnly={true} value={sellerData.name} id="name" className="rounded-none" />
                                </Col>
                                <Col xs={4}>
                                    <label className="font-semibold" htmlFor="age">Age</label>
                                    <Input readOnly={true} value={sellerData.age} id="age" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={14} className="pr-1">
                                    <label className="font-semibold" htmlFor="email">Email</label>
                                    <Input readOnly={true} value={sellerData.email} id="email" className="rounded-none" />
                                </Col>
                                <Col xs={10}>
                                    <label className="font-semibold" htmlFor="password">Password</label>
                                    <Input.Password readOnly={true} value={sellerData.password} id="password" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <label className="font-semibold" htmlFor="address">Address</label>
                                <Input readOnly={true} value={sellerData.address} id="address" className="rounded-none" />
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={12} className="pr-1">
                                    <label className="font-semibold" htmlFor="career">Career</label>
                                    <Input readOnly={true} value={sellerData.career} id="career" className="rounded-none" />
                                </Col>
                                <Col xs={12}>
                                    <label className="font-semibold" htmlFor="phone">Phone Number</label>
                                    <Input readOnly={true} value={sellerData.phone} id="phone" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <label className="font-semibold" htmlFor="cooperationHistory">Cooperation History</label>
                                <TextArea readOnly={true} value={sellerData.cooperationHistory} id="cooperationHistory" className="rounded-none" />
                            </Row>
                            <p className={`${sellerData.status === 'Verified' ? 'text-blue-500' : (sellerData.status === 'Suspend' ? 'text-red-500' : '')}`}><span className="font-bold text-black">Status: </span>{sellerData.status}</p>
                        </Modal>
                    </ConfigProvider>
                    <Modal
                        title={`Confirm change account status`}
                        open={isConfirmOpen}
                        centered={true}
                        width={600}
                        onOk={() => {
                            setIsConfirmOpen(false)
                            setIsModalOpen(false)
                        }}
                        // confirmLoading={confirmLoading}
                        onCancel={() => {
                            setIsConfirmOpen(false)
                        }}
                    >
                        <p className="text-base">Do you want to <span className={`${confirmStatus === 'Verified' || confirmStatus === 'Unsuspend' ? 'text-blue-500' : 'text-red-500'} font-semibold`}>{confirmStatus === 'Verified' ? 'verify' : confirmStatus.toLowerCase()}</span> this account?</p>
                    </Modal>
                </div>
            }
            {isTablet &&
                <>
                    <h2 className="text-center text-3xl font-medium uppercase mb-4">Seller List</h2>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)'
                                },
                                Button: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)',
                                },
                                Select: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)'
                                },
                                Table: {

                                }
                            }
                        }}
                    >
                        <Row justify={"space-between"}>
                            {/* Search Component */}
                            <Col xs={16} className="flex">
                                <Input className="h-full rounded-tr-none rounded-br-none" />
                                <Button className="h-full rounded-tl-none rounded-bl-none">
                                    <IoSearch className="text-xl" />
                                </Button>
                            </Col>
                            {/* Filter Component */}
                            <Col xs={6} className="flex items-center gap-3">
                                <span>Status: </span>
                                <Select
                                    className="w-full rounded-none"
                                    size="large"
                                    defaultValue={'All'}
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'All',
                                        },
                                        {
                                            value: 'Pending',
                                            label: 'Pending',
                                        },
                                        {
                                            value: 'Verified',
                                            label: 'Verified',
                                        },
                                        {
                                            value: 'Suspend',
                                            label: 'Suspend',
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
                    </ConfigProvider>
                    {/* Table Component */}
                    <table className="w-full my-4 border-l border-r border-b border-gray-300">
                        <tbody>
                            {data.map((seller, index) => {
                                if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                    return (
                                        <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                            key={index}
                                            onClick={() => {
                                                setIsModalOpen(true)
                                                setSellerData(seller)
                                            }}
                                        >
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Name</div>
                                                <div className="py-2">{seller.name}</div>
                                            </td>
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Age</div>
                                                <div className="py-2">{seller.age}</div>
                                            </td>
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Phone</div>
                                                <div className="py-2">{seller.phone}</div>
                                            </td>
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Email</div>
                                                <div className="py-2">{seller.email}</div>
                                            </td>
                                            <td className="border-t border-t-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Status</div>
                                                <div className="py-2">{seller.status}</div>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        align="center"
                        total={data.length}
                        onChange={onChangeTabMob}
                    />
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorPrimary: '#d9d9d9',
                                    colorPrimaryHover: '#d9d9d9',
                                    activeShadow: '0 0 0 0px rgba(255, 255, 255, 0)'
                                }
                            }
                        }}
                    >
                        {/* Modal Component */}
                        <Modal
                            className="seller-detail-info"
                            title='Seller Information'
                            open={isModalOpen}
                            onCancel={() => {
                                setIsModalOpen(false)
                            }}
                            onOk={() => {
                                setIsConfirmOpen(true)
                                setConfirmStatus('Verified')
                            }}
                            okText='Accept'
                            footer={(_, { OkBtn }) => (
                                <>
                                    {sellerData.status === 'Pending' &&
                                        <>
                                            <OkBtn />
                                            <Button
                                                className="bg-red-500 border border-red-500 text-white hover:!border-red-500 hover:!text-white hover:!bg-red-500"
                                                onClick={() => {
                                                    setIsConfirmOpen(true)
                                                    setConfirmStatus('Reject')
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    }
                                    {sellerData.status === 'Verified' &&
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white hover:!border-red-500 hover:!text-white hover:!bg-red-500"
                                            onClick={() => {
                                                setIsConfirmOpen(true)
                                                setConfirmStatus('Suspend')
                                            }}
                                        >
                                            Suspend
                                        </Button>
                                    }
                                    {sellerData.status === 'Suspend' &&
                                        <Button
                                            className="bg-blue-500 border border-blue-500 text-white hover:!border-blue-500 hover:!text-white hover:!bg-blue-500"
                                            onClick={() => {
                                                setIsConfirmOpen(true)
                                                setConfirmStatus('Unsuspend')
                                            }}
                                        >
                                            Unsuspend
                                        </Button>
                                    }
                                </>
                            )}
                            centered={true}>
                            <p className="italic text-center -mt-3"><span className="font-medium">Id:</span> {sellerData.key}</p>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={20} className="pr-1">
                                    <label className="font-semibold" htmlFor="name">Name</label>
                                    <Input readOnly={true} value={sellerData.name} id="name" className="rounded-none" />
                                </Col>
                                <Col xs={4}>
                                    <label className="font-semibold" htmlFor="age">Age</label>
                                    <Input readOnly={true} value={sellerData.age} id="age" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={14} className="pr-1">
                                    <label className="font-semibold" htmlFor="email">Email</label>
                                    <Input readOnly={true} value={sellerData.email} id="email" className="rounded-none" />
                                </Col>
                                <Col xs={10}>
                                    <label className="font-semibold" htmlFor="password">Password</label>
                                    <Input.Password readOnly={true} value={sellerData.password} id="password" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <label className="font-semibold" htmlFor="address">Address</label>
                                <Input readOnly={true} value={sellerData.address} id="address" className="rounded-none" />
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={12} className="pr-1">
                                    <label className="font-semibold" htmlFor="career">Career</label>
                                    <Input readOnly={true} value={sellerData.career} id="career" className="rounded-none" />
                                </Col>
                                <Col xs={12}>
                                    <label className="font-semibold" htmlFor="phone">Phone Number</label>
                                    <Input readOnly={true} value={sellerData.phone} id="phone" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <label className="font-semibold" htmlFor="cooperationHistory">Cooperation History</label>
                                <TextArea readOnly={true} value={sellerData.cooperationHistory} id="cooperationHistory" className="rounded-none" />
                            </Row>
                            <p className={`${sellerData.status === 'Verified' ? 'text-blue-500' : (sellerData.status === 'Suspend' ? 'text-red-500' : '')}`}><span className="font-bold text-black">Status: </span>{sellerData.status}</p>
                        </Modal>
                    </ConfigProvider>
                    <Modal
                        title={`Confirm change account status`}
                        open={isConfirmOpen}
                        centered={true}
                        width={600}
                        onOk={() => {
                            setIsConfirmOpen(false)
                            setIsModalOpen(false)
                        }}
                        // confirmLoading={confirmLoading}
                        onCancel={() => {
                            setIsConfirmOpen(false)
                        }}
                    >
                        <p className="text-base">Do you want to <span className={`${confirmStatus === 'Verified' || confirmStatus === 'Unsuspend' ? 'text-blue-500' : 'text-red-500'} font-semibold`}>{confirmStatus === 'Verified' ? 'verify' : confirmStatus.toLowerCase()}</span> this account?</p>
                    </Modal>
                </>
            }
            {isMobile &&
                <>
                    <h2 className="text-center text-3xl font-medium uppercase mb-4">Seller List</h2>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)'
                                },
                                Button: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)',
                                },
                                Select: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)'
                                },
                                Table: {

                                }
                            }
                        }}
                    >
                        <Row justify={"space-between"}>
                            {/* Search Component */}
                            <Col xs={24} className="flex">
                                <Input className="h-full rounded-tr-none rounded-br-none py-2" />
                                <Button className="h-full rounded-tl-none rounded-bl-none">
                                    <IoSearch className="text-xl" />
                                </Button>
                            </Col>
                            {/* Filter Component */}
                            <Col xs={24} className="flex items-center gap-3 my-3">
                                <span>Status: </span>
                                <Select
                                    className="w-full rounded-none"
                                    size="large"
                                    defaultValue={'All'}
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'All',
                                        },
                                        {
                                            value: 'Pending',
                                            label: 'Pending',
                                        },
                                        {
                                            value: 'Verified',
                                            label: 'Verified',
                                        },
                                        {
                                            value: 'Suspend',
                                            label: 'Suspend',
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
                    </ConfigProvider>
                    {/* Table Component */}
                    <table className="w-full my-4 border-l border-r border-b border-gray-300">
                        <tbody>
                            {data.map((seller, index) => {
                                if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                    return (
                                        <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                            key={index}
                                            onClick={() => {
                                                setIsModalOpen(true)
                                                setSellerData(seller)
                                            }}
                                        >
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Name</div>
                                                <div className="py-2">{seller.name}</div>
                                            </td>
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Age</div>
                                                <div className="py-2">{seller.age}</div>
                                            </td>
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Phone</div>
                                                <div className="py-2">{seller.phone}</div>
                                            </td>
                                            <td className="border-t border-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Email</div>
                                                <div className="py-2">{seller.email}</div>
                                            </td>
                                            <td className="border-t border-t-gray-300 w-full flex">
                                                <div className="w-1/4 text-left pl-2 py-2 font-bold">Status</div>
                                                <div className="py-2">{seller.status}</div>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        align="center"
                        total={data.length}
                        onChange={onChangeTabMob}
                    />
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorPrimary: '#d9d9d9',
                                    colorPrimaryHover: '#d9d9d9',
                                    activeShadow: '0 0 0 0px rgba(255, 255, 255, 0)'
                                }
                            }
                        }}
                    >
                        {/* Modal Component */}
                        <Modal
                            className="seller-detail-info"
                            title='Seller Information'
                            open={isModalOpen}
                            onCancel={() => {
                                setIsModalOpen(false)
                            }}
                            onOk={() => {
                                setIsConfirmOpen(true)
                                setConfirmStatus('Verified')
                            }}
                            okText='Accept'
                            footer={(_, { OkBtn }) => (
                                <>
                                    {sellerData.status === 'Pending' &&
                                        <>
                                            <OkBtn />
                                            <Button
                                                className="bg-red-500 border border-red-500 text-white hover:!border-red-500 hover:!text-white hover:!bg-red-500"
                                                onClick={() => {
                                                    setIsConfirmOpen(true)
                                                    setConfirmStatus('Reject')
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    }
                                    {sellerData.status === 'Verified' &&
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white hover:!border-red-500 hover:!text-white hover:!bg-red-500"
                                            onClick={() => {
                                                setIsConfirmOpen(true)
                                                setConfirmStatus('Suspend')
                                            }}
                                        >
                                            Suspend
                                        </Button>
                                    }
                                    {sellerData.status === 'Suspend' &&
                                        <Button
                                            className="bg-blue-500 border border-blue-500 text-white hover:!border-blue-500 hover:!text-white hover:!bg-blue-500"
                                            onClick={() => {
                                                setIsConfirmOpen(true)
                                                setConfirmStatus('Unsuspend')
                                            }}
                                        >
                                            Unsuspend
                                        </Button>
                                    }
                                </>
                            )}
                            centered={true}>
                            <p className="italic text-center -mt-3"><span className="font-medium">Id:</span> {sellerData.key}</p>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={20} className="pr-1">
                                    <label className="font-semibold" htmlFor="name">Name</label>
                                    <Input readOnly={true} value={sellerData.name} id="name" className="rounded-none" />
                                </Col>
                                <Col xs={4}>
                                    <label className="font-semibold" htmlFor="age">Age</label>
                                    <Input readOnly={true} value={sellerData.age} id="age" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={14} className="pr-1">
                                    <label className="font-semibold" htmlFor="email">Email</label>
                                    <Input readOnly={true} value={sellerData.email} id="email" className="rounded-none" />
                                </Col>
                                <Col xs={10}>
                                    <label className="font-semibold" htmlFor="password">Password</label>
                                    <Input.Password readOnly={true} value={sellerData.password} id="password" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <label className="font-semibold" htmlFor="address">Address</label>
                                <Input readOnly={true} value={sellerData.address} id="address" className="rounded-none" />
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <Col xs={12} className="pr-1">
                                    <label className="font-semibold" htmlFor="career">Career</label>
                                    <Input readOnly={true} value={sellerData.career} id="career" className="rounded-none" />
                                </Col>
                                <Col xs={12}>
                                    <label className="font-semibold" htmlFor="phone">Phone Number</label>
                                    <Input readOnly={true} value={sellerData.phone} id="phone" className="rounded-none" />
                                </Col>
                            </Row>
                            <Row justify={"space-between"} className="my-3">
                                <label className="font-semibold" htmlFor="cooperationHistory">Cooperation History</label>
                                <TextArea readOnly={true} value={sellerData.cooperationHistory} id="cooperationHistory" className="rounded-none" />
                            </Row>
                            <p className={`${sellerData.status === 'Verified' ? 'text-blue-500' : (sellerData.status === 'Suspend' ? 'text-red-500' : '')}`}><span className="font-bold text-black">Status: </span>{sellerData.status}</p>
                        </Modal>
                    </ConfigProvider>
                    <Modal
                        title={`Confirm change account status`}
                        open={isConfirmOpen}
                        centered={true}
                        width={600}
                        onOk={() => {
                            setIsConfirmOpen(false)
                            setIsModalOpen(false)
                        }}
                        // confirmLoading={confirmLoading}
                        onCancel={() => {
                            setIsConfirmOpen(false)
                        }}
                    >
                        <p className="text-base">Do you want to <span className={`${confirmStatus === 'Verified' || confirmStatus === 'Unsuspend' ? 'text-blue-500' : 'text-red-500'} font-semibold`}>{confirmStatus === 'Verified' ? 'verify' : confirmStatus.toLowerCase()}</span> this account?</p>
                    </Modal>
                </>
            }
        </div>
    )
}
export default ManagerSellerList