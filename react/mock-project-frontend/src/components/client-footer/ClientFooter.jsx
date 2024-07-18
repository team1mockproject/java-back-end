import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
const ClientFooter = () => {
    return (
        <footer className=" w-full max-w-full flex flex-col items-center text-[#333] py-6">
            <div className="bg-[#f1f1f1] container w-full max-w-full mx-auto px-4">
                <div className="flex justify-between text-center w-full max-w-[800px] mx-auto pt-5 pb-5">
                    <h2 className="text-3xl font-bold mb-2">Follow Us</h2>
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
            <div className='w-full max-w-[600px] flex justify-between mt-5'>
                <div className="links">
                    <span className='text-[#6b6b6b] font-bold cursor-default'>SUPPORT</span>
                    <div className="flex flex-col gap-4 mt-2">
                        <a href="#" className='hover:underline'>Help Center</a>
                        <a href="#" className='hover:underline'>Locations</a>
                        <a href="#" className='hover:underline'>Apps</a>
                    </div>
                </div>
                <div className="items">
                    <span className='text-[#6b6b6b] font-bold cursor-default'>CORPORATE</span>
                    <div className="flex flex-col gap-4 mt-2">
                        <a href="#" className='hover:underline'>Press</a>
                        <a href="#" className='hover:underline'>Privacy Policy</a>
                        <a href="#" className='hover:underline'>Corporate Governance</a>
                        <a href="#" className='hover:underline'>Careers</a>
                    </div>
                </div>
                <div className="items">
                    <span className='text-[#6b6b6b] font-bold cursor-default'>MORE...</span>
                    <div className="flex flex-col gap-4 mt-2">
                        <a href="#" className='hover:underline'>Security</a>
                        <a href="#" className='hover:underline'>Terms & Conditions</a>
                        <a href="#" className='hover:underline'>Conditions of Business</a>
                        <a href="#" className='hover:underline'>Modern Slavery Statement</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default ClientFooter