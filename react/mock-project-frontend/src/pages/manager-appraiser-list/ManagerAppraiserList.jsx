import { Button, Col, ConfigProvider, Form, Input, Modal, Pagination, Popconfirm, Row, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import "./ManagerAppraiserList.css";
import { useContext, useState, useEffect } from "react";
import { ResponsiveContext } from "../../context/responsive-context/ResponsiveContext";
import { FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import ModalStateContext from "../../context/modal-state-context";
import axios from "axios";
const ManagerAppraiserList = () => {
	const [appraiserKey, setAppraiserKey] = useState();
	const [isAppraiserCreateOpen, setIsAppraiserCreateOpen] = useState(false);
	const [isAppraiserUpdateOpen, setIsAppraiserUpdateOpen] = useState(false);
	const [confirmStatus, setConfirmStatus] = useState("");
	const [error, setError] = useState("");
	const [appraiser, setAppraiser] = useState(null);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [province, setProvince] = useState("");
	const [keyWords, setKeyWords] = useState("");

	const [createForm] = Form.useForm();
	const [updateForm] = Form.useForm();

	const { isMobile, isTablet, isDesktop } = useContext(ResponsiveContext);
	const { setModalState } = useContext(ModalStateContext);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [pageCurrent, setPageCurrent] = useState(0);
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [loading, setLoading] = useState(true);

	const fetchData = async (page, pageSize, searchKey = "") => {
		// console.log(page, " - ", pageSize);
		setLoading(true);
		try {
			const response = await axios.get("http://localhost:8888/api/authenticate/assessor/all", {
				params: {
					page: page - 1, // assuming your API uses 0-based page index
					size: pageSize,
					search: searchKey,
				},
			});

			const { content, totalElements, number, size } = response.data;
			setData(content);
			setPagination({
				current: number + 1,
				pageSize: size,
				total: totalElements,
			});
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(pagination.current, pagination.pageSize);
	}, []);

	const handleTableChange = (pagination) => {
		fetchData(pagination.current, pagination.pageSize, keyWords);
	};

	const handleSearch = () => {
		fetchData(1, pagination.pageSize, keyWords);
	};

	const handleSignUp = async (appraiser) => {
		const name = createForm.getFieldValue("name");
		const email = createForm.getFieldValue("email");
		const phone = createForm.getFieldValue("phone");
		const province = createForm.getFieldValue("address");
		const city = createForm.getFieldValue("address");
		console.log(name, email, phone, province);
		try {
			const response = await fetch("http://localhost:8888/api/authenticate/assessor/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, phone, province, city }),
			});
			fetchData(pagination.current, pagination.pageSize);
			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
			} else {
				const errorData = await response.json();
				console.log("Create failed", errorData.data);
			}
		} catch (e) {
			console.log("Create failed", error);
		}
	};

	const handleEdit = async (key, appraiser) => {
		const name = updateForm.getFieldValue("name");
		const email = updateForm.getFieldValue("email");
		const phone = updateForm.getFieldValue("phone");
		const province = updateForm.getFieldValue("address");
		const city = updateForm.getFieldValue("address");
		console.log(name, email, phone, province);
		try {
			const response = await fetch(`http://localhost:8888/api/authenticate/assessor/edit/${key}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, phone, province, city }),
			});
			fetchData(pagination.current, pagination.pageSize);

			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
			} else {
				const errorData = await response.json();
				console.log("Edit failed", errorData.data);
			}
		} catch (e) {
			console.log("Edit failed", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(`http://localhost:8888/api/authenticate/assessor/${id}`);
			console.log(response.message);
			fetchData(pagination.current, pagination.pageSize);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const validateCreateForm = () => {
		createForm
			.validateFields()
			.then(() => {
				createForm.submit();
				setIsAppraiserCreateOpen(false);
				setAppraiser(null);
			})
			.catch(() => {
				setIsAppraiserCreateOpen(true);
			});
	};

	const validateUpdateForm = () => {
		updateForm
			.validateFields()
			.then(() => {
				setIsConfirmOpen(true);
			})
			.catch(() => {
				setIsAppraiserUpdateOpen(true);
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
			dataIndex: "assessorId",
			// render: (_, record, index) => {
			// 	return <>{index + 1 + 10 * (pageCurrent - 1)}</>;
			// },
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Address",
			dataIndex: "city",
			key: "city",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
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
								setIsAppraiserUpdateOpen(true);
								setAppraiserKey(record.assessorId);
								console.log(record.assessorId);
								setModalState(true);
								updateForm.setFieldsValue({
									name: record.name,
									email: record.email,
									address: record.city,
									phone: record.phone,
								});
							}}
						>
							Edit
						</span>
						<Popconfirm
							id="appraiser"
							placement="left"
							title="Delete appraiser"
							description={
								<span>
									Are you sure to <span className="font-semibold text-red-500">delete</span> this appraiser?
								</span>
							}
							onConfirm={() => handleDelete(record.assessorId)}
							okText="Yes"
							cancelText="No"
						>
							<span className="pl-3 hover:text-red-500 cursor-pointer transition-all">Delete</span>
						</Popconfirm>
					</>
				);
			},
		},
	];
	return (
		<>
			{console.log("Hello world")}
			<div className={`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10 ${isAppraiserCreateOpen || isAppraiserUpdateOpen ? "" : "hidden"}`}></div>
			<div className="w-full px-8 pt-8">
				{isDesktop && (
					<div className="ml-[247px]">
						<h2 className="text-center text-3xl font-medium uppercase mb-4">Appraiser List</h2>
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
							<Row justify={"space-between"}>
								{/* Search Component */}
								<Col xs={20} className="flex">
									<Input onChange={(event) => setKeyWords(event.target.value)} className="h-full rounded-tr-none rounded-br-none" />
									<Button onClick={handleSearch} className="h-full rounded-tl-none rounded-bl-none">
										<IoSearch className="text-xl" />
									</Button>
								</Col>
								{/* Create Modal Component */}
								<Col xs={4} className="flex items-center justify-end">
									<Button
										className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
										onClick={() => {
											setIsAppraiserCreateOpen(true);
											createForm.resetFields();
											setModalState(true);
										}}
									>
										Create <FaPlusCircle />
									</Button>
								</Col>
							</Row>
							{/* Table Component */}
							<Table columns={columns} dataSource={data} pagination={pagination} onChange={handleTableChange} loading={loading} />
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
                            ${isAppraiserCreateOpen ? "scale-100" : ""}
                            `}
							>
								<span className="flex justify-end">
									<FaXmark
										className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
										onClick={() => {
											setIsAppraiserCreateOpen(false);
											setModalState(false);
										}}
									/>
								</span>
								<h3 className="text-xl text-center font-semibold">Create appraiser</h3>
								<Form layout="vertical" form={createForm}>
									<p className="text-center italic">
										<span className="font-semibold">Id: </span>
										{/* {data.length + 1} */}
									</p>
									<Form.Item
										label="Name"
										name={"name"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser name!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name={"email"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser email!",
											},
											{
												type: "email",
												message: "Wrong email format!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Address"
										name={"address"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser address!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Phone Number"
										name={"phone"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser phone!",
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
										<Button
											className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
											onClick={() => {
												// console.log(createForm.getFieldsValue());
												validateCreateForm();
												setAppraiser(createForm.getFieldsValue());
												handleSignUp(appraiser);
											}}
										>
											Create
										</Button>
										<Button
											className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
											onClick={() => {
												setIsAppraiserCreateOpen(false);
												setModalState(false);
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
                            ${isAppraiserUpdateOpen ? "scale-100" : ""}
                            `}
							>
								<span className="flex justify-end">
									<FaXmark
										className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
										onClick={() => {
											setIsAppraiserUpdateOpen(false);
											setModalState(false);
										}}
									/>
								</span>
								<h3 className="text-xl text-center font-semibold">Update appraiser</h3>
								<Form layout="vertical" form={updateForm}>
									<p className="text-center italic">
										<span className="font-semibold">Id: </span>
										{appraiserKey}
									</p>
									<Form.Item
										label="Name"
										name={"name"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser name!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name={"email"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser email!",
											},
											{
												type: "email",
												message: "Wrong email format!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Address"
										name={"address"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser address!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Phone Number"
										name={"phone"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser phone!",
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
										<Button
											className="bg-blue-500 border border-blue-500 text-white cursor-pointer"
											onClick={() => {
												setConfirmStatus("Update");
												validateUpdateForm();
												setAppraiser(createForm.getFieldsValue());
											}}
										>
											Save
										</Button>
										<Button
											className="ml-2 bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:!text-red-500 hover:!border-red-500"
											onClick={() => {
												setIsAppraiserUpdateOpen(false);
												setModalState(false);
											}}
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
								updateForm.submit();
								setIsConfirmOpen(false);
								setIsAppraiserUpdateOpen(false);
								handleEdit(appraiserKey, appraiser);
							}}
							// confirmLoading={confirmLoading}
							onCancel={() => {
								setIsConfirmOpen(false);
							}}
						>
							<p className="text-base">
								Do you want to <span className={`${confirmStatus === "Update" ? "text-blue-500" : "text-red-500"}`}>{confirmStatus.toLowerCase()}</span> this appriser?
							</p>
						</Modal>
					</div>
				)}
				{isTablet && (
					<>
						<h2 className="text-center text-3xl font-medium uppercase mb-4">Appraiser List</h2>
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
									<Button
										className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
										onClick={() => {
											setIsAppraiserCreateOpen(true);
											createForm.resetFields();
											setModalState(true);
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
								{data.map((appraiser) => {
									// if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
									return (
										<tr
											className={`${index % 2 === 0 ? "bg-gray-200" : ""} border border-gray-400`}
											key={index}
											onClick={() => {
												setAppraiserKey(appraiser.key);
												setIsAppraiserUpdateOpen(true);
												setModalState(true);
												updateForm.setFieldsValue({
													name: appraiser.name,
													address: appraiser.address,
													phone: appraiser.phone,
													email: appraiser.email,
												});
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
									);
									// }
								})}
							</tbody>
						</table>
						<Pagination align="center" /*total={data.length}*/ onChange={onChangeTabMob} />
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
                        ${isAppraiserCreateOpen ? "scale-100" : ""}
                        `}
							>
								<span className="flex justify-end">
									<FaXmark
										className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
										onClick={() => {
											setIsAppraiserCreateOpen(false);
											setModalState(false);
										}}
									/>
								</span>
								<h3 className="text-xl text-center font-semibold">Create appraiser</h3>
								<Form layout="vertical" form={createForm}>
									<p className="text-center italic">
										<span className="font-semibold">Id: </span>
										{/* {data.length + 1} */}
									</p>
									<Form.Item
										label="Name"
										name={"name"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser name!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name={"email"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser email!",
											},
											{
												type: "email",
												message: "Wrong email format!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Address"
										name={"address"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser address!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Phone Number"
										name={"phone"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser phone!",
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
												setIsAppraiserCreateOpen(false);
												setModalState(false);
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
                        ${isAppraiserUpdateOpen ? "scale-100" : ""}
                        `}
							>
								<span className="flex justify-end">
									<FaXmark
										className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
										onClick={() => {
											setIsAppraiserUpdateOpen(false);
											setModalState(false);
										}}
									/>
								</span>
								<h3 className="text-xl text-center font-semibold">Update appraiser</h3>
								<Form layout="vertical" form={updateForm}>
									<p className="text-center italic">
										<span className="font-semibold">Id: </span>
										{appraiserKey}
									</p>
									<Form.Item
										label="Name"
										name={"name"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser name!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name={"email"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser email!",
											},
											{
												type: "email",
												message: "Wrong email format!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Address"
										name={"address"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser address!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Phone Number"
										name={"phone"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser phone!",
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
							title={`${confirmStatus === "Update" ? "Confirm change appraiser information" : "Confirm delete appraiser"}`}
							open={isConfirmOpen}
							centered={true}
							width={600}
							onOk={() => {
								updateForm.submit();
								setIsConfirmOpen(false);
								setIsAppraiserUpdateOpen(false);
							}}
							// confirmLoading={confirmLoading}
							onCancel={() => {
								setIsConfirmOpen(false);
							}}
						>
							<p className="text-base">
								Do you want to <span className={`${confirmStatus === "Update" ? "text-blue-500" : "text-red-500"}`}>{confirmStatus.toLowerCase()}</span> this appriser?
							</p>
						</Modal>
					</>
				)}
				{isMobile && (
					<>
						<h2 className="text-center text-3xl font-medium uppercase mb-4">Appraiser List</h2>
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
									<Button
										className="bg-blue-500 text-white !py-2 h-fit text-base hover:!border-blue-500 hover:!text-blue-500"
										onClick={() => {
											setIsAppraiserCreateOpen(true);
											setModalState(true);
											createForm.resetFields();
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
								{data.map((appraiser) => {
									// if (index >= (pageCurrent - 1) * 10 && index < pageCurrent * 10) {
									return (
										<tr
											className={`${index % 2 === 0 ? "bg-gray-200" : ""} border border-gray-400`}
											key={index}
											onClick={() => {
												setAppraiserKey(appraiser.key);
												setIsAppraiserUpdateOpen(true);
												setModalState(true);
												updateForm.setFieldsValue({
													name: appraiser.name,
													address: appraiser.address,
													phone: appraiser.phone,
													email: appraiser.email,
												});
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
									);
									// }
								})}
							</tbody>
						</table>
						<Pagination align="center" /*total={data.length}*/ onChange={onChangeTabMob} />
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
								className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[300px] transition-all scale-0 rounded-md
                    ${isAppraiserCreateOpen ? "scale-100" : ""}
                    `}
							>
								<span className="flex justify-end">
									<FaXmark
										className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
										onClick={() => {
											setIsAppraiserCreateOpen(false);
											setModalState(false);
										}}
									/>
								</span>
								<h3 className="text-xl text-center font-semibold">Create appraiser</h3>
								<Form layout="vertical" form={createForm}>
									<p className="text-center italic">
										<span className="font-semibold">Id: </span>
										{/* {data.length + 1} */}
									</p>
									<Form.Item
										label="Name"
										name={"name"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser name!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name={"email"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser email!",
											},
											{
												type: "email",
												message: "Wrong email format!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Address"
										name={"address"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser address!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Phone Number"
										name={"phone"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser phone!",
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
												setIsAppraiserCreateOpen(false);
												setModalState(false);
											}}
										>
											Cancel
										</Button>
									</Row>
								</Form>
							</div>
							{/* Modal update and delete */}
							<div
								className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md p-4 w-[300px] transition-all scale-0 rounded-md
                    ${isAppraiserUpdateOpen ? "scale-100" : ""}
                    `}
							>
								<span className="flex justify-end">
									<FaXmark
										className="text-2xl text-red-500 cursor-pointer bg-white transition-all hover:bg-red-200"
										onClick={() => {
											setIsAppraiserUpdateOpen(false);
											setModalState(false);
										}}
									/>
								</span>
								<h3 className="text-xl text-center font-semibold">Update appraiser</h3>
								<Form layout="vertical" form={updateForm}>
									<p className="text-center italic">
										<span className="font-semibold">Id: </span>
										{appraiserKey}
									</p>
									<Form.Item
										label="Name"
										name={"name"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser name!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Email"
										name={"email"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser email!",
											},
											{
												type: "email",
												message: "Wrong email format!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Address"
										name={"address"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser address!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Phone Number"
										name={"phone"}
										rules={[
											{
												required: true,
												message: "Please enter appraiser phone!",
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
							title={`${confirmStatus === "Update" ? "Confirm change appraiser information" : "Confirm delete appraiser"}`}
							open={isConfirmOpen}
							centered={true}
							width={600}
							onOk={() => {
								updateForm.submit();
								setIsConfirmOpen(false);
								setIsAppraiserUpdateOpen(false);
							}}
							// confirmLoading={confirmLoading}
							onCancel={() => {
								setIsConfirmOpen(false);
							}}
						>
							<p className="text-base">
								Do you want to <span className={`${confirmStatus === "Update" ? "text-blue-500" : "text-red-500"}`}>{confirmStatus.toLowerCase()}</span> this appriser?
							</p>
						</Modal>
					</>
				)}
			</div>
		</>
	);
};
export default ManagerAppraiserList;
