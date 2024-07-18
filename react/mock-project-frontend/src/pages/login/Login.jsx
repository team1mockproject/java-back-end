import { Button, Checkbox, Col, ConfigProvider, Flex, Form, Input, Row } from "antd";
import Logo from "../../assets/logo-1.jfif";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginApi } from "../../services/AccountService";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
const Login = () => {
	const [form] = Form.useForm();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (!email || !password) {
			toast.error("Email/Password is required");
			return;
		}

		let res = await loginApi(email, password);
		if (res && res.data && res.data.accessToken) {
			localStorage.setItem("token", res.data.accessToken);
			dispatch(login(res.data.accessToken));
			toast.success("Login successful");
			navigate("/");
		} else {
			toast.error("Login failed");
		}
	};

	return (
		<div className="m-8">
			<img className="mx-auto w-[200px]" src={Logo} alt="" />
			<h2 className="text-center text-2xl font-medium mt-10 mb-5">Login to your account</h2>
			<Row justify={"center"}>
				<Col xs={24} md={12} lg={6}>
					<ConfigProvider
						theme={{
							components: {
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
							},
						}}
					>
						<Form className="" form={form}>
							<Form.Item
								className="mb-2"
								name="email"
								rules={[
									{
										required: true,
										message: "Please input your email!",
									},
									{
										type: "email",
										message: "Wrong email format!",
									},
								]}
							>
								<Input onChange={(event) => setEmail(event.target.value)} className="text-base py-2" placeholder="Email" prefix={<CiMail />} />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your password!",
									},
								]}
							>
								<Input.Password onChange={(event) => setPassword(event.target.value)} className="text-base py-2" placeholder="Password" prefix={<RiLockPasswordFill />} />
							</Form.Item>
							<Form.Item>
								<Flex justify="space-between" align="center">
									<Form.Item name="remember" valuePropName="checked">
										<Checkbox>Remember me</Checkbox>
									</Form.Item>
									<Form.Item>
										<Link className="underline text-[var(--color-primary)] font-medium transition-all hover:text-[var(--color-primary)]" to={"#"}>
											Forgot password?
										</Link>
									</Form.Item>
								</Flex>
							</Form.Item>
							<Form.Item>
								<Flex justify="center">
									<Button
										className="bg-[var(--color-primary)] text-white font-medium px-14 py-5 text-base"
										// onClick={() => { form.submit() }}
										onClick={handleLogin}
										style={{}}
									>
										Login
									</Button>
								</Flex>
							</Form.Item>
						</Form>
					</ConfigProvider>
				</Col>
			</Row>
			<div className="text-center">
				{`Don't have an account? `}
				<Link to={"/signup"} className="text-[var(--color-primary)] font-medium underline hover:no-underline">
					Sign up
				</Link>
			</div>
		</div>
	);
};
export default Login;
