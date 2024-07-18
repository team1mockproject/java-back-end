import { Button, Checkbox, Col, ConfigProvider, DatePicker, Flex, Form, Input, Radio, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
	const [personalOrAgency, setPersonalOrAgency] = useState(null);
	const [email, setEmail] = useState("");
	const [passWord, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [roleIds, setRoles] = useState([]);
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");

	const handleRoleChange = (checkedValues) => {
		setRoles(checkedValues);
	};

	const handlePersonalOrAgencyChange = (e) => {
		setPersonalOrAgency(e.target.value);
	};

	const handleSignUp = async () => {
		if (repeatPassword === passWord) {
			console.log(personalOrAgency, fullName, phone, email, passWord, roleIds);
			try {
				const response = await fetch("http://localhost:8888/api/authenticate/account/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ personalOrAgency, fullName, phone, email, passWord, roleIds }),
				});

				if (response.ok) {
					const data = await response.json();
					toast.success(data.message);
				} else {
					const errorData = await response.json();
					setError(errorData.data || "Sign-up failed");
				}
			} catch (e) {
				toast.error("Sign-up failed", error);
			}
		} else {
			toast.error("Confirm password not match");
		}
	};

	const [form] = Form.useForm();
	const validateConfirmPassword = () => {
		if (form.getFieldValue("confirmPassword") !== form.getFieldValue("password")) {
			return Promise.reject("Password do not match!");
		}
		return Promise.resolve();
	};
	return (
		<div className="m-8">
			<h2 className="text-center uppercase font-bold text-2xl text-[var(--color-primary)] mt-4">Register account</h2>
			<Row justify={"center"}>
				<Col xs={24} md={12} lg={8}>
					<ConfigProvider
						theme={{
							components: {
								Form: {
									itemMarginBottom: "8px",
									verticalLabelPadding: "0 0 4px",
								},
								Button: {
									defaultHoverBorderColor: "var(--color-primary)",
									defaultHoverColor: "var(--color-primary)",
								},
								Checkbox: {
									colorPrimary: "var(--color-primary)",
									colorPrimaryHover: "var(--color-primary)",
								},
								Input: {
									colorPrimaryHover: "var(--color-primary)",
									activeBorderColor: "var(--color-primary)",
									activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
								},
								DatePicker: {
									colorPrimaryHover: "var(--color-primary)",
									activeBorderColor: "var(--color-primary)",
									activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
								},
								Radio: {
									colorPrimary: "var(--color-primary)",
									colorPrimaryHover: "var(--color-primary)",
								},
							},
						}}
					>
						<Form form={form} layout="vertical">
							<Form.Item
								onChange={(e) => setEmail(e.target.value)}
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: "Please enter your email!",
									},
									{
										type: "email",
										message: "Wrong email format!",
									},
								]}
								hasFeedback
							>
								<Input placeholder="Email address" />
							</Form.Item>
							<Row>
								<Col xs={24} md={12}>
									<Form.Item
										onChange={(e) => setPassword(e.target.value)}
										className="mr-1"
										label="Password"
										name="password"
										rules={[
											{
												required: true,
												message: "Please enter your password!",
											},
											{
												pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
												message:
													"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
											},
										]}
										hasFeedback
									>
										<Input.Password placeholder="Password" />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										onChange={(e) => setRepeatPassword(e.target.value)}
										className="ml-1"
										label="Confirm Password"
										name="confirmPassword"
										rules={[
											{
												required: true,
												message: "Please enter your confirm password!",
											},
											{
												validator: validateConfirmPassword,
											},
										]}
										hasFeedback
									>
										<Input.Password placeholder="Confirm Password" />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col xs={24} md={12}>
									<Form.Item
										onChange={(e) => setFullName(e.target.value)}
										className="mr-1"
										label="Full Name"
										name="fullName"
										rules={[
											{
												required: true,
												message: "Please enter your full name!",
											},
										]}
									>
										<Input placeholder="Full Name" />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										className="ml-1"
										label="Gender"
										name="gender"
										rules={[
											{
												required: true,
												message: "Please choose your gender!",
											},
										]}
									>
										<Radio.Group>
											<Radio value={"M"}>Male</Radio>
											<Radio value={"F"}>Female</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col xs={24} md={12}>
									<Form.Item
										className="mr-1"
										label="Year of Birth"
										name="yearOfBirth"
										rules={[
											{
												required: true,
												message: "Please enter your year of birth!",
											},
										]}
									>
										<DatePicker className="w-full" picker="year" />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item className="ml-1" label="You want to be?" name="role">
										<Flex>
											<Checkbox.Group onChange={handleRoleChange}>
												<Checkbox value="buyer">Buyer</Checkbox>
												<Checkbox value="seller">Seller</Checkbox>
											</Checkbox.Group>
										</Flex>
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col xs={24} md={12}>
									<Form.Item
										onChange={(e) => setPhone(e.target.value)}
										className="mr-1"
										label="Phone"
										name="phone"
										rules={[
											{
												required: true,
												message: "Please enter your phone number!",
											},
											// {
											//     pattern: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
											//     message: 'Wrong US phone number format!'
											// }
										]}
									>
										<Input placeholder="Phone" />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item className="ml-1" label="Which you are?" name="isPersonal">
										<Radio.Group onChange={handlePersonalOrAgencyChange} value={personalOrAgency}>
											<Radio value={true}>Personal</Radio>
											<Radio value={false}>Agency</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col xs={24} md={16}>
									<Row>
										<Col xs={24} md={12}>
											<Form.Item className="mr-1" label="City" name="city">
												<Input placeholder="City" />
											</Form.Item>
										</Col>
										<Col xs={24} md={12}>
											<Form.Item className="ml-1" label="State" name="state">
												<Input placeholder="State" />
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col xs={24} md={12}>
											<Form.Item
												className="mr-1"
												label="Address"
												name="address"
												rules={[
													{
														required: true,
														message: "Please enter your address!",
													},
												]}
											>
												<Input placeholder="Address" />
											</Form.Item>
										</Col>
										<Col xs={24} md={12}>
											<Form.Item
												className="ml-1"
												label="Zip Code"
												name="zipCode"
												rules={[
													{
														required: true,
														message: "Please enter your zip code!",
													},
												]}
											>
												<Input placeholder="Zip Code" />
											</Form.Item>
										</Col>
									</Row>
								</Col>
							</Row>
							<Form.Item className="text-center" name="isAcceptPolicy">
								<Checkbox>
									I agree and accept the <Link className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary)] hover:opacity-75 transition-all">Terms Of Use</Link>
								</Checkbox>
							</Form.Item>
							<Form.Item className="flex justify-center">
								<Button onClick={handleSignUp} className="px-6 font-bold text-white bg-[var(--color-primary)]">
									Sign Up
								</Button>
							</Form.Item>
						</Form>
					</ConfigProvider>
				</Col>
			</Row>
			<div className="text-center">
				{`Already have an account? `}
				<Link to={"/login"} className="text-[var(--color-primary)] font-bold underline hover:no-underline">
					Login
				</Link>
			</div>
		</div>
	);
};
export default Signup;
