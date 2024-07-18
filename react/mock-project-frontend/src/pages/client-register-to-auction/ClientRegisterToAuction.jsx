import { Button, Form, Input, Flex, ConfigProvider, Upload } from "antd";
import { useState } from "react";

const ClientRegisterToAuction = () => {
  const [form] = Form.useForm();
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [selected, setSelected] = useState(null);

  const handlerSelected = (index) => {
    setSelected(index);
  };
  const dataIDType = [
    {
      name: "Driver's license",
    },
    {
      name: "State or Government ID",
    },
    {
      name: "Passport",
    },
  ];
  return (
    <>
      <div className="grid h-auto w-full p-5 md:grid-cols-2">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: "var(--color-primary)",
                defaultHoverColor: "var(--color-primary)",
              },
              Input: {
                colorPrimaryHover: "var(--color-primary)",
                activeBorderColor: "var(--color-primary)",
                activeShadow: "0 0 0 2px rgba(34, 77, 49, 0.1)",
              },
            },
          }}
        >
          <div className="grid items-center justify-items-center p-5">
            <div className="w-full text-center">
              <img
                src="https://img.icons8.com/?size=100&id=22127&format=png&color=000000"
                alt=""
                className="mx-auto h-12 w-12"
              />
              <p className="mt-5 text-xl font-semibold">Select ID type</p>
              <p>Please tell us which ID you will upload</p>
              <div className="mt-10 grid grid-cols-3 gap-5 md:gap-10">
                {dataIDType.map((items, index) => (
                  <div
                    key={index}
                    className={`grid h-40 items-center justify-items-center rounded-md cursor-pointer hover:border hover:border-black hover:duration-300 hover:ease-in-out ${
                      selected === index
                        ? "border border-black bg-gray-100"
                        : ""
                    }`}
                    onClick={() => handlerSelected(index)}
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=AUjdrHiRjI0U&format=png&color=000000"
                      alt=""
                      className="mx-auto h-12 w-12"
                    />
                    <p>{items.name}</p>
                  </div>
                ))}
              </div>

              <Flex className="mt-10 flex-col items-center gap-10">
                <Form.Item
                  name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                  className=""
                >
                  <Upload.Dragger
                    name="files"
                    action="/upload.do"
                    className="w-3/4"
                  >
                    <p className="">Upload front of ID</p>
                  </Upload.Dragger>
                </Form.Item>

                <Form.Item
                  name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger
                    name="files"
                    action="/upload.do"
                    className="w-3/4"
                  >
                    <p className="">Upload back of ID</p>
                  </Upload.Dragger>
                </Form.Item>
              </Flex>
            </div>
          </div>
          <div className="grid p-5 items-center">
            <Form className="w-full" form={form}>
              <p className="text-xl font-semibold mb-5 text-center">
                Payment Method
              </p>
              <Form.Item
                className="mb-5"
                name="card number"
                rules={[
                  {
                    required: true,
                    message: "Please input your card number!",
                  },
                  {
                    type: "number",
                    message: "Wrong card number format!",
                  },
                ]}
              >
                <Input className="py-2 h-14" placeholder="Card Number" />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item
                  className="mb-5 w-1/2 pr-2"
                  name="expiration"
                  rules={[
                    {
                      required: true,
                      message: "Please input your expiration!",
                    },
                    {
                      type: "number",
                      message: "Wrong expiration format!",
                    },
                  ]}
                >
                  <Input className="py-2 h-14" placeholder="Expiration" />
                </Form.Item>
                <Form.Item
                  className="mb-5 w-1/2"
                  name="cvv"
                  rules={[
                    {
                      required: true,
                      message: "Please input your cvv!",
                    },
                    {
                      type: "number",
                      message: "Wrong cvv format!",
                    },
                  ]}
                >
                  <Input className="py-2 h-14" placeholder="CVV" />
                </Form.Item>
              </Flex>
              <Flex justify="space-between">
                <Form.Item
                  className="mb-5 w-1/2 pr-2"
                  name="first name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                    {
                      type: "",
                      message: "Wrong first name format!",
                    },
                  ]}
                >
                  <Input className="py-2 h-14" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  className="mb-5 w-1/2"
                  name="last name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                    {
                      type: "",
                      message: "Wrong last name format!",
                    },
                  ]}
                >
                  <Input className="py-2 h-14" placeholder="Last Name" />
                </Form.Item>
              </Flex>
              <Form.Item
                className="mb-5"
                name="zip code"
                rules={[
                  {
                    required: true,
                    message: "Please input your zip code!",
                  },
                  {
                    type: "number",
                    message: "Wrong zip code format!",
                  },
                ]}
              >
                <Input className="py-2 h-14" placeholder="Zip Code" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="bg-[var(--color-primary)] text-white py-5 text-base w-full"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
};
export default ClientRegisterToAuction;
