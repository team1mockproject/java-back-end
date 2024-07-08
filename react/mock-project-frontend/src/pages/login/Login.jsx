
import { Button, Checkbox, Col, ConfigProvider, Flex, Form, Input, Row } from "antd"
import Logo from "../../assets/logo-1.jfif"
import { Link } from "react-router-dom"
import { CiMail } from "react-icons/ci"
import { RiLockPasswordFill } from "react-icons/ri"
const Login = () => {
    const [form] = Form.useForm()
    return (
        <div className="m-8">
            <img
                className="mx-auto w-[200px]"
                src={Logo}
                alt=""
            />
            <h2 className="text-center text-2xl font-medium mt-10 mb-5">Login to your account</h2>
            <Row justify={'center'}>
                <Col xs={24} md={12} lg={6}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultHoverBorderColor: 'var(--color-primary)',
                                    defaultHoverColor: 'var(--color-primary)'
                                },
                                Checkbox: {
                                    colorPrimary: 'var(--color-primary)',
                                    colorPrimaryHover: 'var(--color-primary)',

                                },
                                Input: {
                                    colorPrimaryHover: 'var(--color-primary)',
                                    activeBorderColor: 'var(--color-primary)',
                                    activeShadow: '0 0 0 2px rgba(34, 77, 49, 0.1)'
                                }
                            }
                        }}
                    >
                        <Form
                            className=""
                            form={form}
                        >
                            <Form.Item
                                className="mb-2"
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    },
                                    {
                                        type: 'email',
                                        message: 'Wrong email format!'
                                    }
                                ]}
                            >
                                <Input
                                    className="text-base py-2"
                                    placeholder="Email"
                                    prefix={<CiMail />}
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]}
                            >
                                <Input.Password
                                    className="text-base py-2"
                                    placeholder="Password"
                                    prefix={<RiLockPasswordFill />}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Flex justify="space-between" align="center">
                                    <Form.Item
                                        name='remember'
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Form.Item >
                                        <Link
                                            className="underline text-[var(--color-primary)] font-medium transition-all hover:text-[var(--color-primary)]"
                                            to={'#'}
                                        >
                                            Forgot password?
                                        </Link>
                                    </Form.Item>
                                </Flex>
                            </Form.Item>
                            <Form.Item>
                                <Flex justify="center">
                                    <Button
                                        className="bg-[var(--color-primary)] text-white font-medium px-14 py-5 text-base"
                                        onClick={() => { form.submit() }}
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
                <Link to={"/signup"} className="text-[var(--color-primary)] font-medium underline hover:no-underline">Sign up</Link>
            </div>
        </div >
    )
}
export default Login