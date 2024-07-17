import Category from "../components/category/CategoryComponent";
import ClientFooter from "../components/client-footer/ClientFooter";
import ClientHeader from "../components/client-header";
const categories = [
    {
        categoryTitle: "Arts",
        items: [
            {
                title: "Contemporary Art",
                imgSrc: "../src/assets/category/img1-art.jfif",
                imgAlt: "contemporary-art",
                links: [
                    { href: "#", text: "American Art" },
                    { href: "#", text: "European Art" },
                    { href: "#", text: "American Art" },
                ],
            },
            {
                title: "Modern Art",
                imgSrc: "../src/assets/category/img2-art.jfif",
                imgAlt: "modern-art",
                links: [
                    { href: "#", text: "American Art" },
                    { href: "#", text: "European Art" },
                    { href: "#", text: "American Art" },
                ],
            },
            {
                title: "Contemporary Art",
                imgSrc: "../src/assets/category/img1-art.jfif",
                imgAlt: "contemporary-art",
                links: [
                    { href: "#", text: "American Art" },
                    { href: "#", text: "European Art" },
                    { href: "#", text: "American Art" },
                ],
            },
        ],
    },
    {
        categoryTitle: "Jewelry",
        items: [
            {
                title: "Fine Jewelry",
                imgSrc: "../src/assets/category/img1-jewelry.jfif",
                imgAlt: "fine-jewelry",
                links: [
                    { href: "#", text: "Fine Rings" },
                    { href: "#", text: "Fine Necklaces" },
                    { href: "#", text: "Fine Rings" },
                ],
            },
            {
                title: "Fashion Jewelry",
                imgSrc: "../src/assets/category/img2-jewelry.jfif",
                imgAlt: "fashion-jewelry",
                links: [
                    { href: "#", text: "Fashion Rings" },
                    { href: "#", text: "Fashion Necklaces" },
                    { href: "#", text: "Fine Rings" },
                ],
            },
            {
                title: "Fine Jewelry",
                imgSrc: "../src/assets/category/img1-jewelry.jfif",
                imgAlt: "fine-jewelry",
                links: [
                    { href: "#", text: "Fine Rings" },
                    { href: "#", text: "Fine Necklaces" },
                    { href: "#", text: "Fine Rings" },
                ],
            },
        ],
    },
    {
        categoryTitle: "Antique",
        items: [
            {
                title: "Antique Arts",
                imgSrc: "../src/assets/category/img1-antique.jfif",
                imgAlt: "antique-art",
                links: [
                    { href: "#", text: "Gothic" },
                    { href: "#", text: "Vintage" },
                    { href: "#", text: "Gothic" },
                ],
            },
            {
                title: "Antique Furnitures",
                imgSrc: "../src/assets/category/img2-antique.jfif",
                imgAlt: "antique-furnitures",
                links: [
                    { href: "#", text: "Seating " },
                    { href: "#", text: "Tables" },
                    { href: "#", text: "Seating " },
                ],
            },
            {
                title: "Antique Arts",
                imgSrc: "../src/assets/category/img1-antique.jfif",
                imgAlt: "antique-art",
                links: [
                    { href: "#", text: "Gothic" },
                    { href: "#", text: "Vintage" },
                    { href: "#", text: "Gothic" },
                ],
            },
        ],
    },
    {
        categoryTitle: "Collectible Items",
        items: [
            {
                title: "Coins",
                imgSrc: "../src/assets/category/img1-collectible.jfif",
                imgAlt: "coins",
                links: [
                    { href: "#", text: "US coins" },
                    { href: "#", text: "World coins" },
                    { href: "#", text: "US coins" },
                ],
            },
            {
                title: "Toys",
                imgSrc: "../src/assets/category/img2-collectible.jfif",
                imgAlt: "toys",
                links: [
                    { href: "#", text: "Characters" },
                    { href: "#", text: "Items" },
                    { href: "#", text: "Characters" },
                ],
            },
            {
                title: "Coins",
                imgSrc: "../src/assets/category/img1-collectible.jfif",
                imgAlt: "coins",
                links: [
                    { href: "#", text: "US coins" },
                    { href: "#", text: "World coins" },
                    { href: "#", text: "US coins" },
                ],
            },
        ],
    },
    {
        categoryTitle: "Bags and Fashion",
        items: [
            {
                title: "Handbags",
                imgSrc: "../src/assets/category/img1-bags.jfif",
                imgAlt: "handbags",
                links: [
                    { href: "#", text: "Hermès" },
                    { href: "#", text: "Chanel" },
                    { href: "#", text: "Louis Vuitton" },
                ],
            },
            {
                title: "Watches",
                imgSrc: "../src/assets/category/img2-bags.jfif",
                imgAlt: "watches",
                links: [
                    { href: "#", text: "Rolex" },
                    { href: "#", text: "Omega" },
                    { href: "#", text: "Cartier" },
                ],
            },
            {
                title: "Sneaker",
                imgSrc: "../src/assets/category/img3-bags.jfif",
                imgAlt: "sneaker",
                links: [
                    { href: "#", text: "Nike" },
                    { href: "#", text: "Louis Vuitton" },
                    { href: "#", text: "Reebok" },
                ],
            },
        ],
    },
    {
        categoryTitle: "Electronics",
        items: [
            {
                title: "Computers, Tablet & Network Hardware",
                imgSrc: "../src/assets/category/img1-electronics.jfif",
                imgAlt: "handbags",
                links: [
                    { href: "#", text: "Laptop & Netbooks" },
                    { href: "#", text: "Desktop & All-in-one Computers" },
                    { href: "#", text: "Tablet & eReaders" },
                ],
            },
            {
                title: "Cell Phone, Smart Watches & Accessories",
                imgSrc: "../src/assets/category/img2-electronics.jfif",
                imgAlt: "watches",
                links: [
                    { href: "#", text: "Cell Phones & Smartphones" },
                    { href: "#", text: "Smart Watches" },
                    { href: "#", text: "Portable audio & Headphones" },
                ],
            },
            {
                title: "Video Games & Consoles",
                imgSrc: "../src/assets/category/img3-electronics.jfif",
                imgAlt: "sneaker",
                links: [
                    { href: "#", text: "Video Games" },
                    { href: "#", text: "Video Games Consoles" },
                    { href: "#", text: "Video Games Accessories" },
                ],
            },
        ],
    }
];
const Categories = () => {
    return (
        <>
            <ClientHeader />

            <div className="flex mx-auto max-w-[1200px] justify-between my-12">
                <div className="categories-list sticky top-16 h-full">
                    <h2 className="font-bold text-2xl">All Categories</h2>
                    <div className="links">
                        {categories.map(category => (
                            <a
                                key={category.categoryTitle}
                                href={`#${category.categoryTitle.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-blue-500 hover:bg-gray-300 hover:text-black my-1 p-2 flex justify-between items-center"
                            >
                                <span>{category.categoryTitle}</span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="grid grid-rows-4 gap-4">
                    {categories.map(category => (
                        <Category
                            key={category.categoryTitle}
                            categoryTitle={category.categoryTitle}
                            items={category.items}
                        />
                    ))}
                </div>
            </div>
            <ClientFooter />
        </>
    )
}
export default Categories