import axios from "axios";
import { useEffect, useState } from "react";
const Test = () => {
	const [pageCurrent, setPageCurrent] = useState(1);
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({
		current: pageCurrent,
		pageSize: 10,
		total: 0,
	});
	const [loading, setLoading] = useState(false);

	const fetchData = async (page, pageSize) => {
		setLoading(true);
		try {
			const response = await axios.get("http://localhost:8888/api/authenticate/account", {
				params: {
					page: page, // assuming your API uses 0-based page index
					size: pageSize,
				},
			});

			const { content, totalElements, pageNumber, pageSize: responsePageSize } = response;
			setData(content);
			setPagination({
				current: pageNumber,
				pageSize: responsePageSize,
				total: totalElements,
			});
			console.log(response);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(pagination.current, pagination.pageSize);
	}, []);

	const handleTableChange = (pagination) => {
		fetchData(pagination.current, pagination.pageSize);
		console.log(pagination.current);
	};
};
export default Test;
