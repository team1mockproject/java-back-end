import Category from "../components/category/CategoryComponent";
import ClientFooter from "../components/client-footer/ClientFooter";
import ClientHeader from "../components/client-header";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
const Categories = () => {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const fetchData = async () => {
		// console.log(page, " - ", pageSize);
		setLoading(true);
		try {
			const response = await axios.get("http://localhost:8888/api/authenticate/category/all");
			setCategories(response.data);
			// console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{/* {console.log(categories)} */}
			<ClientHeader />

			<div className="flex mx-auto max-w-[1200px] justify-between my-12">
				<div className="categories-list sticky top-16 h-full">
					<h2 className="font-bold text-2xl">All Categories</h2>
					<div className="links">
						{categories.map((category) => (
							<a
								key={category.name}
								href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
								className="block text-blue-500 hover:bg-gray-300 hover:text-black my-1 p-2 flex justify-between items-center"
							>
								<span>{category.name}</span>
							</a>
						))}
					</div>
				</div>
				<div className="grid grid-rows-4 gap-4">
					{categories.map((category) => (
						<Category key={category.name} categoryTitle={category.name} items={category.assetNames} />
					))}
				</div>
			</div>
		</>
	);
};
export default Categories;
