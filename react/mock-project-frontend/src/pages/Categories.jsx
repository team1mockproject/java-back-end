import Category from "../components/category/CategoryComponent";
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
                    { href: "", text: "American Art" },
                    { href: "", text: "European Art" },
                ],
            },
            {
                title: "Modern Art",
                imgSrc: "../src/assets/category/img2-art.jfif",
                imgAlt: "modern-art",
                links: [
                    { href: "", text: "American Art" },
                    { href: "", text: "European Art" },
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
                    { href: "", text: "Fine Rings" },
                    { href: "", text: "Fine Necklaces" },
                ],
            },
            {
                title: "Fashion Jewelry",
                imgSrc: "../src/assets/category/img2-jewelry.jfif",
                imgAlt: "fashion-jewelry",
                links: [
                    { href: "", text: "Fashion Rings" },
                    { href: "", text: "Fashion Necklaces" },
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
                    { href: "", text: "Gothic" },
                    { href: "", text: "Vintage" },
                ],
            },
            {
                title: "Antique Furnitures",
                imgSrc: "../src/assets/category/img2-antique.jfif",
                imgAlt: "antique-furnitures",
                links: [
                    { href: "", text: "Seating " },
                    { href: "", text: "Tables" },
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
                    { href: "", text: "US coins" },
                    { href: "", text: "World coins" },
                ],
            },
            {
                title: "Toys",
                imgSrc: "../src/assets/category/img2-collectible.jfif",
                imgAlt: "toys",
                links: [
                    { href: "", text: "Characters" },
                    { href: "", text: "Items" },
                ],
            },
        ],
    },
];
const Categories = () => {
    return (
        <>
            <ClientHeader />
            <div className="flex items-center justify-center my-12">
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
        </>
    )
}
export default Categories