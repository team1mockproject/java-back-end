import { Button, Col, ConfigProvider, DatePicker, Form, Input, Modal, Pagination, Popconfirm, Radio, Row, Select, Table } from "antd"
import { IoSearch } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { ResponsiveContext } from "../../context/responsive-context/ResponsiveContext";
import { FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { createAccount, deleteAccount, getAllStaff, updateAccount } from "../../services/AccountService";
import moment from "moment";
import { toast } from "react-toastify";

const ManagerStaffList = () => {
    const [staffData, setStaffData] = useState([]);
    const [staffKey, setStaffKey] = useState()
    const [isStaffCreateOpen, setIsStaffCreateOpen] = useState(false)
    const [isStaffUpdateOpen, setIsStaffUpdateOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [confirmStatus, setConfirmStatus] = useState('')
    const [pageCurrent, setPageCurrent] = useState(1)
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const [createForm] = Form.useForm()
    const [updateForm] = Form.useForm()

    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [status, setStatus] = useState('active');
    const [roleIds, setRoleIds] = useState(2)
    const [birthday, setBirthday] = useState(null);

    const [pwdUpdate, setPwdUpdate] = useState('')

    useEffect(() => {
        fetchStaffData(pageCurrent, searchTerm);
    }, [pageCurrent, searchTerm]);

    const fetchStaffData = async () => {
        try {
            const response = await getAllStaff(pageCurrent, searchTerm);
            setTotalItems(response.data.totalElements)
            setStaffData(response.data.content);
        } catch (error) {
            console.error('Failed to fetch staff data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPageCurrent(1); // Reset to first page on search
    };


    const calculateAge = (birthDateString) => {
        const b = new Date(birthDateString);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - b.getFullYear();
        const monthDifference = currentDate.getMonth() - b.getMonth();
        const dayDifference = currentDate.getDate() - b.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    };

    const validateCreateForm = () => {
        createForm.validateFields()
            .then(values => {
                const age = calculateAge(values.birthday);
                const accountDto = {
                    email: values.email,
                    fullName: values.name,
                    phone: values.phone,
                    age: age,
                    gender: values.gender,
                    status: values.status,
                    roleIds: [roleIds],
                    passWord: values.password,
                    location: {
                        address: values.address
                    }
                };

                createAccount(accountDto)
                    .then(() => {
                        fetchStaffData(pageCurrent, searchTerm); // Refresh the table data
                        setIsStaffCreateOpen(false);
                        toast.success('Create Success!')
                        createForm.resetFields(); // Clear the form fields
                    })
                    .catch(error => {
                        toast.error('Create Failed!')
                    });
            })
            .catch(errorInfo => {
                console.error('Failed to validate form:', errorInfo);
            });
    };


    const validateUpdateForm = () => {
        updateForm.validateFields()
            .then(values => {
                const accountDto = {
                    id: values.id,
                    email: values.email,
                    fullName: values.name,
                    phone: values.phone,
                    age: values.age,
                    gender: values.gender,
                    status: values.status,
                    roleIds: [roleIds],
                    passWord: pwdUpdate === '' ? null : pwdUpdate,
                    location: {
                        locationId: values.locationId,
                        address: values.address
                    }
                };

                updateAccount(accountDto)
                    .then(() => {
                        fetchStaffData(pageCurrent, searchTerm); // Refresh the table data
                        setPwdUpdate('')
                        setIsStaffUpdateOpen(false);
                        toast.success('Update Success!')
                        createForm.resetFields(); // Clear the form fields
                    })
                    .catch(error => {
                        toast.error('Update Failed!')
                    });
            })
            .catch(errorInfo => {
                console.error('Failed to validate form:', errorInfo);
            });
    }

    const handleDelete = async (id) => {
        try {
            await deleteAccount(id);
            setPageCurrent(1)
            setSearchTerm('')
            fetchStaffData(); // Refresh the data after deletion
        } catch (error) {
            console.error('Failed to delete staff:', error);
        }
    };

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
            dataIndex: 'fullName',
            key: 'fullName',
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
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <span className={`${record.status === 'active' ? 'text-blue-500' : (record.status === 'inactive' ? 'text-red-500' : '')}`}>{record.status}</span>
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
                                    name: record.fullName,
                                    email: record.email,
                                    id: record.id,
                                    password: record.passWord,
                                    phone: record.phone,
                                    address: record.location.address,
                                    status: record.status,
                                    gender: record.gender,
                                    age: record.age,
                                    locationId: record.location.locationId
                                })
                            }}
                        >
                            Edit
                        </span>
                        <Popconfirm
                            id=""
                            placement="left"
                            onConfirm={() => {
                                handleDelete(record.id)
                            }}
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
                                    <Input onChange={e => setSearchTerm(e.target.value)} className="h-full rounded-tr-none rounded-br-none" />
                                    <Button onClick={handleSearch} className="h-full rounded-tl-none rounded-bl-none">
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
                                dataSource={staffData}
                                rowHoverable={false}
                                pagination={{
                                    current: pageCurrent,
                                    pageSize: 8,
                                    total: totalItems,
                                    showSizeChanger: false,
                                    // pageSizeOptions: ['10', '20', '50', '100'],
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
                                                    <Radio value="M">Male</Radio>
                                                    <Radio value="F">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Status'
                                                name={'status'}

                                            >
                                                <Select>
                                                    <Option value="active">Active</Option>
                                                    <Option value="inactive">Inactive</Option>

                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={validateCreateForm}>Save</Button>
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
                                    form={updateForm}
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
                                                label='Age'
                                                name={'age'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Address'
                                                name={'address'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label='Code'
                                                name={'id'}

                                            >
                                                <Input disabled />
                                            </Form.Item>

                                            <Form.Item
                                                label='locationId'
                                                name={'locationId'}

                                            >
                                                <Input hidden />
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

                                            >
                                                <Input.Password onChange={e => setPwdUpdate(e.target.value)} />
                                            </Form.Item>

                                            <Form.Item
                                                label='Gender'
                                                name={'gender'}
                                            >
                                                <Radio.Group>
                                                    <Radio value="M">Male</Radio>
                                                    <Radio value="F">Female</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label='Status'
                                                name={'status'}

                                            >
                                                <Select >
                                                    <Option value="active">Active</Option>
                                                    <Option value="inactive">Inactive</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>




                                    <Row justify={"end"} className="mt-8">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                                            onClick={() => {
                                                validateUpdateForm()
                                            }}>Save</Button>
                                        <Button
                                            className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => { setIsStaffUpdateOpen(false) }}
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
                            console.log(record.id)
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
                        </ConfigProvider>

                    </>
                }
            </div>
        </>
    )
}
export default ManagerStaffList