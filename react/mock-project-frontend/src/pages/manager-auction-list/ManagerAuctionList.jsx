import { useContext, useState } from "react";
import { ResponsiveContext } from "../../context/responsive-context/ResponsiveContext";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Table,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import { FaPlusCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
const ManagerAuctionList = () => {
  const [auctionKey, setAuctionKey] = useState();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState("");
  const [isAuctionCreateOpen, setIsAuctionCreateOpen] = useState(false);
  const [isAuctionUpdateOpen, setIsAuctionUpdateOpen] = useState(false);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const validateCreateForm = () => {
    createForm
      .validateFields()
      .then(() => {
        createForm.submit();
        setIsAuctionCreateOpen(false);
      })
      .catch(() => {
        setIsAuctionCreateOpen(true);
      });
  };

  const validateUpdateForm = () => {
    updateForm
      .validateFields()
      .then(() => {
        setIsConfirmOpen(true);
      })
      .catch(() => {
        setIsAuctionUpdateOpen(true);
      });
  };

  const onChangeDesktop = (pagination, filter, sorter, extra) => {
    setPageCurrent(pagination.current);
  };

  const onChangeTabMob = (current) => {
    setPageCurrent(current);
  };

  const columns = [
    {
      title: "No.",
      key: "no",
      render: (_, record, index) => {
        return <>{index + 1 + 10 * (pageCurrent - 1)}</>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Conductor",
      dataIndex: "conductor",
      key: "conductor",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Starting price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <span
              className="border-r border-gray-300 pr-3 hover:text-blue-500 cursor-pointer transition-all"
              onClick={() => {
                setIsAuctionUpdateOpen(true);
                setAuctionKey(record.key);
                updateForm.setFieldsValue({
                  //   date: record.date,
                  conductor: record.conductor,
                  location: record.location,
                  asset: record.asset,
                  price: record.price,
                  type: record.type,
                  status: record.status,
                });
              }}
            >
              Edit
            </span>
            <Popconfirm
              id="auction"
              placement="left"
              title="Delete auction"
              description={
                <span>
                  Are you sure to{" "}
                  <span className="font-semibold text-red-500">delete</span>{" "}
                  this auction?
                </span>
              }
              okText="Yes"
              cancelText="No"
            >
              <span className="pl-3 hover:text-red-500 cursor-pointer transition-all">
                Delete
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const data = [
    {
      key: "1",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Live Auction",
      status: "Upcoming",
    },
    {
      key: "2",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Online Auction",
      status: "Upcoming",
    },
    {
      key: "3",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Sealed Bid Auction",
      status: "Close",
    },
    {
      key: "4",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Live Auction",
      status: "Upcoming",
    },
    {
      key: "5",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Online Auction",
      status: "Upcoming",
    },
    {
      key: "6",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Sealed Bid Auction",
      status: "Close",
    },
    {
      key: "7",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Live Auction",
      status: "Upcoming",
    },
    {
      key: "8",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Online Auction",
      status: "Upcoming",
    },
    {
      key: "9",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Sealed Bid Auction",
      status: "Close",
    },
    {
      key: "10",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Live Auction",
      status: "Upcoming",
    },
    {
      key: "12",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Online Auction",
      status: "Upcoming",
    },
    {
      key: "13",
      date: "2024-08-01",
      conductor: "John Doe",
      location: "ABC Convention Center",
      asset: "Mercedes-Benz S-Class",
      price: "100,000 USD",
      type: "Sealed Bid Auction",
      status: "Close",
    },
  ];
  return (
    <>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10 ${
          isAuctionCreateOpen || isAuctionUpdateOpen ? "" : "hidden"
        }`}
      ></div>
      <div className="w-full px-2 pt-5 pb-20 h-screen overflow-y-auto">
        {isDesktop && (
          <>
            <h2 className="text-center text-3xl font-medium uppercase mb-4">
              Auction List
            </h2>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                    activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
                  },
                  Button: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                    activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
                  },
                  Select: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                  },
                },
              }}
            >
              {/* Search Component */}
              <Row>
                <Col className="w-3/5 flex">
                  <Input
                    className="h-full rounded-tr-none rounded-br-none"
                    placeholder="Search for asset"
                  />
                  <Button className="h-full rounded-tl-none rounded-bl-none">
                    <IoSearch className="text-xl" />
                  </Button>
                </Col>
                {/* Create Modal Component */}
                <Col className="w-2/5 flex justify-end gap-5">
                  <Button
                    className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                    onClick={() => {
                      setIsAuctionCreateOpen(true);
                      createForm.resetFields();
                    }}
                  >
                    New Asset <FaPlusCircle />
                  </Button>

                  <Button className="bg-green-500 text-white !py-2 h-fit text-base hover:!border-green-500 hover:!text-green-500">
                    Export <FaPlusCircle />
                  </Button>
                </Col>
              </Row>

              {/* Filter Component */}
              <div className="grid grid-cols-2 gap-5 my-5">
                <div className="">
                  <p className="font-bold">Date:</p>
                  <div className="grid grid-cols-2 gap-5">
                    <DatePicker
                      onChange={onChange}
                      placeholder="From"
                      className="w-full"
                    />
                    <DatePicker
                      onChange={onChange}
                      placeholder="To"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="">
                  <p className="font-bold">Price:</p>
                  <div className="grid grid-cols-2 gap-5">
                    <Input placeholder="From" className="w-full" />
                    <Input placeholder="To" className="w-full" />
                  </div>
                </div>
              </div>

              {/* Table Component */}

              <Table
                className="auction-table mt-4 cursor-pointer"
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
                    colorPrimary: "#d9d9d9",
                    colorPrimaryHover: "#d9d9d9",
                    activeShadow: "0 0 0 0px rgba(255, 255, 255, 0)",
                  },
                  Form: {
                    itemMarginBottom: "8px",
                    verticalLabelPadding: "0 0 4px",
                  },
                },
              }}
            >
              {/* Modal Create */}
              <div
                className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                              ${isAuctionCreateOpen ? "scale-100" : ""}
                              `}
              >
                <span className="flex justify-end">
                  <FaXmark
                    className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
                    onClick={() => {
                      setIsAuctionCreateOpen(false);
                    }}
                  />
                </span>
                <h3 className="text-xl text-center font-semibold">
                  Create auction
                </h3>
                <Form layout="vertical" form={createForm}>
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Form.Item
                        label="Date"
                        name={"date"}
                        rules={[
                          {
                            required: true,
                            message: "Please select date!",
                          },
                        ]}
                      >
                        <DatePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Start"
                        name={"start"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time start!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Finish"
                        name={"finish"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time finish!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Conductor"
                        name={"conductor"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter conductor!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter conductor" />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name={"asset"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter asset!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter asset" />
                      </Form.Item>
                    </div>
                    <div className="p-2">
                      <Form.Item
                        label="Type"
                        name={"type"}
                        rules={[
                          {
                            required: true,
                            message: "Please select type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Type"
                          onChange={handleChange}
                          options={[
                            {
                              value: "live auction",
                              label: "Live auction",
                            },
                            {
                              value: "online auction",
                              label: "Online auction",
                            },
                            {
                              value: "sealed bid auction",
                              label: "Sealed Bid Auction",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Period"
                        name={"period"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter pe",
                          },
                        ]}
                      >
                        <Input placeholder="Enter period (minutes)" />
                      </Form.Item>
                      <Form.Item
                        label="Price Start"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start price!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter start price" />
                      </Form.Item>
                      <Form.Item
                        label="Price Increment"
                        name={"increment"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter price increment!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter price increment" />
                      </Form.Item>
                      <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter status!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>
                    </div>
                  </div>
                  <Row justify={"end"} className="mt-8">
                    <Button
                      className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                      onClick={() => {
                        validateCreateForm();
                      }}
                    >
                      Create
                    </Button>
                    <Button
                      className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                      onClick={() => {
                        setIsAuctionCreateOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Row>
                </Form>
              </div>
              {/* Modal update */}
              <div
                className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                              ${isAuctionUpdateOpen ? "scale-100" : ""}
                              `}
              >
                <span className="flex justify-end">
                  <FaXmark
                    className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
                    onClick={() => {
                      setIsAuctionUpdateOpen(false);
                    }}
                  />
                </span>
                <h3 className="text-xl text-center font-semibold">
                  Update auction
                </h3>
                <Form layout="vertical" form={updateForm}>
                  <p className="text-center italic">
                    <span className="font-semibold">Id: </span>
                    {auctionKey}
                  </p>
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Form.Item
                        label="Date"
                        name={"date"}
                        rules={[
                          {
                            required: true,
                            message: "Please select date!",
                          },
                        ]}
                      >
                        <DatePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Start"
                        name={"start"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time start!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Finish"
                        name={"finish"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time finish!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Conductor"
                        name={"conductor"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter conductor!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter conductor" />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name={"asset"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter asset!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter asset" />
                      </Form.Item>
                    </div>
                    <div className="p-2">
                      <Form.Item
                        label="Type"
                        name={"type"}
                        rules={[
                          {
                            required: true,
                            message: "Please select type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Type"
                          onChange={handleChange}
                          options={[
                            {
                              value: "live auction",
                              label: "Live auction",
                            },
                            {
                              value: "online auction",
                              label: "Online auction",
                            },
                            {
                              value: "sealed bid auction",
                              label: "Sealed Bid Auction",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Period"
                        name={"period"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter pe",
                          },
                        ]}
                      >
                        <Input placeholder="Enter period (minutes)" />
                      </Form.Item>
                      <Form.Item
                        label="Price Start"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start price!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter start price" />
                      </Form.Item>
                      <Form.Item
                        label="Price Increment"
                        name={"increment"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter price increment!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter price increment" />
                      </Form.Item>
                      <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter status!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>
                    </div>
                  </div>
                  <Row justify={"end"} className="mt-8">
                    <Button
                      className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                      onClick={() => {
                        setConfirmStatus("Update");
                        validateUpdateForm();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                      onClick={() => {
                        setIsAuctionUpdateOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Row>
                </Form>
              </div>
            </ConfigProvider>
            <Modal
              title={`Confirm change auction information`}
              open={isConfirmOpen}
              centered={true}
              width={600}
              onOk={() => {
                updateForm.submit();
                setIsConfirmOpen(false);
                setIsAuctionUpdateOpen(false);
              }}
              // confirmLoading={confirmLoading}
              onCancel={() => {
                setIsConfirmOpen(false);
              }}
            >
              <p className="text-base">
                Do you want to{" "}
                <span
                  className={`${
                    confirmStatus === "Update"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {confirmStatus.toLowerCase()}
                </span>{" "}
                this auction ?
              </p>
            </Modal>
          </>
        )}
        {isTablet && (
          <>
            <h2 className="text-center text-3xl font-medium uppercase mb-4">
              Auction List
            </h2>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                    activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
                  },
                  Button: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                    activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
                  },
                  Select: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                  },
                },
              }}
            >
              {/* Search Component */}
              <Row>
                <Col className="w-3/5 flex">
                  <Input
                    className="h-full rounded-tr-none rounded-br-none"
                    placeholder="Search for asset"
                  />
                  <Button className="h-full rounded-tl-none rounded-bl-none">
                    <IoSearch className="text-xl" />
                  </Button>
                </Col>
                {/* Create Modal Component */}
                <Col className="w-2/5 flex justify-end gap-5">
                  <Button
                    className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                    onClick={() => {
                      setIsAuctionCreateOpen(true);
                      createForm.resetFields();
                    }}
                  >
                    New Asset <FaPlusCircle />
                  </Button>

                  <Button className="bg-green-500 text-white !py-2 h-fit text-base hover:!border-green-500 hover:!text-green-500">
                    Export <FaPlusCircle />
                  </Button>
                </Col>
              </Row>

              {/* Filter Component */}
              <div className="grid grid-cols-2 gap-5 my-5">
                <div className="">
                  <p className="font-bold">Date:</p>
                  <div className="grid grid-cols-2 gap-5">
                    <DatePicker
                      onChange={onChange}
                      placeholder="From"
                      className="w-full"
                    />
                    <DatePicker
                      onChange={onChange}
                      placeholder="To"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="">
                  <p className="font-bold">Price:</p>
                  <div className="grid grid-cols-2 gap-5">
                    <Input placeholder="From" className="w-full" />
                    <Input placeholder="To" className="w-full" />
                  </div>
                </div>
              </div>

              {/* Table Component */}
              <table className="w-full my-4 border-l border-r border-b border-gray-300">
                <tbody>
                  {data.map((auction, index) => {
                    if (
                      index >= (pageCurrent - 1) * 10 &&
                      index < pageCurrent * 10
                    ) {
                      return (
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-gray-200" : ""
                          } border border-gray-400`}
                          key={index}
                          onClick={() => {
                            setAuctionKey(auction.key);
                            setIsAuctionUpdateOpen(true);
                            updateForm.setFieldsValue({
                              //   date: auction.date,
                              conductor: auction.conductor,
                              location: auction.location,
                              asset: auction.asset,
                              price: auction.price,
                              type: auction.type,
                              status: auction.status,
                            });
                          }}
                        >
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.date}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.conductor}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.location}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.asset}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.price}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.type}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.status}</div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <Pagination
                align="center"
                total={data.length}
                onChange={onChangeTabMob}
              />
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorPrimary: "#d9d9d9",
                    colorPrimaryHover: "#d9d9d9",
                    activeShadow: "0 0 0 0px rgba(255, 255, 255, 0)",
                  },
                  Form: {
                    itemMarginBottom: "8px",
                    verticalLabelPadding: "0 0 4px",
                  },
                },
              }}
            >
              {/* Modal Create */}
              <div
                className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                              ${isAuctionCreateOpen ? "scale-100" : ""}
                              `}
              >
                <span className="flex justify-end">
                  <FaXmark
                    className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
                    onClick={() => {
                      setIsAuctionCreateOpen(false);
                    }}
                  />
                </span>
                <h3 className="text-xl text-center font-semibold">
                  Create auction
                </h3>
                <Form layout="vertical" form={createForm}>
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Form.Item
                        label="Date"
                        name={"date"}
                        rules={[
                          {
                            required: true,
                            message: "Please select date!",
                          },
                        ]}
                      >
                        <DatePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Start"
                        name={"start"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time start!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Finish"
                        name={"finish"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time finish!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Conductor"
                        name={"conductor"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter conductor!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter conductor" />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name={"asset"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter asset!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter asset" />
                      </Form.Item>
                    </div>
                    <div className="p-2">
                      <Form.Item
                        label="Type"
                        name={"type"}
                        rules={[
                          {
                            required: true,
                            message: "Please select type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Type"
                          onChange={handleChange}
                          options={[
                            {
                              value: "live auction",
                              label: "Live auction",
                            },
                            {
                              value: "online auction",
                              label: "Online auction",
                            },
                            {
                              value: "sealed bid auction",
                              label: "Sealed Bid Auction",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Period"
                        name={"period"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter pe",
                          },
                        ]}
                      >
                        <Input placeholder="Enter period (minutes)" />
                      </Form.Item>
                      <Form.Item
                        label="Price Start"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start price!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter start price" />
                      </Form.Item>
                      <Form.Item
                        label="Price Increment"
                        name={"increment"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter price increment!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter price increment" />
                      </Form.Item>
                      <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter status!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>
                    </div>
                  </div>
                  <Row justify={"end"} className="mt-8">
                    <Button
                      className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                      onClick={() => {
                        validateCreateForm();
                      }}
                    >
                      Create
                    </Button>
                    <Button
                      className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                      onClick={() => {
                        setIsAuctionCreateOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Row>
                </Form>
              </div>
              {/* Modal update and delete */}
              <div
                className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                              ${isAuctionUpdateOpen ? "scale-100" : ""}
                              `}
              >
                <span className="flex justify-end">
                  <FaXmark
                    className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
                    onClick={() => {
                      setIsAuctionUpdateOpen(false);
                    }}
                  />
                </span>
                <h3 className="text-xl text-center font-semibold">
                  Update auction
                </h3>
                <Form layout="vertical" form={updateForm}>
                  <p className="text-center italic">
                    <span className="font-semibold">Id: </span>
                    {auctionKey}
                  </p>
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Form.Item
                        label="Date"
                        name={"date"}
                        rules={[
                          {
                            required: true,
                            message: "Please select date!",
                          },
                        ]}
                      >
                        <DatePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Start"
                        name={"start"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time start!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Finish"
                        name={"finish"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time finish!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Conductor"
                        name={"conductor"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter conductor!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter conductor" />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name={"asset"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter asset!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter asset" />
                      </Form.Item>
                    </div>
                    <div className="p-2">
                      <Form.Item
                        label="Type"
                        name={"type"}
                        rules={[
                          {
                            required: true,
                            message: "Please select type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Type"
                          onChange={handleChange}
                          options={[
                            {
                              value: "live auction",
                              label: "Live auction",
                            },
                            {
                              value: "online auction",
                              label: "Online auction",
                            },
                            {
                              value: "sealed bid auction",
                              label: "Sealed Bid Auction",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Period"
                        name={"period"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter period!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter period (minutes)" />
                      </Form.Item>
                      <Form.Item
                        label="Price Start"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start price!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter start price" />
                      </Form.Item>
                      <Form.Item
                        label="Price Increment"
                        name={"increment"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter price increment!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter price increment" />
                      </Form.Item>
                      <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter status!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>
                    </div>
                  </div>
                  <Row justify={"end"} className="mt-8">
                    <Button
                      className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                      onClick={() => {
                        setConfirmStatus("Update");
                        validateUpdateForm();
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                      onClick={() => {
                        setConfirmStatus("Delete");
                        setIsConfirmOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Row>
                </Form>
              </div>
            </ConfigProvider>
            <Modal
              title={`${
                confirmStatus === "Update"
                  ? "Confirm change auction information"
                  : "Confirm delete auction"
              }`}
              open={isConfirmOpen}
              centered={true}
              width={600}
              onOk={() => {
                updateForm.submit();
                setIsConfirmOpen(false);
                setIAauctionUpdateOpen(false);
              }}
              // confirmLoading={confirmLoading}
              onCancel={() => {
                setIsConfirmOpen(false);
              }}
            >
              <p className="text-base">
                Do you want to{" "}
                <span
                  className={`${
                    confirmStatus === "Update"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {confirmStatus.toLowerCase()}
                </span>{" "}
                this auction?
              </p>
            </Modal>
          </>
        )}
        {isMobile && (
          <>
            <h2 className="text-center text-3xl font-medium uppercase mb-4">
              Auction List
            </h2>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                    activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
                  },
                  Button: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                    activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
                  },
                  Select: {
                    colorPrimary: "var(--color-primary)",
                    colorPrimaryHover: "var(--color-primary)",
                  },
                },
              }}
            >
              {/* Search Component */}
              <Col>
                <Col className="flex">
                  <Input
                    className="h-full rounded-tr-none rounded-br-none"
                    placeholder="Search for asset"
                  />
                  <Button className="h-full rounded-tl-none rounded-bl-none">
                    <IoSearch className="text-xl" />
                  </Button>
                </Col>
                {/* Create Modal Component */}
                <Col className="my-5 flex justify-end gap-5">
                  <Button
                    className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
                    onClick={() => {
                      setIsAuctionCreateOpen(true);
                      createForm.resetFields();
                    }}
                  >
                    New Asset <FaPlusCircle />
                  </Button>

                  <Button className="bg-green-500 text-white !py-2 h-fit text-base hover:!border-green-500 hover:!text-green-500">
                    Export <FaPlusCircle />
                  </Button>
                </Col>
              </Col>

              {/* Filter Component */}
              <div className="grid grid-cols-2 gap-2 my-5">
                <div className="">
                  <p className="font-bold">Date:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <DatePicker
                      onChange={onChange}
                      placeholder="From"
                      className="w-full"
                    />
                    <DatePicker
                      onChange={onChange}
                      placeholder="To"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="">
                  <p className="font-bold">Price:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="From" className="w-full" />
                    <Input placeholder="To" className="w-full" />
                  </div>
                </div>
              </div>

              {/* Table Component */}
              <table className="w-full my-4 border-l border-r border-b border-gray-300">
                <tbody>
                  {data.map((auction, index) => {
                    if (
                      index >= (pageCurrent - 1) * 10 &&
                      index < pageCurrent * 10
                    ) {
                      return (
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-gray-200" : ""
                          } border border-gray-400`}
                          key={index}
                          onClick={() => {
                            setAuctionKey(auction.key);
                            setIsAuctionUpdateOpen(true);
                            updateForm.setFieldsValue({
                              //   date: auction.date,
                              conductor: auction.conductor,
                              location: auction.location,
                              asset: auction.asset,
                              price: auction.price,
                              type: auction.type,
                              status: auction.status,
                            });
                          }}
                        >
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.date}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.conductor}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.location}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.asset}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.price}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.type}</div>
                          </td>
                          <td className="border-t border-gray-300 w-full flex">
                            <div className="w-1/4 text-left pl-2 py-2 font-bold">
                              Date
                            </div>
                            <div className="py-2">{auction.status}</div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <Pagination
                align="center"
                total={data.length}
                onChange={onChangeTabMob}
              />
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorPrimary: "#d9d9d9",
                    colorPrimaryHover: "#d9d9d9",
                    activeShadow: "0 0 0 0px rgba(255, 255, 255, 0)",
                  },
                  Form: {
                    itemMarginBottom: "8px",
                    verticalLabelPadding: "0 0 4px",
                  },
                },
              }}
            >
              {/* Modal Create */}
              <div
                className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                              ${isAuctionCreateOpen ? "scale-100" : ""}
                              `}
              >
                <span className="flex justify-end">
                  <FaXmark
                    className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
                    onClick={() => {
                      setIsAuctionCreateOpen(false);
                    }}
                  />
                </span>
                <h3 className="text-xl text-center font-semibold">
                  Create auction
                </h3>
                <Form layout="vertical" form={createForm}>
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Form.Item
                        label="Date"
                        name={"date"}
                        rules={[
                          {
                            required: true,
                            message: "Please select date!",
                          },
                        ]}
                      >
                        <DatePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Start"
                        name={"start"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time start!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Finish"
                        name={"finish"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time finish!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Conductor"
                        name={"conductor"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter conductor!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter conductor" />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name={"asset"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter asset!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter asset" />
                      </Form.Item>
                    </div>
                    <div className="p-2">
                      <Form.Item
                        label="Type"
                        name={"type"}
                        rules={[
                          {
                            required: true,
                            message: "Please select type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Type"
                          onChange={handleChange}
                          options={[
                            {
                              value: "live auction",
                              label: "Live auction",
                            },
                            {
                              value: "online auction",
                              label: "Online auction",
                            },
                            {
                              value: "sealed bid auction",
                              label: "Sealed Bid Auction",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Period"
                        name={"period"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter pe",
                          },
                        ]}
                      >
                        <Input placeholder="Enter period (minutes)" />
                      </Form.Item>
                      <Form.Item
                        label="Price Start"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start price!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter start price" />
                      </Form.Item>
                      <Form.Item
                        label="Price Increment"
                        name={"increment"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter price increment!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter price increment" />
                      </Form.Item>
                      <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter status!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>
                    </div>
                  </div>
                  <Row justify={"end"} className="mt-8">
                    <Button
                      className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                      onClick={() => {
                        validateCreateForm();
                      }}
                    >
                      Create
                    </Button>
                    <Button
                      className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                      onClick={() => {
                        setIsAuctionCreateOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Row>
                </Form>
              </div>
              {/* Modal update and delete */}
              <div
                className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[500px] transition-all scale-0 rounded-md
                              ${isAuctionUpdateOpen ? "scale-100" : ""}
                              `}
              >
                <span className="flex justify-end">
                  <FaXmark
                    className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
                    onClick={() => {
                      setIsAuctionUpdateOpen(false);
                    }}
                  />
                </span>
                <h3 className="text-xl text-center font-semibold">
                  Update auction
                </h3>
                <Form layout="vertical" form={updateForm}>
                  <p className="text-center italic">
                    <span className="font-semibold">Id: </span>
                    {auctionKey}
                  </p>
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Form.Item
                        label="Date"
                        name={"date"}
                        rules={[
                          {
                            required: true,
                            message: "Please select date!",
                          },
                        ]}
                      >
                        <DatePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Start"
                        name={"start"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time start!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Finish"
                        name={"finish"}
                        rules={[
                          {
                            required: true,
                            message: "Please select time finish!",
                          },
                        ]}
                      >
                        <TimePicker onChange={onChange} className="w-full" />
                      </Form.Item>
                      <Form.Item
                        label="Conductor"
                        name={"conductor"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter conductor!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter conductor" />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name={"asset"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter asset!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter asset" />
                      </Form.Item>
                    </div>
                    <div className="p-2">
                      <Form.Item
                        label="Type"
                        name={"type"}
                        rules={[
                          {
                            required: true,
                            message: "Please select type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Type"
                          onChange={handleChange}
                          options={[
                            {
                              value: "live auction",
                              label: "Live auction",
                            },
                            {
                              value: "online auction",
                              label: "Online auction",
                            },
                            {
                              value: "sealed bid auction",
                              label: "Sealed Bid Auction",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Period"
                        name={"period"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter period!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter period (minutes)" />
                      </Form.Item>
                      <Form.Item
                        label="Price Start"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start price!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter start price" />
                      </Form.Item>
                      <Form.Item
                        label="Price Increment"
                        name={"increment"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter price increment!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter price increment" />
                      </Form.Item>
                      <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter status!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>
                    </div>
                  </div>
                  <Row justify={"end"} className="mt-8">
                    <Button
                      className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
                      onClick={() => {
                        setConfirmStatus("Update");
                        validateUpdateForm();
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
                      onClick={() => {
                        setConfirmStatus("Delete");
                        setIsConfirmOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Row>
                </Form>
              </div>
            </ConfigProvider>
            <Modal
              title={`${
                confirmStatus === "Update"
                  ? "Confirm change auction information"
                  : "Confirm delete auction"
              }`}
              open={isConfirmOpen}
              centered={true}
              width={600}
              onOk={() => {
                updateForm.submit();
                setIsConfirmOpen(false);
                setIAauctionUpdateOpen(false);
              }}
              // confirmLoading={confirmLoading}
              onCancel={() => {
                setIsConfirmOpen(false);
              }}
            >
              <p className="text-base">
                Do you want to{" "}
                <span
                  className={`${
                    confirmStatus === "Update"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {confirmStatus.toLowerCase()}
                </span>{" "}
                this auction?
              </p>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};
export default ManagerAuctionList;
