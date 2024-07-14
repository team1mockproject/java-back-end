import { Button, Col, ConfigProvider, DatePicker, Form, Input, Modal, Pagination, Popconfirm, Radio, Row, Select, Table } from "antd"
import { IoSearch } from "react-icons/io5";
import { useContext, useState } from "react";
import { ResponsiveContext } from "../../context/responsive-context/ResponsiveContext";
import { FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const ManagerStaffList = () => {
    const [staffKey, setStaffKey] = useState()
    const [isStaffCreateOpen, setIsStaffCreateOpen] = useState(false)
    const [isStaffUpdateOpen, setIsStaffUpdateOpen] = useState(false)
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
                setIsStaffCreateOpen(false)
            })
            .catch(() => {
                setIsStaffCreateOpen(true)
            })
    }

    const validateUpdateForm = () => {
        updateForm.validateFields()
            .then(() => {
                setIsConfirmOpen(true)
            })
            .catch(() => {
                setIsStaffUpdateOpen(true)
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
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
                    <span className={`${record.status === 'Active' ? 'text-blue-500' : (record.status === 'Inactive' ? 'text-red-500' : '')}`}>{record.status}</span>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <span className="border-r border-gray-300 pr-3 hover:text-blue-500 cursor-pointer transition-all"
                            onClick={() => {
                                setIsStaffUpdateOpen(true)
                                setStaffKey(record.key)
                                updateForm.setFieldsValue({
                                    name: record.name,
                                    email: record.email,
                                    code: record.code,
                                    phone: record.phone,
                                    status: record.status,
                                })
                            }}
                        >
                            Edit
                        </span>
                        <Popconfirm
                            id="staff"
                            placement="left"
                            title='Delete staff'
                            description={<span>Are you sure to <span className="font-semibold text-red-500">delete</span> this staff?</span>}
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
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '2',
            name: 'Jim Green',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '3',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Inactive',
        },
        {
            key: '4',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '5',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '6',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '7',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Inactive',
        },
        {
            key: '8',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Inactive',
        },
        {
            key: '9',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '10',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '11',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '12',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '13',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Inactive',
        },
        {
            key: '14',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '15',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '16',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '17',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '18',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Inactive',
        },
        {
            key: '19',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Inactive',
        },
        {
            key: '20',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
        {
            key: '21',
            name: 'Joe Black',
            code: 'S123',
            phone: '+1 123 456 7890',
            email: 'abc@gmail.com',
            password: '123456',
            birthday: '07/07/1995',
            gender: 'male',
            address: 'New York',
            position: 'staff',
            status: 'Active',
        },
    ]
    return (
        <>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10 ${isStaffCreateOpen || isStaffUpdateOpen ? '' : 'hidden'}`}></div>
            <div className="w-full px-8 pt-8">
                {isDesktop &&
                    <div className="ml-[247px]">
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Staff List</h2>
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
                                            setIsStaffCreateOpen(true)
                                            createForm.resetFields()
                                        }}
                                    >
                                        Create <FaPlusCircle />
                                    </Button>
                                </Col>
                            </Row>
                            {/* Table Component */}
                            <Table
                                className="staff-table mt-4 cursor-pointer"
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
                            ${isStaffCreateOpen ? 'scale-100' : ''}
                            `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsStaffCreateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl font-semibold">Add new staff</h3>
                                <Form
                                    className="p-2"
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <span className="font-semibold">Personal information </span>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Name'
                                                name={'name'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff name!'
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
                                                        message: 'Please enter staff email!'
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
                                                label='Birthday'
                                                name={'birthday'}
                                            >
                                                <DatePicker format="DD-MM-YYYY" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Address'
                                                name={'address'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Code'
                                                name={'code'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff code!'
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Phone Number'
                                                name={'phone'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff phone!'
                                                    },
                                                    // {
                                                    //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                                    //     message: 'Wrong US phone number format!'
                                                    // }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label='Password'
                                                name={'password'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff password!'
                                                    }
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label='Gender'
                                                name={'gender'}
                                            >
                                                <Radio.Group>
                                                    <Radio value="male">Male</Radio>
                                                    <Radio value="female">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Position'
                                                name={'position'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select position!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select a position">
                                                    <Option value="staff">Staff</Option>
                                                    <Option value="manager">Manager</Option>
                                                    <Option value="director">Director</Option>
                                                    <Option value="intern">Intern</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsStaffCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                            {/* Modal update */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                            ${isStaffUpdateOpen ? 'scale-100' : ''}
                            `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsStaffUpdateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Update staff</h3>
                                <Form
                                    className="p-2"
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <span className="font-semibold">Personal information </span>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Name'
                                                name={'name'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff name!'
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
                                                        message: 'Please enter staff email!'
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
                                                label='Birthday'
                                                name={'birthday'}
                                            >
                                                <DatePicker format="DD-MM-YYYY" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Address'
                                                name={'address'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Code'
                                                name={'code'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff code!'
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Phone Number'
                                                name={'phone'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff phone!'
                                                    },
                                                    // {
                                                    //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                                    //     message: 'Wrong US phone number format!'
                                                    // }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label='Password'
                                                name={'password'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff password!'
                                                    }
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label='Gender'
                                                name={'gender'}
                                            >
                                                <Radio.Group>
                                                    <Radio value="male">Male</Radio>
                                                    <Radio value="female">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Position'
                                                name={'position'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select position!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select a position">
                                                    <Option value="staff">Staff</Option>
                                                    <Option value="manager">Manager</Option>
                                                    <Option value="director">Director</Option>
                                                    <Option value="intern">Intern</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsStaffCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        </ConfigProvider>
                        <Modal
                            title={`Confirm change staff information`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                updateForm.submit()
                                setIsConfirmOpen(false)
                                setIsStaffUpdateOpen(false)
                            }}
                            // confirmLoading={confirmLoading}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this staff?</p>
                        </Modal>
                    </div>
                }
                {isTablet &&
                    <>
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Staff List</h2>
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
                                            setIsStaffCreateOpen(true)
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
                                {data.map((staff, index) => {
                                    if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                        return (
                                            <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                                key={index}
                                                onClick={() => {
                                                    setStaffKey(staff.key)
                                                    setIsStaffUpdateOpen(true)
                                                    updateForm.setFieldsValue({
                                                        name: staff.name,
                                                        phone: staff.phone,
                                                        email: staff.email,
                                                        password: staff.password,
                                                        birthday: staff.birthday,
                                                        gender: staff.gender,
                                                        address: staff.address,
                                                        position: staff.position,
                                                        status: staff.status,
                                                        code: staff.code,
                                                    })
                                                }}
                                            >
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Name</div>
                                                    <div className="py-2">{staff.name}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Code</div>
                                                    <div className="py-2">{staff.code}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Phone</div>
                                                    <div className="py-2">{staff.phone}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Email</div>
                                                    <div className="py-2">{staff.email}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/4 text-left pl-2 py-2 font-bold">Status</div>
                                                    <div className="py-2">{staff.status}</div>
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
                        ${isStaffCreateOpen ? 'scale-100' : ''}
                        `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => {
                                            setIsStaffCreateOpen(false)
                                        }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Create staff</h3>
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
                                                message: 'Please enter staff name!'
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
                                                message: 'Please enter staff email!'
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
                                        label='Code'
                                        name={'code'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter staff code!'
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
                                                message: 'Please enter staff phone!'
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
                                            onClick={() => { setIsStaffCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                            {/* Modal update and delete */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                        ${isStaffUpdateOpen ? 'scale-100' : ''}
                        `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsStaffUpdateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Update staff</h3>
                                <Form
                                    className="p-2"
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <span className="font-semibold">Personal information </span>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Name'
                                                name={'name'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff name!'
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
                                                        message: 'Please enter staff email!'
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
                                                label='Birthday'
                                                name={'birthday'}
                                            >
                                                <DatePicker format="DD-MM-YYYY" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Address'
                                                name={'address'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Code'
                                                name={'code'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff code!'
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Phone Number'
                                                name={'phone'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff phone!'
                                                    },
                                                    // {
                                                    //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                                    //     message: 'Wrong US phone number format!'
                                                    // }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label='Password'
                                                name={'password'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff password!'
                                                    }
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label='Gender'
                                                name={'gender'}
                                            >
                                                <Radio.Group>
                                                    <Radio value="male">Male</Radio>
                                                    <Radio value="female">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Position'
                                                name={'position'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select position!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select a position">
                                                    <Option value="staff">Staff</Option>
                                                    <Option value="manager">Manager</Option>
                                                    <Option value="director">Director</Option>
                                                    <Option value="intern">Intern</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsStaffCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change staff information' : 'Confirm delete staff'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                updateForm.submit()
                                setIsConfirmOpen(false)
                                setIsStaffUpdateOpen(false)
                            }}
                            // confirmLoading={confirmLoading}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this staff?</p>
                        </Modal>
                    </>
                }
                {isMobile &&
                    <>
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Staff List</h2>
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
                                            setIsStaffCreateOpen(true)
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
                                {data.map((staff, index) => {
                                    if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                        return (
                                            <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                                key={index}
                                                onClick={() => {
                                                    setStaffKey(staff.key)
                                                    setIsStaffUpdateOpen(true)
                                                    updateForm.setFieldsValue({
                                                        name: staff.name,
                                                        code: staff.code,
                                                        phone: staff.phone,
                                                        email: staff.email,
                                                        password: staff.password,
                                                        birthday: staff.birthday,
                                                        gender: staff.gender,
                                                        address: staff.address,
                                                        position: staff.position,
                                                        status: staff.status,
                                                    })
                                                }}
                                            >
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Name</div>
                                                    <div className="py-2">{staff.name}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Code</div>
                                                    <div className="py-2">{staff.code}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Phone</div>
                                                    <div className="py-2">{staff.phone}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Email</div>
                                                    <div className="py-2">{staff.email}</div>
                                                </td>
                                                <td className="border-t border-gray-300 w-full flex">
                                                    <div className="w-1/3 text-left pl-2 py-2 font-bold">Status</div>
                                                    <div className="py-2">{staff.status}</div>
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
                    ${isStaffCreateOpen ? 'scale-100' : ''}
                    `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => {
                                            setIsStaffCreateOpen(false)
                                        }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Create staff</h3>
                                <Form
                                    className="p-2"
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <span className="font-semibold">Personal information </span>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Name'
                                                name={'name'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff name!'
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
                                                        message: 'Please enter staff email!'
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
                                                label='Birthday'
                                                name={'birthday'}
                                            >
                                                <DatePicker format="DD-MM-YYYY" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Address'
                                                name={'address'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Code'
                                                name={'code'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff code!'
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Phone Number'
                                                name={'phone'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff phone!'
                                                    },
                                                    // {
                                                    //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                                    //     message: 'Wrong US phone number format!'
                                                    // }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label='Password'
                                                name={'password'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff password!'
                                                    }
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label='Gender'
                                                name={'gender'}
                                            >
                                                <Radio.Group>
                                                    <Radio value="male">Male</Radio>
                                                    <Radio value="female">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Position'
                                                name={'position'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select position!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select a position">
                                                    <Option value="staff">Staff</Option>
                                                    <Option value="manager">Manager</Option>
                                                    <Option value="director">Director</Option>
                                                    <Option value="intern">Intern</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsStaffCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                            {/* Modal update and delete */}
                            <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[300px] transition-all scale-0 rounded-md
                    ${isStaffUpdateOpen ? 'scale-100' : ''}
                    `}>
                                <span className="flex justify-end">
                                    <FaXmark className='text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200'
                                        onClick={() => { setIsStaffUpdateOpen(false) }}
                                    />
                                </span>
                                <h3 className="text-xl text-center font-semibold">Update staff</h3>
                                <Form
                                    className="p-2"
                                    layout="vertical"
                                    form={createForm}
                                >
                                    <span className="font-semibold">Personal information </span>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Name'
                                                name={'name'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff name!'
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
                                                        message: 'Please enter staff email!'
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
                                                label='Birthday'
                                                name={'birthday'}
                                            >
                                                <DatePicker format="DD-MM-YYYY" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Address'
                                                name={'address'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Code'
                                                name={'code'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff code!'
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label='Phone Number'
                                                name={'phone'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff phone!'
                                                    },
                                                    // {
                                                    //     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                                                    //     message: 'Wrong US phone number format!'
                                                    // }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label='Password'
                                                name={'password'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter staff password!'
                                                    }
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label='Gender'
                                                name={'gender'}
                                            >
                                                <Radio.Group>
                                                    <Radio value="male">Male</Radio>
                                                    <Radio value="female">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Position'
                                                name={'position'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select position!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select a position">
                                                    <Option value="staff">Staff</Option>
                                                    <Option value="manager">Manager</Option>
                                                    <Option value="director">Director</Option>
                                                    <Option value="intern">Intern</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            validateCreateForm()
                                        }}>Create</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsStaffCreateOpen(false) }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change staff information' : 'Confirm delete staff'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                updateForm.submit()
                                setIsConfirmOpen(false)
                                setIsStaffUpdateOpen(false)
                            }}
                            // confirmLoading={confirmLoading}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this staff?</p>
                        </Modal>
                    </>
                }
            </div>
        </>
    )
}
export default ManagerStaffList