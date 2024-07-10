import { Button, Col, ConfigProvider, Form, Input, Modal, Pagination, Popconfirm, Row, Table } from "antd"
import { IoSearch } from "react-icons/io5";
import "./ManagerAppraiserList.css"
import { useContext, useState } from "react";
import { ResponsiveContext } from "../../context/responsive-context/ResponsiveContext";
import { FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const ManagerAppraiserList = () => {
    const [appraiserKey, setAppraiserKey] = useState()
    const [isAppraiserCreateOpen, setIsAppraiserCreateOpen] = useState(false)
    const [isAppraiserUpdateOpen, setIsAppraiserUpdateOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [pageCurrent, setPageCurrent] = useState(1)
    const [confirmStatus, setConfirmStatus] = useState('')

    const [createForm] = Form.useForm()
    const [updateForm] = Form.useForm()

    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)

    const validateCreateForm = () => {
        createForm.validateFields()
            .then(() => {
                createForm.submit()
                setIsAppraiserCreateOpen(false)
            })
            .catch(() => {
                setIsAppraiserCreateOpen(true)
            })
    }

    const validateUpdateForm = () => {
        updateForm.validateFields()
            .then(() => {
                setIsConfirmOpen(true)
            })
            .catch(() => {
                setIsAppraiserUpdateOpen(true)
            })
    }

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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <span className="border-r border-gray-300 pr-3 hover:text-blue-500 cursor-pointer transition-all"
                            onClick={() => {
                                setIsAppraiserUpdateOpen(true)
                                setAppraiserKey(record.key)
                                updateForm.setFieldsValue({
                                    name: record.name,
                                    email: record.email,
                                    address: record.address,
                                    phone: record.phone
                                })
                            }}
                        >
                            Edit
                        </span>
                        <Popconfirm
                            id="appraiser"
                            placement="left"
                            title='Delete appraiser'
                            description={<span>Are you sure to <span className="font-semibold text-red-500">delete</span> this appraiser?</span>}
                            okText='Yes'
                            cancelText='No'
                        >
                            <span className="pl-3 hover:text-red-500 cursor-pointer transition-all">Delete</span>
                        </Popconfirm>
                    </>
                )
            }
        },
    ]
    const data = [
        {
            key: '1',
            name: 'John Brown',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '2',
            name: 'Jim Green',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '3',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '4',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '5',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '6',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '7',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '8',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '9',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '10',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '11',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '12',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '13',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '14',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '15',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '16',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '17',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '18',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '19',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '20',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
        {
            key: '21',
            name: 'Joe Black',
            address: 'New York No. 1 Lake Park',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
        },
    ]
    return (
        <>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10 ${isAppraiserCreateOpen || isAppraiserUpdateOpen ? '' : 'hidden'}`}></div>
            <div className="w-full px-8 pt-8">
                {isDesktop &&
                    <div className="ml-[247px]">
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Appraiser List</h2>
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
                                    }
                                }
                            }}
                        >
                            <Row justify={"space-between"}>
                                {/* Search Component */}
                                <Col xs={20} className="flex">
                                    <Input className="h-full rounded-tr-none rounded-br-none" />
                                    <Button className="h-full rounded-tl-none rounded-bl-none">
                                        <IoSearch className="text-xl" />
                                    </Button>
                                </Col>
                                {/* Create Modal Component */}
                                <Col xs={4} className="flex items-center justify-end">
                                    <Button className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                                        onClick={() => {
                                            setIsAppraiserCreateOpen(true)
                                            createForm.resetFields()
                                        }}
                                    >
                                        Create <FaPlusCircle />
                                    </Button>
                                </Col>
                            </Row>
                            {/* Table Component */}
                            <Table
                                className="appraiser-table mt-4 cursor-pointer"
                                columns={columns}
                                dataSource={data}
                                rowHoverable={false}
                                pagination={{
                                    defaultCurrent: 1,
                                    defaultPageSize: 10,
                                    position: ["bottomCenter"],

                                }}
                                onChange={onChangeDesktop}
                            />
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        colorPrimary: '#d9d9d9',
                                        colorPrimaryHover: '#d9d9d9',
                                        activeShadow: '0 0 0 0px rgba(255, 255, 255, 0)'
                                    },
                                    Form: {
                                        itemMarginBottom: '8px',
                                        verticalLabelPadding: '0 0 4px'
                                    }
                                }
                            }}
                        >
                            {/* Modal Create */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                            ${isAppraiserCreateOpen ? 'scale-100' : ''}
                            `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsAppraiserCreateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Create appraiser</h3>
                                <Form
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <p className="text-center italic"><span className="font-semibold">Id: </span>{data.length + 1}</p>
                                    <Form.Item
                                        label='Name'
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Wrong email format!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Address'
                                        name={'address'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser address!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Phone Number'
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser phone!'
                                            },
                                            // {
                                            //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                            //     message: 'Wrong US phone number format!'
                                            // }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsAppraiserCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                            {/* Modal update */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                            ${isAppraiserUpdateOpen ? 'scale-100' : ''}
                            `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsAppraiserUpdateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Update appraiser</h3>
                                <Form
                                    layout="vertical"
                                    form={updateForm}
                                >
                                    <p className="text-center italic"><span className="font-semibold">Id: </span>{appraiserKey}</p>
                                    <Form.Item
                                        label='Name'
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Wrong email format!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Address'
                                        name={'address'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser address!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Phone Number'
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser phone!'
                                            },
                                            // {
                                            //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                            //     message: 'Wrong US phone number format!'
                                            // }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Update')
                                            validateUpdateForm()
                                        }}>Save</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsAppraiserUpdateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        </ConfigProvider>
                        <Modal
                            title={`Confirm change appraiser information`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                updateForm.submit()
                                setIsConfirmOpen(false)
                                setIsAppraiserUpdateOpen(false)
                            }}
                            // confirmLoading={confirmLoading}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this appriser?</p>
                        </Modal>
                    </div>
                }
                {isTablet &&
                    <>
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Appraiser List</h2>
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
                                    }
                                }
                            }}
                        >
                            <Row justify={"space-between"}>
                                {/* Search Component */}
                                <Col xs={18} className="flex">
                                    <Input className="h-full rounded-tr-none rounded-br-none" />
                                    <Button className="h-full rounded-tl-none rounded-bl-none">
                                        <IoSearch className="text-xl" />
                                    </Button>
                                </Col>
                                {/* Create Modal Component */}
                                <Col xs={4} className="flex items-center justify-end">
                                    <Button className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                                        onClick={() => {
                                            setIsAppraiserCreateOpen(true)
                                            createForm.resetFields()
                                        }}
                                    >
                                        Create <FaPlusCircle />
                                    </Button>
                                </Col>
                            </Row>
                        </ConfigProvider>
                        {/* Table Component */}
                        <table className="w-full my-4 border-l border-r border-b border-gray-300">
                            <tbody>
                                {data.map((appraiser, index) => {
                                    if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                        return (
                                            <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                                key={index}
                                                onClick={() => {
                                                    setAppraiserKey(appraiser.key)
                                                    setIsAppraiserUpdateOpen(true)
                                                    updateForm.setFieldsValue({
                                                        name: appraiser.name,
                                                        address: appraiser.address,
                                                        phone: appraiser.phone,
                                                        email: appraiser.email
                                                    })
                                                }}
                                            >
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Name</div>
                                                    <div className="py-2">{appraiser.name}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Address</div>
                                                    <div className="py-2">{appraiser.address}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Phone</div>
                                                    <div className="py-2">{appraiser.phone}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Email</div>
                                                    <div className="py-2">{appraiser.email}</div>
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
                                    },
                                    Form: {
                                        itemMarginBottom: '8px',
                                        verticalLabelPadding: '0 0 4px'
                                    }
                                }
                            }}
                        >
                            {/* Modal Create */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                        ${isAppraiserCreateOpen ? 'scale-100' : ''}
                        `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => {
                                            setIsAppraiserCreateOpen(false)
                                        }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Create appraiser</h3>
                                <Form
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <p className="text-center italic"><span className="font-semibold">Id: </span>{data.length + 1}</p>
                                    <Form.Item
                                        label='Name'
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Wrong email format!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Address'
                                        name={'address'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser address!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Phone Number'
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser phone!'
                                            },
                                            // {
                                            //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                            //     message: 'Wrong US phone number format!'
                                            // }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsAppraiserCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                            {/* Modal update and delete */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                        ${isAppraiserUpdateOpen ? 'scale-100' : ''}
                        `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsAppraiserUpdateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Update appraiser</h3>
                                <Form
                                    layout="vertical"
                                    form={updateForm}
                                >
                                    <p className="text-center italic"><span className="font-semibold">Id: </span>{appraiserKey}</p>
                                    <Form.Item
                                        label='Name'
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Wrong email format!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Address'
                                        name={'address'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser address!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Phone Number'
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser phone!'
                                            },
                                            // {
                                            //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                            //     message: 'Wrong US phone number format!'
                                            // }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row justify={"space-between"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Update')
                                            validateUpdateForm()
                                        }}>Update</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setConfirmStatus('Delete')
                                                setIsConfirmOpen(true)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change appraiser information' : 'Confirm delete appraiser'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                updateForm.submit()
                                setIsConfirmOpen(false)
                                setIsAppraiserUpdateOpen(false)
                            }}
                            // confirmLoading={confirmLoading}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this appriser?</p>
                        </Modal>
                    </>
                }
                {isMobile &&
                    <>
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Appraiser List</h2>
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
                                {/* Create Modal Component */}
                                <Col xs={24} className="flex items-center justify-end mt-2">
                                    <Button className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                                        onClick={() => {
                                            setIsAppraiserCreateOpen(true)
                                            createForm.resetFields()
                                        }}
                                    >
                                        Create <FaPlusCircle />
                                    </Button>
                                </Col>
                            </Row>
                        </ConfigProvider>
                        {/* Table Component */}
                        <table className="w-full my-4 border-l border-r border-b border-gray-300">
                            <tbody>
                                {data.map((appraiser, index) => {
                                    if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                        return (
                                            <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                                key={index}
                                                onClick={() => {
                                                    setAppraiserKey(appraiser.key)
                                                    setIsAppraiserUpdateOpen(true)
                                                    updateForm.setFieldsValue({
                                                        name: appraiser.name,
                                                        address: appraiser.address,
                                                        phone: appraiser.phone,
                                                        email: appraiser.email
                                                    })
                                                }}
                                            >
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Name</div>
                                                    <div className="py-2">{appraiser.name}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Address</div>
                                                    <div className="py-2">{appraiser.address}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Phone</div>
                                                    <div className="py-2">{appraiser.phone}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Email</div>
                                                    <div className="py-2">{appraiser.email}</div>
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
                                    },
                                    Form: {
                                        itemMarginBottom: '8px',
                                        verticalLabelPadding: '0 0 4px'
                                    }
                                }
                            }}
                        >
                            {/* Modal Create */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[300px] transition-all scale-0 rounded-md
                    ${isAppraiserCreateOpen ? 'scale-100' : ''}
                    `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => {
                                            setIsAppraiserCreateOpen(false)
                                        }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Create appraiser</h3>
                                <Form
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <p className="text-center italic"><span className="font-semibold">Id: </span>{data.length + 1}</p>
                                    <Form.Item
                                        label='Name'
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Wrong email format!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Address'
                                        name={'address'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser address!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Phone Number'
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser phone!'
                                            },
                                            // {
                                            //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                            //     message: 'Wrong US phone number format!'
                                            // }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsAppraiserCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                            {/* Modal update and delete */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[300px] transition-all scale-0 rounded-md
                    ${isAppraiserUpdateOpen ? 'scale-100' : ''}
                    `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsAppraiserUpdateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Update appraiser</h3>
                                <Form
                                    layout="vertical"
                                    form={updateForm}
                                >
                                    <p className="text-center italic"><span className="font-semibold">Id: </span>{appraiserKey}</p>
                                    <Form.Item
                                        label='Name'
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Wrong email format!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Address'
                                        name={'address'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser address!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Phone Number'
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter appraiser phone!'
                                            },
                                            // {
                                            //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                            //     message: 'Wrong US phone number format!'
                                            // }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Row justify={"space-between"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Update')
                                            validateUpdateForm()
                                        }}>Update</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setConfirmStatus('Delete')
                                                setIsConfirmOpen(true)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change appraiser information' : 'Confirm delete appraiser'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                updateForm.submit()
                                setIsConfirmOpen(false)
                                setIsAppraiserUpdateOpen(false)
                            }}
                            // confirmLoading={confirmLoading}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this appriser?</p>
                        </Modal>
                    </>
                }
            </div>
        </>
    )
}
export default ManagerAppraiserList