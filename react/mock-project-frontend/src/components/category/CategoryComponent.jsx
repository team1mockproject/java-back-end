import Item from "./ItemComponent";

const Category = ({ categoryTitle, items }) => {
  return (
    <div className={categoryTitle.toLowerCase().replace(/\s+/g, '-') + "mb-8"}>
      <h2 className="font-bold text-2xl">{categoryTitle}</h2>
      <div className="items flex gap-4">
        {items.map(item => (
          <Item
            key={item.title}
            title={item.title}
            imgSrc={item.imgSrc}
            imgAlt={item.imgAlt}
            links={item.links}
          />
        ))}
      </div>
    </div>
  )
}
export default Category