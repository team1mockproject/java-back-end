const Item = ({ title, imgSrc, imgAlt, links }) => {
    return (
        <div className="item grid grid-col-2 gap-2 m-2">
            <span className="font-bold text-base border-b-2 border-gray-400 ">{title}</span>
            <div className="box">
                <div className="max-w-[300px] max-h-[120px] overflow-hidden bg-gray-200">
                    <a href=""><img src={imgSrc} alt={imgAlt} className={imgAlt + "w-full h-auto"} /></a>
                </div>
                <div className="links">
                    <ul className="flex flex-col gap-2 my-4">
                        {links.map(link => (
                            <li key={link.href}><a className="hover:underline" href={link.href}>{link.text}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Item