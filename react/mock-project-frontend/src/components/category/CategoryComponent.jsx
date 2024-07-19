import Item from "./ItemComponent";

const Category = ({ categoryTitle, items }) => {
	return (
		<div className="mb-8">
			{console.log(categoryTitle)}
			<h2 className="font-bold text-2xl">{categoryTitle}</h2>
			<div className="items flex gap-4">
				{items.map((item) => (
					<Item key={item} title={item} imgSrc={item} imgAlt={item} links={item} />
				))}
			</div>
		</div>
	);
};
export default Category;
