import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
const ClientFooter = () => {
    return (
        <footer className="bg-[#f1f1f1] w-full max-w-full text-[#333] py-6">
            <div className="container flex justify-center w-full max-w-full mx-auto px-4">
                <div className="flex justify-between items-center text-center w-full max-w-[800px]">
                    <h2 className="text-32 font-bold mb-2">Follow Us</h2>
                    <a href="https://twitter.com" aria-label="Twitter">
                        <TwitterOutlined className="text-[#333] text-2xl" />
                    </a>
                    <a href="https://facebook.com" aria-label="Facebook">
                        <FacebookOutlined className="text-[#333] text-2xl" />
                    </a>
                    <a href="https://instagram.com" aria-label="Instagram">
                        <InstagramOutlined className="text-[#333] text-2xl" />
                    </a>
                    <a href="https://youtube.com" aria-label="Youtube">
                        <YoutubeOutlined className="text-[#333] text-2xl" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
export default ClientFooter