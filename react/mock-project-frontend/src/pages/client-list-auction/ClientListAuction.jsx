import {
  Col,
  Row,
  DatePicker,
  Slider,
  Checkbox,
  Input,
  Button,
  Pagination,
} from "antd";
import { IoSearch } from "react-icons/io5";
import auctionImage from "../../assets/auction/auction.png";
import { useState } from "react";

const ClientListAuction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const dataListAuction = [
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
    {
      img: auctionImage,
      name: "The Golden Maul of the First Mountain King",
      price: "$ 200.000",
      bids: "0 bids",
      time: "6d 10h 2m",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dataListAuction.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full h-screen p-5 overflow-auto">
      <Row>
        <Col className="w-2/6 md:w-1/6 border-r px-2 md:py-20">
          <h3 className="font-bold text-center mb-5">Auction Date</h3>
          <Row className="flex justify-between items-center mb-2">
            <label className="w-full font-semibold">From</label>

            <DatePicker className="w-4/5" />
          </Row>
          <Row className="flex justify-between items-center mb-2">
            <label className="w-full font-semibold">To</label>
            <DatePicker className="w-4/5" />
          </Row>
          <h3 className="font-bold text-center my-5">Money</h3>
          <Row className="flex justify-between items-center mb-2">
            <label className="font-semibold text-center">$0</label>
            <label className="font-semibold text-center">$10.000</label>
            <Slider defaultValue={3000} max={10000} className="w-full" />
          </Row>
          <h3 className="font-bold text-center my-5">Filter</h3>
          <Row className="flex justify-between items-center mb-2">
            <label className="font-semibold mb-2">Status</label>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Col className="w-full mb-2">
                <Checkbox value="ALl">All</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Up Comming">Up Coming</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="On Going">On Going</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Ended">Ended</Checkbox>
              </Col>
            </Checkbox.Group>
          </Row>
          <Row className="flex justify-between items-center mb-2">
            <label className="font-semibold mb-2">Location</label>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Col className="w-full mb-2">
                <Checkbox value="New York">New York</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="London">London</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Hong Kong">Hong Kong</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Paris">Paris</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Cologne">Cologne</Checkbox>
              </Col>
            </Checkbox.Group>
          </Row>
          <Row className="flex justify-between items-center mb-2">
            <label className="font-semibold mb-2">Exhibitions This Week</label>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Col className="w-full mb-2">
                <Checkbox value="Amsterdam">Amsterdam</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Aspen">Aspen</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="London">London</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Paris">Paris</Checkbox>
              </Col>
            </Checkbox.Group>
          </Row>
          <Row className="flex justify-between items-center mb-2">
            <label className="font-semibold mb-2">Category</label>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Col className="w-full mb-2">
                <Checkbox value="Contemporary">Contemporary</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Live">Impressionist & Modern Art</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Jewelry">Jewelry</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Watches">Watches</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Wine">Wine</Checkbox>
              </Col>
            </Checkbox.Group>
          </Row>
          <Row className="flex justify-between items-center mb-2">
            <label className="font-semibold mb-2">Sale</label>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Col className="w-full mb-2">
                <Checkbox value="Exhibitions">Exhibitions</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Impressionist & Modern Art">Live</Checkbox>
              </Col>
              <Col className="w-full mb-2">
                <Checkbox value="Online Only">Online Only</Checkbox>
              </Col>
            </Checkbox.Group>
          </Row>
        </Col>
        <Col className="w-4/6 md:w-5/6">
          {/* Search Component */}
          <Row className="flex justify-center px-5 md:px-10">
            <Col className="w-full md:w-3/5 flex h-10">
              <Input
                className="h-full rounded-tr-none rounded-br-none"
                placeholder="Search..."
              />
              <Button className="h-full rounded-tl-none rounded-bl-none">
                <IoSearch className="text-xl" />
              </Button>
            </Col>
          </Row>
          <Row className="w-full pl-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center items-center mt-10 gap-5">
            {currentItems.map((items, index) => (
              <Col key={index}>
                <div className="rounded-xl border p-2 md:p-5 bg-slate-100 cursor-pointer hover:scale-105 duration-300 ease-in-out">
                  <img src={items.img} alt="auction" className="rounded-xl" />
                  <p className="font-bold text-xl mt-2">{items.name}</p>
                  <p className="font-semibold text-xl my-2">{items.price}</p>
                  <p>
                    {items.bids} - {items.time}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={dataListAuction.length}
        onChange={handlePageChange}
        className="flex justify-center py-20"
      />
    </div>
  );
};

export default ClientListAuction;
