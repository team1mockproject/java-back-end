import { useContext, useEffect, useState } from "react"
import ResponsiveContext from "../../context/responsive-context"
import { Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Image, Input, message, Modal, Pagination, Popconfirm, Row, Select, Table, Upload } from "antd"
import { IoSearch } from "react-icons/io5"
import { FaFileExcel, FaFileWord, FaListUl, FaPlusCircle } from "react-icons/fa"
import { FaArrowDownLong, FaArrowRightLong, FaFilePdf } from "react-icons/fa6"
import { TiExport } from "react-icons/ti"
import TextArea from "antd/es/input/TextArea"
import Search from "antd/es/input/Search"
import { HiXMark } from "react-icons/hi2"
import ModalStateContext from "../../context/modal-state-context"
import { getAllAsset } from "../../services/AssetService"

const ManagerAssetList = () => {
    const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext)
    const [assetKey, setAssetKey] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
    const [isViewMode, setIsViewMode] = useState(true)
    const [isCreateMode, setIsCreateMode] = useState(false)
    const [serviceSelected, setServiceSelected] = useState([])
    const [confirmStatus, setConfirmStatus] = useState('')
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [modalServiceSelected, setModalServiceSelected] = useState([])
    const [uploadStatus, setUploadStatus] = useState('No upload')
    const [dataAsset, setDataAsset] = useState([])

    const [pageCurrent, setPageCurrent] = useState(1)
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const { modalState, setModalState } = useContext(ModalStateContext)

    const [form] = Form.useForm()


    const fetchAssets = async () => {
        try {
            const response = await getAllAsset(pageCurrent, searchTerm);
            setTotalItems(response.data.totalElements)
            setDataAsset(response.data.content);
        } catch (error) {
            console.error("Error fetching assets:", error);
        }
    };

    useEffect(() => {
        fetchAssets(pageCurrent, searchTerm);
    }, [pageCurrent, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPageCurrent(1); // Reset to first page on search
    };

    const validateUpdateForm = () => {
        form.validateFields()
            .then(() => {
                setIsConfirmOpen(true)
            })
            .catch(() => {
                setIsModalOpen(true)
            })
    }

    const onChangeDesktop = (pagination, filter, sorter, extra) => {
        setPageCurrent(pagination.current)
    }

    const onChangeTabMob = (current) => {
        setPageCurrent(current)
    }

    const onChangeSelected = (event, key) => {

        let serviceList = [...modalServiceSelected]
        if (event.target.checked) {
            serviceList.push(key)
        } else {
            let index = serviceList.indexOf(key)
            if (index !== -1) {
                serviceList.splice(index, 1)
            }
        }
        setModalServiceSelected(serviceList)
    }

    const uploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', // URL server upload
        headers: {
            authorization: 'authorization-text', // access_token
        },
        disabled: isViewMode,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setUploadStatus('Uploading')
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setUploadStatus('Upload success')
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                setUploadStatus('Upload error')
                message.error(`${info.file.name} file upload failed.`);
            } else if (info.file.status === 'removed') {
                setUploadStatus('No upload')
            }
        },

    };

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
            dataIndex: 'assetName',
            key: 'assetName',
        },
        {
            title: 'Category',
            dataIndex: 'categoryAsset',
            key: 'categoryAsset',
            render: (categoryAsset) => categoryAsset?.name || 'N/A',
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin',
        },
        {
            title: 'Market price',
            dataIndex: 'marketPrice',
            key: 'marketPrice',
        },
        {
            title: 'Status',
            dataIndex: 'assetStatus',
            key: 'assetStatus',
        },
        {
            title: 'Legal Status',
            dataIndex: 'legalStatus',
            key: 'legalStatus',
        },
        {
            title: <span className="block text-center">Action</span>,
            key: 'action',
            render: (_, record) => {
                return (
                    <div className="text-center">
                        <span className="border-r border-gray-300 px-3 hover:text-blue-500 cursor-pointer transition-all"
                            onClick={(event) => {
                                event.stopPropagation()
                                setIsViewMode(false)
                                form.setFieldsValue({
                                    key: record.key,
                                    name: record.name,
                                    category: record.category,
                                    owner: record.owner,
                                    marketPrice: record.marketPrice?.toLocaleString(),
                                    status: record.status,
                                    inventory: record.inventory,
                                    description: record.description,
                                    email: record.email,
                                    origin: record.origin,
                                    appraiser: record.appraiser,
                                    valuation: record.valuation?.toLocaleString(),
                                    // appraisalDocument: record.appraisalDocument,
                                    // legalDocument: record.legalDocument,
                                    assetImages: record.images,
                                    listingFee: record.listingFee?.toLocaleString(),
                                    advertiseFee: record.advertiseFee?.toLocaleString(),
                                    commissionFee: record.commissionFee?.toLocaleString(),
                                    deliveryFee: record.deliveryFee?.toLocaleString(),
                                    listingDate: record.listingDate,
                                    primaryServices: record.primaryServices,
                                })
                                setModalState(true)
                                setIsModalOpen(true)
                                setIsCreateMode(false)
                            }}
                        >
                            Edit
                        </span>
                        <Popconfirm
                            id="asset"
                            placement="left"
                            title='Delete asset'
                            description={<span>Are you sure to <span className="font-semibold text-red-500">delete</span> this asset?</span>}
                            okText='Yes'
                            cancelText='No'
                            onConfirm={(event) => { event.stopPropagation() }}
                            onCancel={(event) => { event.stopPropagation() }}
                        >
                            <span className="pl-3 hover:text-red-500 cursor-pointer transition-all" onClick={(event) => { event.stopPropagation() }}>Delete</span>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]

    const economyServicesData = [
        {
            key: '1',
            name: 'USPS Media Mail',
            time: '2 - 8 business days',
        }
    ]
    return (
        <>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10 ${isModalOpen || isServiceModalOpen ? '' : 'hidden'}`}></div>
            <div className="w-full px-8 pt-8">
                {isDesktop &&
                    <div className="ml-[247px]">
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Asset List</h2>
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
                            <div className="w-full">
                                <Row justify={"space-between"}>
                                    {/* Search Component */}
                                    <Col xs={19} className="flex">
                                        <Input onChange={e => setSearchTerm(e.target.value)} className="h-full rounded-tr-none rounded-br-none" placeholder="Search for asset" />
                                        <Button onClick={handleSearch} className="h-full rounded-tl-none rounded-bl-none">
                                            <IoSearch className="text-xl" />
                                        </Button>
                                    </Col>
                                    {/* Create Modal Component */}
                                    <Col className="flex items-center justify-end gap-3">
                                        <Button className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                                            onClick={() => {
                                                form.resetFields()
                                                form.setFieldValue('listingDate', `${String(new Date().getDate()).length === 1 ? '0' + String(new Date().getDate()) : String(new Date().getDate())}/${String(new Date().getMonth() + 1).length === 1 ? '0' + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1)}/${new Date().getFullYear()}`)
                                                form.setFieldValue('key', dataAsset.length + 1)
                                                setIsModalOpen(true)
                                                setIsViewMode(false)
                                                setModalState(true)
                                                setIsCreateMode(true)
                                            }}
                                        >
                                            <FaPlusCircle /> New Asset
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3" align={"bottom"} justify={"space-between"}>
                                    <Col xs={17} className="flex gap-5">
                                        <Col xs={6} xl={5}>
                                            <h3>Status: </h3>
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
                                                        value: 'Sold',
                                                        label: 'Sold',
                                                    },
                                                    {
                                                        value: 'Selling',
                                                        label: 'Selling',
                                                    },
                                                    {
                                                        value: 'Upcoming',
                                                        label: 'Upcoming',
                                                    },
                                                    {
                                                        value: 'In progress',
                                                        label: 'In progress',
                                                    }
                                                ]}
                                            />
                                        </Col>
                                        <Col xs={18} xl={19}>
                                            <h3 className="">Price: </h3>
                                            <div className="flex gap-2 items-center justify-between">
                                                <Input id="priceFrom" addonAfter='USD' size="large" />
                                                <FaArrowRightLong className="text-3xl" />
                                                <Input id="priceFrom" addonAfter='USD' size="large" />
                                            </div>
                                        </Col>
                                    </Col>
                                    <Col>
                                        <Button className="w-full bg-[var(--color-primary)] text-white !py-2 h-fit text-base hover:!border-[var(--color-primary)] hover:!text-[var(--color-primary)]"
                                            onClick={() => {
                                                // setIsassetCreateOpen(true)
                                                // createForm.resetFields()
                                            }}
                                        >
                                            <TiExport /> Export
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Table Component */}
                                <Table
                                    className="manager-asset-table mt-4 cursor-pointer"
                                    columns={columns}
                                    dataSource={dataAsset}
                                    pagination={{
                                        current: pageCurrent,
                                        pageSize: 8,
                                        total: totalItems,
                                        showSizeChanger: false,
                                        // pageSizeOptions: ['10', '20', '50', '100'],
                                        position: ["bottomCenter"],

                                    }}
                                    onChange={onChangeDesktop}
                                    onRow={(record) => {
                                        return {
                                            onClick: () => {
                                                setModalState(true)
                                                setIsViewMode(true)
                                                setIsCreateMode(false)
                                                form.setFieldsValue({
                                                    key: record.key,
                                                    name: record.name,
                                                    category: record.category,
                                                    owner: record.owner,
                                                    marketPrice: record.marketPrice?.toLocaleString(),
                                                    status: record.status,
                                                    inventory: record.inventory,
                                                    description: record.description,
                                                    email: record.email,
                                                    origin: record.origin,
                                                    appraiser: record.appraiser,
                                                    valuation: record.valuation?.toLocaleString(),
                                                    // appraisalDocument: record.appraisalDocument,
                                                    // legalDocument: record.legalDocument,
                                                    assetImages: record.images,
                                                    listingFee: record.listingFee.toLocaleString(),
                                                    advertiseFee: record.advertiseFee.toLocaleString(),
                                                    commissionFee: record.commissionFee.toLocaleString(),
                                                    deliveryFee: record.deliveryFee.toLocaleString(),
                                                    listingDate: record.listingDate,
                                                    primaryServices: record.primaryServices,
                                                })
                                                setIsModalOpen(true)
                                            }
                                        }
                                    }}
                                />
                            </div>
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
                                        itemMarginBottom: '12px',
                                        verticalLabelPadding: '0px'
                                    }
                                }
                            }}
                        >
                            {/* Detail Asset Modal */}
                            <Form
                                className={`asset-detail-info absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[1024px] px-10 py-6 rounded-xl ${isModalOpen ? '' : 'hidden'}`}
                                form={form}
                                layout="vertical"
                            >

                                <div
                                    className="relative flex justify-end"
                                    onClick={() => {
                                        form.resetFields()
                                        setIsModalOpen(false)
                                        setModalState(false)
                                    }}
                                >
                                    <HiXMark className="text-2xl cursor-pointer transition-all hover:bg-[#d9d9d9]" />
                                </div>
                                <h1 className="text-center text-3xl font-semibold">Asset Information</h1>
                                <p className="italic text-center mt-3 pb-3 text-lg font-normal"><span className="font-medium">Id:</span> {form.getFieldValue('key')}</p>
                                <div className="h-[450px] overflow-y-auto overflow-x-hidden">
                                    <Row justify={"space-between"} className="my-3 px-2">
                                        <Col xs={15}>

                                            {/* Asset type */}
                                            <Form.Item
                                                name='category'
                                                label={<span className="font-semibold">Type</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="category"
                                                    className="w-full mt-1"
                                                    disabled={!isCreateMode}
                                                    placeholder='Choose type'
                                                    options={[
                                                        {
                                                            value: 'Book',
                                                            label: 'Book',
                                                        },
                                                        {
                                                            value: 'Vehicle',
                                                            label: 'Vehicle',
                                                        },
                                                        {
                                                            value: 'Furniture',
                                                            label: 'Furniture',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>

                                            {/* Asset name */}
                                            <Form.Item
                                                name='name'
                                                label={<span className="font-semibold">Asset name</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter asset name!'
                                                    }
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="name" className="" placeholder="Enter asset name" />
                                            </Form.Item>

                                            {/* Asset description */}
                                            <span className="font-semibold">DESCRIPTION</span>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="font-bold cursor-pointer text-center inline-block w-[32px] h-[32px] leading-[30px] border border-[#d9d9d9] rounded-md">B</span>
                                                <div className="cursor-pointer w-[32px] h-[32px] border border-[#d9d9d9] rounded-md p-2">
                                                    <FaListUl className="" />
                                                </div>
                                                <Select
                                                    className="!w-[150px]"
                                                    placeholder={'Custom Sample'}
                                                    disabled={!isCreateMode}
                                                    options={[
                                                        {
                                                            value: 'Custom Sample',
                                                            label: 'Custom Sample',
                                                        },
                                                    ]}
                                                />
                                                <span className="underline cursor-pointer">Show all options</span>
                                            </div>
                                            <Form.Item
                                                name='description'
                                            >
                                                <TextArea className="mt-3" disabled={!isCreateMode} rows={6} id="description" placeholder="Write a detailed description of your item, or save time and let AI draft it for you" />
                                            </Form.Item>

                                            {/* Asset market price */}
                                            <Form.Item
                                                name='marketPrice'
                                                label={<span className="font-semibold">Market price</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter market price!'
                                                    },
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="marketPrice" placeholder="Enter market price" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset email */}
                                            <Form.Item
                                                name='email'
                                                label={<span className="font-semibold">Owner</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter owner email!'
                                                    },
                                                    {
                                                        type: 'email',
                                                        message: 'Wrong email format!'
                                                    }
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="email" placeholder="Enter email owner" />
                                            </Form.Item>

                                            {/* Asset origin */}
                                            <Form.Item
                                                name='origin'
                                                label={<span className="font-semibold">Origin</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter origin!'
                                                    },
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="origin" placeholder="Enter origin" />
                                            </Form.Item>

                                            {/* Asset appraiser */}
                                            <Form.Item
                                                name='appraiser'
                                                label={<span className="font-semibold">Appraiser</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter appraiser name!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="appraiser" placeholder="Enter appraiser" />
                                            </Form.Item>

                                            {/* Asset valuation */}
                                            <Form.Item
                                                name='valuation'
                                                label={<span className="font-semibold">Valuation</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter asset valuation!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="valuation" placeholder="Enter valuation" suffix='USD' />
                                            </Form.Item>

                                            <div className="flex justify-between">
                                                {/* Asset appraisal document */}
                                                <div className="w-1/3">
                                                    <span className="font-semibold flex items-center"><span className="text-red-500 inline-block mr-1 text-lg">*</span>Appraisal Document</span>
                                                    <Form.Item
                                                        name='appraisalDocument'
                                                    // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="appraisalDocument">Choose file</label>}
                                                    >
                                                        {/* <Input readOnly={true} id="appraisalDocument" type="file" className="!hidden" /> */}
                                                        <Upload {...uploadProps}>
                                                            {uploadStatus === 'No upload' ? <Button disabled={isViewMode}>Choose file</Button> : ''}
                                                        </Upload>
                                                    </Form.Item>
                                                </div>

                                                {/* Asset legal document */}
                                                <div className="w-1/3">
                                                    <span className="font-semibold flex items-center"><span className="text-red-500 inline-block mr-1 text-lg">*</span>Legal Document</span>
                                                    <Form.Item
                                                        name='legalDocument'
                                                    // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="legalDocument">Choose file</label>}
                                                    >
                                                        {/* <Input readOnly={true} id="legalDocument" type="file" className="!hidden" /> */}
                                                        <Upload {...uploadProps}>
                                                            {uploadStatus === 'No upload' ? <Button disabled={isViewMode}>Choose file</Button> : ''}
                                                        </Upload>
                                                    </Form.Item>
                                                </div>

                                                {/* Asset status */}
                                                <Form.Item
                                                    name='status'
                                                    className="w-[120px]"
                                                    label={<span className="font-semibold">Status</span>}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please choose category!'
                                                        }
                                                    ]}
                                                >
                                                    <Select
                                                        id="status"
                                                        className="w-full mt-1 h-10"
                                                        disabled={isViewMode}
                                                        placeholder='Choose status'
                                                        options={[
                                                            {
                                                                value: 'Waiting',
                                                                label: 'Waiting',
                                                            },
                                                            {
                                                                value: 'Approved',
                                                                label: 'Approved',
                                                            },
                                                            {
                                                                value: 'Rejected',
                                                                label: 'Rejected',
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col xs={8}>
                                            {/* Asset images */}
                                            <div className="border border-[#d9d9d9] flex justify-center items-center mb-1 relative h-[200px]">
                                                <Form.Item
                                                    name='assetImages'
                                                    className="pt-12"
                                                // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="assetImages">Choose file</label>}
                                                >
                                                    {/* <Input readOnly={true} id="assetImages" type="file" className="!hidden" /> */}
                                                    <Upload
                                                        {...uploadProps}
                                                        showUploadList={false}
                                                    >
                                                        <Button disabled={isViewMode}>Upload images</Button>
                                                    </Upload>
                                                </Form.Item>
                                                <div className="absolute bottom-2">
                                                    <span className="block text-center">File type: *.png/jpg/jpeg</span>
                                                    <span className="block text-center">Size: less than 2MB</span>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <Image.PreviewGroup
                                                    preview={{
                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                    }}
                                                >
                                                    <div className="flex justify-between">
                                                        {form.getFieldValue('assetImages') &&
                                                            form.getFieldValue('assetImages').map(image => {
                                                                return (
                                                                    <div key={image} className="w-[100px] h-[100px] border border-[#d9d9d9]">
                                                                        <Image className="p-3" width={100} height={100} src={`${image}`} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Image.PreviewGroup>
                                            </div>

                                            {/* Asset listing fee */}
                                            <Form.Item
                                                name='listingFee'
                                                label={<span className="font-semibold">Listing fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter listing fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="listingFee" placeholder="Enter listing fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset advertise fee */}
                                            <Form.Item
                                                name='advertiseFee'
                                                label={<span className="font-semibold">Advertise fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter advertise fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="advertiseFee" placeholder="Enter advertise fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Commission fee */}
                                            <Form.Item
                                                name='commissionFee'
                                                label={<span className="font-semibold">Commission fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter commission fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="commissionFee" placeholder="Enter commission fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Delivery fee */}
                                            <Form.Item
                                                name='deliveryFee'
                                                label={<span className="font-semibold">Delivery fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter delivery fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="deliveryFee" placeholder="Enter delivery fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Inventory  */}
                                            <Form.Item
                                                name='inventory'
                                                label={<span className="font-semibold">Inventory</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="inventory"
                                                    className="w-full mt-1 h-10"
                                                    disabled={isViewMode}
                                                    placeholder='Choose inventory'
                                                    options={[
                                                        {
                                                            value: 'New York Library',
                                                            label: 'New York Library',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>

                                            {/* Listing date */}
                                            <span className="font-semibold">Listing date:</span>
                                            <Form.Item
                                                name='listingDate'
                                                className="-mt-[6px]"
                                            >
                                                <Input readOnly={true} id="listingDate" className="border-none px-0 py-0" />
                                            </Form.Item>

                                            {/* Primary services */}
                                            <span className="font-semibold">Primary services:</span>
                                            <Form.Item
                                                name='primaryServices'
                                            >
                                                <Input readOnly={true} id="primaryServices" className="border-none px-0 py-0 -mt-1" />
                                            </Form.Item>
                                            <Button
                                                disabled={isViewMode}
                                                className="-mt-1"
                                                onClick={() => {
                                                    setServiceSelected(form.getFieldValue('primaryServices'))
                                                    setModalServiceSelected(form.getFieldValue('primaryServices'))
                                                    setIsServiceModalOpen(true)
                                                }}>+ Add primary service</Button>
                                        </Col>
                                    </Row>
                                </div>
                                {!isViewMode && !isCreateMode &&
                                    <Row justify={"center"} className="mt-8 gap-2">
                                        <Button
                                            className="bg-white border border-[#9589c9] text-[#9589c9] cursor-pointer hover:!bg-[#9589c9] hover:!text-white hover:!border-[#9589c9]"
                                            onClick={() => {
                                                form.setFieldsValue({
                                                    appraiser: "",
                                                    valuation: "",
                                                    // appraisalDocument: "",
                                                    // legalDocument: "",
                                                    status: "",
                                                    assetImages: "",
                                                    listingFee: "",
                                                    advertiseFee: "",
                                                    commissionFee: "",
                                                    deliveryFee: "",
                                                    primaryServices: "",
                                                })
                                            }}
                                        >
                                            Clear
                                        </Button>
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setIsModalOpen(false)
                                                setModalState(false)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Update')
                                            validateUpdateForm()
                                        }}>Save</Button>
                                    </Row>
                                }
                                {isCreateMode &&
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Create')
                                            validateUpdateForm()
                                        }}>Save</Button>
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setIsModalOpen(false)
                                                setModalState(false)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                }
                            </Form>

                            <Modal
                                title='Add services'
                                open={isServiceModalOpen}
                                width={700}
                                centered={true}
                                onCancel={() => {
                                    setIsServiceModalOpen(false)
                                    setModalState(false)
                                }}
                                onOk={() => {
                                    form.setFieldValue('primaryServices', modalServiceSelected)
                                    setServiceSelected(modalServiceSelected)
                                    setIsServiceModalOpen(false)
                                }}
                            >
                                <Search placeholder="Find a shipping service" />
                                <p className="mt-5 mb-4">Select up to 4 domestic shipping services for your listing</p>
                                <span className="font-semibold mb-3 block">Economy services</span>
                                <div className="h-[300px] overflow-y-auto">
                                    {economyServicesData.map((service) => {
                                        return (
                                            <div key={service.key} className="mb-2 flex items-start gap-2">
                                                <Checkbox
                                                    id={`service${service.key}`}

                                                    onChange={(event) => { onChangeSelected(event, service.key) }}
                                                    defaultChecked={serviceSelected?.includes(service.key)}
                                                />
                                                <label htmlFor={`service${service.key}`}>
                                                    <span className="block">{service.name}</span>
                                                    <span className="block text-gray-400">{service.time}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Modal>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change appraiser information' : 'Confirm delete appraiser'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                form.submit()
                                setIsConfirmOpen(false)
                                setIsModalOpen(false)
                                setModalState(false)
                            }}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this appriser?</p>
                        </Modal>
                    </div>
                }
                {isTablet &&
                    <div className="">
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Asset List</h2>
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
                            <div className="w-full">
                                <Row justify={"space-between"}>
                                    {/* Search Component */}
                                    <Col xs={24} className="flex">
                                        <Input className="h-full rounded-tr-none rounded-br-none py-3" placeholder="Search for asset" />
                                        <Button className="h-full rounded-tl-none rounded-bl-none">
                                            <IoSearch className="text-xl" />
                                        </Button>
                                    </Col>
                                </Row>
                                <Row justify={"space-between"} className="mt-2">
                                    {/* Create Modal Component */}
                                    <Col className="flex items-center justify-end gap-3">
                                        <Button className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                                            onClick={() => {
                                                form.resetFields()
                                                form.setFieldValue('listingDate', `${String(new Date().getDate()).length === 1 ? '0' + String(new Date().getDate()) : String(new Date().getDate())}/${String(new Date().getMonth() + 1).length === 1 ? '0' + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1)}/${new Date().getFullYear()}`)
                                                form.setFieldValue('key', data.length + 1)
                                                setIsModalOpen(true)
                                                setIsViewMode(false)
                                                setModalState(true)
                                                setIsCreateMode(true)
                                            }}
                                        >
                                            <FaPlusCircle /> New Asset
                                        </Button>
                                    </Col>

                                    {/* Export */}
                                    <Col>
                                        <Button className="w-full bg-[var(--color-primary)] text-white !py-2 h-fit text-base hover:!border-[var(--color-primary)] hover:!text-[var(--color-primary)]"
                                            onClick={() => {
                                                // setIsassetCreateOpen(true)
                                                // createForm.resetFields()
                                            }}
                                        >
                                            <TiExport /> Export
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3" align={"bottom"} justify={"space-between"}>
                                    <Col xs={24} className="flex gap-5">
                                        <Col xs={6} xl={5}>
                                            <h3>Status: </h3>
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
                                                        value: 'Sold',
                                                        label: 'Sold',
                                                    },
                                                    {
                                                        value: 'Selling',
                                                        label: 'Selling',
                                                    },
                                                    {
                                                        value: 'Upcoming',
                                                        label: 'Upcoming',
                                                    },
                                                    {
                                                        value: 'In progress',
                                                        label: 'In progress',
                                                    }
                                                ]}
                                            />
                                        </Col>
                                        <Col xs={17} xl={19}>
                                            <h3 className="">Price: </h3>
                                            <div className="flex gap-2 items-center justify-between">
                                                <Input id="priceFrom" addonAfter='USD' size="large" />
                                                <FaArrowRightLong className="text-3xl" />
                                                <Input id="priceFrom" addonAfter='USD' size="large" />
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>

                                {/* Table Component */}
                                <table className="w-full my-4 border-l border-r border-b border-gray-300">
                                    <tbody>
                                        {data.map((asset, index) => {
                                            if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                                return (
                                                    <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                                        key={index}
                                                        onClick={() => {
                                                            setAssetKey(asset.key)
                                                            setIsViewMode(false)
                                                            setIsCreateMode(false)
                                                            setIsModalOpen(true)
                                                            setModalState(true)
                                                            form.setFieldsValue({
                                                                key: asset.key,
                                                                name: asset.name,
                                                                category: asset.category,
                                                                owner: asset.owner,
                                                                marketPrice: asset.marketPrice.toLocaleString(),
                                                                status: asset.status,
                                                                inventory: asset.inventory,
                                                                description: asset.description,
                                                                email: asset.email,
                                                                origin: asset.origin,
                                                                appraiser: asset.appraiser,
                                                                valuation: asset.valuation.toLocaleString(),
                                                                // appraisalDocument: asset.appraisalDocument,
                                                                // legalDocument: asset.legalDocument,
                                                                assetImages: asset.images,
                                                                listingFee: asset.listingFee.toLocaleString(),
                                                                advertiseFee: asset.advertiseFee.toLocaleString(),
                                                                commissionFee: asset.commissionFee.toLocaleString(),
                                                                deliveryFee: asset.deliveryFee.toLocaleString(),
                                                                listingDate: asset.listingDate,
                                                                primaryServices: asset.primaryServices,
                                                            })
                                                        }}
                                                    >
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/4 text-left pl-2 py-2 font-bold">Name</div>
                                                            <div className="py-2">{asset.name}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/4 text-left pl-2 py-2 font-bold">Category</div>
                                                            <div className="py-2">{asset.category}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/4 text-left pl-2 py-2 font-bold">Owner</div>
                                                            <div className="py-2">{asset.owner}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/4 text-left pl-2 py-2 font-bold">Market price</div>
                                                            <div className="py-2">{`${asset.marketPrice.toLocaleString()} USD`}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/4 text-left pl-2 py-2 font-bold">Status</div>
                                                            <div className="py-2">{asset.status}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/4 text-left pl-2 py-2 font-bold">Inventory</div>
                                                            <div className="py-2">{asset.inventory}</div>
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
                            </div>
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
                                        itemMarginBottom: '12px',
                                        verticalLabelPadding: '0px'
                                    }
                                }
                            }}
                        >
                            {/* Detail Asset Modal */}
                            <Form
                                className={`asset-detail-info absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[calc(100vw-50px)] px-10 py-6 rounded-xl ${isModalOpen ? '' : 'hidden'}`}
                                form={form}
                                layout="vertical"
                            >

                                <div
                                    className="relative flex justify-end"
                                    onClick={() => {
                                        form.resetFields()
                                        setIsModalOpen(false)
                                        setModalState(false)
                                    }}
                                >
                                    <HiXMark className="text-2xl cursor-pointer transition-all hover:bg-[#d9d9d9]" />
                                </div>
                                <h1 className="text-center text-3xl font-semibold">Asset Information</h1>
                                <p className="italic text-center mt-3 pb-3 text-lg font-normal"><span className="font-medium">Id:</span> {form.getFieldValue('key')}</p>
                                <div className="h-[300px] overflow-y-auto overflow-x-hidden">
                                    <Row justify={"space-between"} className="my-3 px-2">
                                        <Col xs={15}>

                                            {/* Asset type */}
                                            <Form.Item
                                                name='category'
                                                label={<span className="font-semibold">Type</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="category"
                                                    className="w-full mt-1"
                                                    disabled={!isCreateMode}
                                                    placeholder='Choose type'
                                                    options={[
                                                        {
                                                            value: 'Book',
                                                            label: 'Book',
                                                        },
                                                        {
                                                            value: 'Vehicle',
                                                            label: 'Vehicle',
                                                        },
                                                        {
                                                            value: 'Furniture',
                                                            label: 'Furniture',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>

                                            {/* Asset name */}
                                            <Form.Item
                                                name='name'
                                                label={<span className="font-semibold">Asset name</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter asset name!'
                                                    }
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="name" className="" placeholder="Enter asset name" />
                                            </Form.Item>

                                            {/* Asset description */}
                                            <span className="font-semibold">DESCRIPTION</span>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="font-bold cursor-pointer text-center inline-block w-[32px] h-[32px] leading-[30px] border border-[#d9d9d9] rounded-md">B</span>
                                                <div className="cursor-pointer w-[32px] h-[32px] border border-[#d9d9d9] rounded-md p-2">
                                                    <FaListUl className="" />
                                                </div>
                                                <Select
                                                    className="!w-[150px]"
                                                    placeholder={'Custom Sample'}
                                                    disabled={!isCreateMode}
                                                    options={[
                                                        {
                                                            value: 'Custom Sample',
                                                            label: 'Custom Sample',
                                                        },
                                                    ]}
                                                />
                                                <span className="underline cursor-pointer">Show all options</span>
                                            </div>
                                            <Form.Item
                                                name='description'
                                            >
                                                <TextArea className="mt-3" disabled={!isCreateMode} rows={6} id="description" placeholder="Write a detailed description of your item, or save time and let AI draft it for you" />
                                            </Form.Item>

                                            {/* Asset market price */}
                                            <Form.Item
                                                name='marketPrice'
                                                label={<span className="font-semibold">Market price</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter market price!'
                                                    },
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="marketPrice" placeholder="Enter market price" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset email */}
                                            <Form.Item
                                                name='email'
                                                label={<span className="font-semibold">Owner</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter owner email!'
                                                    },
                                                    {
                                                        type: 'email',
                                                        message: 'Wrong email format!'
                                                    }
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="email" placeholder="Enter email owner" />
                                            </Form.Item>

                                            {/* Asset origin */}
                                            <Form.Item
                                                name='origin'
                                                label={<span className="font-semibold">Origin</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter origin!'
                                                    },
                                                ]}
                                            >
                                                <Input disabled={!isCreateMode} id="origin" placeholder="Enter origin" />
                                            </Form.Item>

                                            {/* Asset asset */}
                                            <Form.Item
                                                name='appraiser'
                                                label={<span className="font-semibold">Appraiser</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter appraiser name!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="appraiser" placeholder="Enter appraiser" />
                                            </Form.Item>

                                            {/* Asset valuation */}
                                            <Form.Item
                                                name='valuation'
                                                label={<span className="font-semibold">Valuation</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter asset valuation!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="valuation" placeholder="Enter valuation" suffix='USD' />
                                            </Form.Item>

                                            <div className="flex justify-between">
                                                {/* Asset appraisal document */}
                                                <div className="w-1/2">
                                                    <span className="font-semibold flex items-center"><span className="text-red-500 inline-block mr-1 text-lg">*</span>Appraisal Document</span>
                                                    <Form.Item
                                                        name='appraisalDocument'
                                                    >
                                                        <Upload {...uploadProps}>
                                                            {uploadStatus === 'No upload' ? <Button disabled={isViewMode}>Choose file</Button> : ''}
                                                        </Upload>
                                                    </Form.Item>
                                                </div>

                                                {/* Asset legal document */}
                                                <div className="w-1/2">
                                                    <span className="font-semibold flex items-center"><span className="text-red-500 inline-block mr-1 text-lg">*</span>Legal Document</span>
                                                    <Form.Item
                                                        name='legalDocument'
                                                    // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="legalDocument">Choose file</label>}
                                                    >
                                                        {/* <Input readOnly={true} id="legalDocument" type="file" className="!hidden" /> */}
                                                        <Upload {...uploadProps}>
                                                            {uploadStatus === 'No upload' ? <Button disabled={isViewMode}>Choose file</Button> : ''}
                                                        </Upload>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            {/* Asset status */}
                                            <Form.Item
                                                name='status'
                                                className="w-full"
                                                label={<span className="font-semibold">Status</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="status"
                                                    className="w-full mt-1 h-10"
                                                    disabled={isViewMode}
                                                    placeholder='Choose status'
                                                    options={[
                                                        {
                                                            value: 'Waiting',
                                                            label: 'Waiting',
                                                        },
                                                        {
                                                            value: 'Approved',
                                                            label: 'Approved',
                                                        },
                                                        {
                                                            value: 'Rejected',
                                                            label: 'Rejected',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8}>
                                            {/* Asset images */}
                                            <div className="border border-[#d9d9d9] flex justify-center items-center mb-1 relative h-[200px]">
                                                <Form.Item
                                                    name='assetImages'
                                                    className="pt-12"
                                                // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="assetImages">Choose file</label>}
                                                >
                                                    {/* <Input readOnly={true} id="assetImages" type="file" className="!hidden" /> */}
                                                    <Upload
                                                        {...uploadProps}
                                                        showUploadList={false}
                                                    >
                                                        <Button disabled={isViewMode}>Upload images</Button>
                                                    </Upload>
                                                </Form.Item>
                                                <div className="absolute bottom-2">
                                                    <span className="block text-center">File type: *.png/jpg/jpeg</span>
                                                    <span className="block text-center">Size: less than 2MB</span>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <Image.PreviewGroup
                                                    preview={{
                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                    }}
                                                >
                                                    <div className="flex justify-between">
                                                        {form.getFieldValue('assetImages') &&
                                                            form.getFieldValue('assetImages').map(image => {
                                                                return (
                                                                    <div key={image} className="w-1/3 h-[50px] border border-[#d9d9d9] overflow-hidden flex justify-center items-center">
                                                                        <Image className="p-3" src={`${image}`} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Image.PreviewGroup>
                                            </div>

                                            {/* Asset listing fee */}
                                            <Form.Item
                                                name='listingFee'
                                                label={<span className="font-semibold">Listing fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter listing fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="listingFee" placeholder="Enter listing fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset advertise fee */}
                                            <Form.Item
                                                name='advertiseFee'
                                                label={<span className="font-semibold">Advertise fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter advertise fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="advertiseFee" placeholder="Enter advertise fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Commission fee */}
                                            <Form.Item
                                                name='commissionFee'
                                                label={<span className="font-semibold">Commission fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter commission fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="commissionFee" placeholder="Enter commission fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Delivery fee */}
                                            <Form.Item
                                                name='deliveryFee'
                                                label={<span className="font-semibold">Delivery fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter delivery fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="deliveryFee" placeholder="Enter delivery fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Inventory  */}
                                            <Form.Item
                                                name='inventory'
                                                label={<span className="font-semibold">Inventory</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="inventory"
                                                    className="w-full mt-1 h-10"
                                                    disabled={isViewMode}
                                                    placeholder='Choose inventory'
                                                    options={[
                                                        {
                                                            value: 'New York Library',
                                                            label: 'New York Library',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>

                                            {/* Listing date */}
                                            <span className="font-semibold">Listing date:</span>
                                            <Form.Item
                                                name='listingDate'
                                                className="-mt-[6px]"
                                            >
                                                <Input readOnly={true} id="listingDate" className="border-none px-0 py-0" />
                                            </Form.Item>

                                            {/* Primary services */}
                                            <span className="font-semibold">Primary services:</span>
                                            <Form.Item
                                                name='primaryServices'
                                            >
                                                <Input readOnly={true} id="primaryServices" className="border-none px-0 py-0 -mt-1" />
                                            </Form.Item>
                                            <Button
                                                disabled={isViewMode}
                                                className="-mt-1"
                                                onClick={() => {
                                                    setServiceSelected(form.getFieldValue('primaryServices'))
                                                    setModalServiceSelected(form.getFieldValue('primaryServices'))
                                                    setIsServiceModalOpen(true)
                                                }}>+ Add primary service</Button>
                                        </Col>
                                    </Row>
                                </div>
                                {!isViewMode && !isCreateMode &&
                                    <Row justify={"space-between"} className="mt-8">
                                        <div className="flex gap-2">
                                            <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                                setConfirmStatus('Update')
                                                validateUpdateForm()
                                            }}>Update</Button>
                                            <Button
                                                className="bg-white border border-[#9589c9] text-[#9589c9] cursor-pointer hover:!bg-[#9589c9] hover:!text-white hover:!border-[#9589c9]"
                                                onClick={() => {
                                                    form.setFieldsValue({
                                                        appraiser: "",
                                                        valuation: "",
                                                        // appraisalDocument: "",
                                                        // legalDocument: "",
                                                        status: "",
                                                        assetImages: "",
                                                        listingFee: "",
                                                        advertiseFee: "",
                                                        commissionFee: "",
                                                        deliveryFee: "",
                                                        primaryServices: "",
                                                    })
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        </div>
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
                                }
                                {isCreateMode &&
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Create')
                                            validateUpdateForm()
                                        }}>Save</Button>
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setIsModalOpen(false)
                                                setModalState(false)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                }
                            </Form>


                            <Modal
                                title='Add services'
                                open={isServiceModalOpen}
                                width={700}
                                centered={true}
                                onCancel={() => {
                                    setIsServiceModalOpen(false)
                                }}
                                onOk={() => {
                                    form.setFieldValue('primaryServices', modalServiceSelected)
                                    setServiceSelected(modalServiceSelected)
                                    setIsServiceModalOpen(false)
                                }}
                            >
                                <Search placeholder="Find a shipping service" />
                                <p className="mt-5 mb-4">Select up to 4 domestic shipping services for your listing</p>
                                <span className="font-semibold mb-3 block">Economy services</span>
                                <div className="h-[300px] overflow-y-auto">
                                    {economyServicesData.map((service) => {
                                        return (
                                            <div key={service.key} className="mb-2 flex items-start gap-2">
                                                <Checkbox
                                                    id={`service${service.key}`}

                                                    onChange={(event) => { onChangeSelected(event, service.key) }}
                                                    defaultChecked={serviceSelected.includes(service.key)}
                                                />
                                                <label htmlFor={`service${service.key}`}>
                                                    <span className="block">{service.name}</span>
                                                    <span className="block text-gray-400">{service.time}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Modal>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change appraiser information' : 'Confirm delete appraiser'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                form.submit()
                                setIsConfirmOpen(false)
                                setIsModalOpen(false)
                                setModalState(false)
                            }}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this appriser?</p>
                        </Modal>
                    </div>
                }
                {isMobile &&
                    <div className="">
                        <h2 className="text-center text-3xl font-medium uppercase mb-4">Asset List</h2>
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
                            <div className="w-full">
                                <Row justify={"space-between"}>
                                    {/* Search Component */}
                                    <Col xs={24} className="flex">
                                        <Input className="h-full rounded-tr-none rounded-br-none py-3" placeholder="Search for asset" />
                                        <Button className="h-full rounded-tl-none rounded-bl-none">
                                            <IoSearch className="text-xl" />
                                        </Button>
                                    </Col>
                                </Row>
                                <Row justify={"space-between"} className="mt-2">
                                    {/* Create Modal Component */}
                                    <Col className="flex items-center justify-end gap-3">
                                        <Button className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                                            onClick={() => {
                                                form.resetFields()
                                                form.setFieldValue('listingDate', `${String(new Date().getDate()).length === 1 ? '0' + String(new Date().getDate()) : String(new Date().getDate())}/${String(new Date().getMonth() + 1).length === 1 ? '0' + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1)}/${new Date().getFullYear()}`)
                                                form.setFieldValue('key', data.length + 1)
                                                setIsModalOpen(true)
                                                setIsViewMode(false)
                                                setModalState(true)
                                                setIsCreateMode(true)
                                            }}
                                        >
                                            <FaPlusCircle /> New Asset
                                        </Button>
                                    </Col>

                                    {/* Export */}
                                    <Col>
                                        <Button className="w-full bg-[var(--color-primary)] text-white !py-2 h-fit text-base hover:!border-[var(--color-primary)] hover:!text-[var(--color-primary)]"
                                            onClick={() => {
                                                // setIsassetCreateOpen(true)
                                                // createForm.resetFields()
                                            }}
                                        >
                                            <TiExport /> Export
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3" align={"bottom"} justify={"space-between"}>
                                    <Col xs={24} xl={5}>
                                        <h3>Status: </h3>
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
                                                    value: 'Sold',
                                                    label: 'Sold',
                                                },
                                                {
                                                    value: 'Selling',
                                                    label: 'Selling',
                                                },
                                                {
                                                    value: 'Upcoming',
                                                    label: 'Upcoming',
                                                },
                                                {
                                                    value: 'In progress',
                                                    label: 'In progress',
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col xs={24} xl={19}>
                                        <h3 className="">Price: </h3>
                                        <div className="flex-col gap-2">
                                            <Input id="priceFrom" addonAfter='USD' size="large" />
                                            <FaArrowDownLong className="text-xl my-3 m-auto" />
                                            <Input id="priceFrom" addonAfter='USD' size="large" />
                                        </div>
                                    </Col>
                                </Row>

                                {/* Table Component */}
                                <table className="w-full my-4 border-l border-r border-b border-gray-300">
                                    <tbody>
                                        {data.map((asset, index) => {
                                            if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
                                                return (
                                                    <tr className={`${index % 2 === 0 ? 'bg-gray-200' : ''} border border-gray-400`}
                                                        key={index}
                                                        onClick={() => {
                                                            setAssetKey(asset.key)
                                                            setIsViewMode(false)
                                                            setIsModalOpen(true)
                                                            setIsCreateMode(false)
                                                            setModalState(true)
                                                            form.setFieldsValue({
                                                                key: asset.key,
                                                                name: asset.name,
                                                                category: asset.category,
                                                                owner: asset.owner,
                                                                marketPrice: asset.marketPrice.toLocaleString(),
                                                                status: asset.status,
                                                                inventory: asset.inventory,
                                                                description: asset.description,
                                                                email: asset.email,
                                                                origin: asset.origin,
                                                                appraiser: asset.appraiser,
                                                                valuation: asset.valuation.toLocaleString(),
                                                                // appraisalDocument: asset.appraisalDocument,
                                                                // legalDocument: asset.legalDocument,
                                                                assetImages: asset.images,
                                                                listingFee: asset.listingFee.toLocaleString(),
                                                                advertiseFee: asset.advertiseFee.toLocaleString(),
                                                                commissionFee: asset.commissionFee.toLocaleString(),
                                                                deliveryFee: asset.deliveryFee.toLocaleString(),
                                                                listingDate: asset.listingDate,
                                                                primaryServices: asset.primaryServices,
                                                            })
                                                        }}
                                                    >
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/3 text-left pl-2 py-2 font-bold">Name</div>
                                                            <div className="py-2">{asset.name}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/3 text-left pl-2 py-2 font-bold">Category</div>
                                                            <div className="py-2">{asset.category}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/3 text-left pl-2 py-2 font-bold">Owner</div>
                                                            <div className="py-2">{asset.owner}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/3 text-left pl-2 py-2 font-bold">Market price</div>
                                                            <div className="py-2">{`${asset.marketPrice.toLocaleString()} USD`}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/3 text-left pl-2 py-2 font-bold">Status</div>
                                                            <div className="py-2">{asset.status}</div>
                                                        </td>
                                                        <td className="border-t border-gray-300 w-full flex">
                                                            <div className="w-1/3 text-left pl-2 py-2 font-bold">Inventory</div>
                                                            <div className="py-2">{asset.inventory}</div>
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
                            </div>
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
                                        itemMarginBottom: '12px',
                                        verticalLabelPadding: '0px'
                                    }
                                }
                            }}
                        >
                            {/* Detail Asset Modal */}
                            <Form
                                className={`asset-detail-info absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[calc(100vw-50px)] px-10 py-6 rounded-xl ${isModalOpen ? '' : 'hidden'}`}
                                form={form}
                                layout="vertical"
                            >

                                <div
                                    className="relative flex justify-end"
                                    onClick={() => {
                                        form.resetFields()
                                        setIsModalOpen(false)
                                        setModalState(false)
                                    }}
                                >
                                    <HiXMark className="text-2xl cursor-pointer transition-all hover:bg-[#d9d9d9]" />
                                </div>
                                <h1 className="text-center text-3xl font-semibold">Asset Information</h1>
                                <p className="italic text-center mt-3 pb-3 text-lg font-normal"><span className="font-medium">Id:</span> {form.getFieldValue('key')}</p>
                                <div className="h-[300px] overflow-y-auto overflow-x-hidden">
                                    <Row justify={"space-between"} className="my-3 px-2">
                                        <Col xs={24}>
                                            {/* Asset type */}
                                            <Form.Item
                                                name='category'
                                                label={<span className="font-semibold">Type</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="category"
                                                    className="w-full mt-1"
                                                    disabled
                                                    placeholder='Choose type'
                                                    options={[
                                                        {
                                                            value: 'Book',
                                                            label: 'Book',
                                                        },
                                                        {
                                                            value: 'Vehicle',
                                                            label: 'Vehicle',
                                                        },
                                                        {
                                                            value: 'Furniture',
                                                            label: 'Furniture',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>

                                            {/* Asset name */}
                                            <Form.Item
                                                name='name'
                                                label={<span className="font-semibold">Asset name</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter asset name!'
                                                    }
                                                ]}
                                            >
                                                <Input readOnly={true} disabled id="name" className="" placeholder="Enter asset name" />
                                            </Form.Item>

                                            {/* Asset description */}
                                            <span className="font-semibold">DESCRIPTION</span>
                                            <div className="flex justify-center gap-3 my-1">
                                                <span className="font-bold cursor-pointer text-center inline-block w-[32px] h-[32px] leading-[30px] border border-[#d9d9d9] rounded-md">B</span>
                                                <div className="cursor-pointer w-[32px] h-[32px] border border-[#d9d9d9] rounded-md p-2">
                                                    <FaListUl className="" />
                                                </div>
                                            </div>
                                            <Select
                                                className="!w-full my-1"
                                                placeholder={'Custom Sample'}
                                                disabled
                                                options={[
                                                    {
                                                        value: 'Custom Sample',
                                                        label: 'Custom Sample',
                                                    },
                                                ]}
                                            />
                                            <span className="underline cursor-pointer block text-center my-1">Show all options</span>
                                            <Form.Item
                                                name='description'
                                            >
                                                <TextArea className="mt-1" disabled rows={6} id="description" placeholder="Write a detailed description of your item, or save time and let AI draft it for you" />
                                            </Form.Item>

                                            {/* Asset market price */}
                                            <Form.Item
                                                name='marketPrice'
                                                label={<span className="font-semibold">Market price</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter market price!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={true} disabled id="marketPrice" placeholder="Enter market price" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset email */}
                                            <Form.Item
                                                name='email'
                                                label={<span className="font-semibold">Owner</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter owner email!'
                                                    },
                                                    {
                                                        type: 'email',
                                                        message: 'Wrong email format!'
                                                    }
                                                ]}
                                            >
                                                <Input readOnly={true} disabled id="email" placeholder="Enter email owner" />
                                            </Form.Item>

                                            {/* Asset origin */}
                                            <Form.Item
                                                name='origin'
                                                label={<span className="font-semibold">Origin</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter origin!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={true} disabled id="origin" placeholder="Enter origin" />
                                            </Form.Item>

                                            {/* Asset asset */}
                                            <Form.Item
                                                name='appraiser'
                                                label={<span className="font-semibold">Appraiser</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter appraiser name!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="appraiser" placeholder="Enter appraiser" />
                                            </Form.Item>

                                            {/* Asset valuation */}
                                            <Form.Item
                                                name='valuation'
                                                label={<span className="font-semibold">Valuation</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter asset valuation!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="valuation" placeholder="Enter valuation" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset appraisal document */}
                                            <span className="font-semibold flex items-center"><span className="text-red-500 inline-block mr-1 text-lg">*</span>Appraisal Document</span>
                                            <Form.Item
                                                name='appraisalDocument'
                                            >
                                                <Upload {...uploadProps}>
                                                    {uploadStatus === 'No upload' ? <Button disabled={isViewMode}>Choose file</Button> : ''}
                                                </Upload>
                                            </Form.Item>

                                            {/* Asset legal document */}
                                            <span className="font-semibold flex items-center"><span className="text-red-500 inline-block mr-1 text-lg">*</span>Legal Document</span>
                                            <Form.Item
                                                name='legalDocument'
                                            // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="legalDocument">Choose file</label>}
                                            >
                                                {/* <Input readOnly={true} id="legalDocument" type="file" className="!hidden" /> */}
                                                <Upload {...uploadProps}>
                                                    {uploadStatus === 'No upload' ? <Button disabled={isViewMode}>Choose file</Button> : ''}
                                                </Upload>
                                            </Form.Item>
                                            {/* Asset status */}
                                            <Form.Item
                                                name='status'
                                                className="w-full"
                                                label={<span className="font-semibold">Status</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="status"
                                                    className="w-full mt-1 h-10"
                                                    disabled={isViewMode}
                                                    placeholder='Choose status'
                                                    options={[
                                                        {
                                                            value: 'Waiting',
                                                            label: 'Waiting',
                                                        },
                                                        {
                                                            value: 'Approved',
                                                            label: 'Approved',
                                                        },
                                                        {
                                                            value: 'Rejected',
                                                            label: 'Rejected',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                            {/* Asset images */}
                                            <div className="border border-[#d9d9d9] flex justify-center items-center mb-1 relative h-[200px]">
                                                <Form.Item
                                                    name='assetImages'
                                                    className="pt-12"
                                                // label={<label className="border border-[#d9d9d9] px-6 py-2 rounded-md cursor-pointer" htmlFor="assetImages">Choose file</label>}
                                                >
                                                    {/* <Input readOnly={true} id="assetImages" type="file" className="!hidden" /> */}
                                                    <Upload
                                                        {...uploadProps}
                                                        showUploadList={false}
                                                    >
                                                        <Button disabled={isViewMode}>Upload images</Button>
                                                    </Upload>
                                                </Form.Item>
                                                <div className="absolute bottom-2">
                                                    <span className="block text-center">File type: *.png/jpg/jpeg</span>
                                                    <span className="block text-center">Size: less than 2MB</span>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <Image.PreviewGroup
                                                    preview={{
                                                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                    }}
                                                >
                                                    <div className="flex justify-between">
                                                        {form.getFieldValue('assetImages') &&
                                                            form.getFieldValue('assetImages').map(image => {
                                                                return (
                                                                    <div key={image} className="w-1/3 h-[50px] border border-[#d9d9d9] overflow-hidden flex justify-center items-center">
                                                                        <Image className="p-3" src={`${image}`} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Image.PreviewGroup>
                                            </div>

                                            {/* Asset listing fee */}
                                            <Form.Item
                                                name='listingFee'
                                                label={<span className="font-semibold">Listing fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter listing fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="listingFee" placeholder="Enter listing fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Asset advertise fee */}
                                            <Form.Item
                                                name='advertiseFee'
                                                label={<span className="font-semibold">Advertise fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter advertise fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="advertiseFee" placeholder="Enter advertise fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Commission fee */}
                                            <Form.Item
                                                name='commissionFee'
                                                label={<span className="font-semibold">Commission fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter commission fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="commissionFee" placeholder="Enter commission fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Delivery fee */}
                                            <Form.Item
                                                name='deliveryFee'
                                                label={<span className="font-semibold">Delivery fee</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter delivery fee!'
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={isViewMode} id="deliveryFee" placeholder="Enter delivery fee" suffix='USD' />
                                            </Form.Item>

                                            {/* Inventory  */}
                                            <Form.Item
                                                name='inventory'
                                                label={<span className="font-semibold">Inventory</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please choose category!'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    id="inventory"
                                                    className="w-full mt-1 h-10"
                                                    disabled={isViewMode}
                                                    placeholder='Choose inventory'
                                                    options={[
                                                        {
                                                            value: 'New York Library',
                                                            label: 'New York Library',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>

                                            {/* Listing date */}
                                            <span className="font-semibold">Listing date:</span>
                                            <Form.Item
                                                name='listingDate'
                                                className="-mt-[6px]"
                                            >
                                                <Input readOnly={true} id="listingDate" className="border-none px-0 py-0" />
                                            </Form.Item>

                                            {/* Primary services */}
                                            <span className="font-semibold">Primary services:</span>
                                            <Form.Item
                                                name='primaryServices'
                                            >
                                                <Input readOnly={true} id="primaryServices" className="border-none px-0 py-0 -mt-1" />
                                            </Form.Item>
                                            <Button
                                                disabled={isViewMode}
                                                className="-mt-1"
                                                onClick={() => {
                                                    setServiceSelected(form.getFieldValue('primaryServices'))
                                                    setModalServiceSelected(form.getFieldValue('primaryServices'))
                                                    setIsServiceModalOpen(true)
                                                }}>+ Add primary service</Button>
                                        </Col>
                                    </Row>
                                </div>
                                {!isViewMode && !isCreateMode &&
                                    <Row justify={"space-between"} className="mt-8">
                                        <div className="flex gap-2">
                                            <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                                setConfirmStatus('Update')
                                                validateUpdateForm()
                                            }}>Update</Button>
                                            <Button
                                                className="bg-white border border-[#9589c9] text-[#9589c9] cursor-pointer hover:!bg-[#9589c9] hover:!text-white hover:!border-[#9589c9]"
                                                onClick={() => {
                                                    form.setFieldsValue({
                                                        appraiser: "",
                                                        valuation: "",
                                                        // appraisalDocument: "",
                                                        // legalDocument: "",
                                                        status: "",
                                                        assetImages: "",
                                                        listingFee: "",
                                                        advertiseFee: "",
                                                        commissionFee: "",
                                                        deliveryFee: "",
                                                        primaryServices: "",
                                                    })
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        </div>
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setConfirmStatus('Delete')
                                                setIsConfirmOpen(true)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Row>
                                }
                                {isCreateMode &&
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button className="bg-blue-500 border border-blue-500 text-white cursor-pointer" onClick={() => {
                                            setConfirmStatus('Create')
                                            validateUpdateForm()
                                        }}>Save</Button>
                                        <Button
                                            className="bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                                            onClick={() => {
                                                setIsModalOpen(false)
                                                setModalState(false)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                }
                            </Form>


                            <Modal
                                title='Add services'
                                open={isServiceModalOpen}
                                width={700}
                                centered={true}
                                onCancel={() => {
                                    setIsServiceModalOpen(false)
                                }}
                                onOk={() => {
                                    form.setFieldValue('primaryServices', modalServiceSelected)
                                    setServiceSelected(modalServiceSelected)
                                    setIsServiceModalOpen(false)
                                }}
                            >
                                <Search placeholder="Find a shipping service" />
                                <p className="mt-5 mb-4">Select up to 4 domestic shipping services for your listing</p>
                                <span className="font-semibold mb-3 block">Economy services</span>
                                <div className="h-[300px] overflow-y-auto">
                                    {economyServicesData.map((service) => {
                                        return (
                                            <div key={service.key} className="mb-2 flex items-start gap-2">
                                                <Checkbox
                                                    id={`service${service.key}`}

                                                    onChange={(event) => { onChangeSelected(event, service.key) }}
                                                    defaultChecked={serviceSelected.includes(service.key)}
                                                />
                                                <label htmlFor={`service${service.key}`}>
                                                    <span className="block">{service.name}</span>
                                                    <span className="block text-gray-400">{service.time}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Modal>
                        </ConfigProvider>
                        <Modal
                            title={`${confirmStatus === 'Update' ? 'Confirm change appraiser information' : 'Confirm delete appraiser'}`}
                            open={isConfirmOpen}
                            centered={true}
                            width={600}
                            onOk={() => {
                                form.submit()
                                setIsConfirmOpen(false)
                                setIsModalOpen(false)
                                setModalState(false)
                            }}
                            onCancel={() => {
                                setIsConfirmOpen(false)
                            }}
                        >
                            <p className="text-base">Do you want to <span className={`${confirmStatus === 'Update' ? 'text-blue-500' : 'text-red-500'}`}>{confirmStatus.toLowerCase()}</span> this appriser?</p>
                        </Modal>
                    </div>
                }
            </div >
        </>
    )
}
export default ManagerAssetList