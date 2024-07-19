import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import Flickity from 'flickity';
import './flickity.css';
import './index.css';

import auctionImage from "../../assets/auction/auction.png";
const imgSlide = () => {
    const img = document.querySelector('.scos__sliders');
    const slide = document.querySelector('.auction-slider');
    if (document.contains(img) == true) {
        new Flickity(img, {
            freeScroll: false,
            prevNextButtons: true,
            wrapAround: true,
            lazyLoad: 3,
            draggable: false,
            autoPlay: 2000,
            pauseAutoPlayOnHover: true,
            contain: true,
            pageDots: false,
            cellAlign: 'center'
        });
    } else {
        console.log('Flickity element not found');
    }
    if (document.contains(slide) == true) {
        new Flickity(slide, {
            freeScroll: false,
            prevNextButtons: true,
            wrapAround: true,
            lazyLoad: 3,
            draggable: false,
            autoPlay: 2000,
            pauseAutoPlayOnHover: true,
            contain: true,
            pageDots: false,
            cellAlign: 'center'
        });
    }
};

const ClientHome = () => {
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
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    useEffect(() => {
        const handleLoad = () => {
            imgSlide();
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <>
            <section className="hero-banner py-10">
                <div className="container mx-auto relative">
                    <div className="scos__sliders">
                        <div className="scos__sliders-item block w-full">
                            <img src="./src/assets/homepage/img1-banner.jfif" alt="os-thumbnail1" className="thumbnail w-full h-full object-cover" />
                        </div>
                        <div className="scos__sliders-item block w-full" >
                            <img src="./src/assets/homepage/img2-banner.jfif" alt="os-thumbnail2" className="thumbnail w-full h-full object-cover" />
                        </div>
                        <div className="scos__sliders-item block w-full" >
                            <img src="./src/assets/homepage/img3-banner.jfif" alt="os-thumbnail3" className="thumbnail w-full h-full object-cover" />
                        </div>
                    </div>
                    <div style={{ top: '65%', left: '3%' }} className="absolute flex flex-col gap-4 bg-[rgba(0,37,62,.9)] w-full h-full max-h-[200px] max-w-[400px] p-5">
                        <h2 style={{ fontSize: '30px' }} className='text-white'>Your style, your space, your summer</h2>
                        <span style={{ fontSize: '16px' }} className='text-white'>Explore a range of items to complete your home’s look.</span>
                        <a style={{ fontSize: '14px', letterSpacing: '1px', fontWeight: '500' }} href="/categories" className="text-[#b68c2d]">
                            VIEW CATEGORIES
                        </a>
                    </div>
                </div>
            </section>
            <section className="upcoming-auction py-10">
                <div className="container mx-auto">
                    <h2 style={{ fontSize: '32px' }}>Upcoming Auctions</h2>
                    <div className="button flex justify-between">
                        <span className=''></span>
                        <a style={{ fontSize: '14px', fontWeight: '500' }} className='block text-[#23448d]' href="/list-auction">VIEW ALL</a>
                    </div>
                    <span style={{ fontSize: '16px', lineHeight: '30px', fontStyle: 'italic' }} className="title text-[#333]">We've lowered our Buyer's Premium to 20% on almost everything we sell. Click here to learn more about the new fee structure.</span>
                    <div className="items relative pt-10 pb-10">
                        <div className="auction-slider"> {/* Add Flickity class here */}
                            {dataListAuction.map((items, index) => (
                                <div className="fixed block w-full max-w-[600px] pr-10" key={index}> {/* Carousel cell for Flickity */}
                                    <div className="rounded-xl border p-2 md:p-5 bg-slate-100 cursor-pointer">
                                        <img src={items.img} alt="auction" className="rounded-xl" />
                                        <p className="font-bold text-xl mt-2">{items.name}</p>
                                        <p className="font-semibold text-xl my-2">{items.price}</p>
                                        <p>
                                            {items.bids} - {items.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className='submit-form max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg'>
                <h2 className="text-2xl font-semibold mb-4">Stay informed with us</h2>
                <p className="mb-6">Receive the best from our delivered to your inbox</p>
                <Form
                    name="stay_informed"
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-4"
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                        className="mb-4"
                        style={{ fontSize: '14px', fontWeight: '500' }}
                    >
                        <Input placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: false, message: 'Please select your title!' }]}
                        className="mb-4"
                        style={{ fontSize: '14px', fontWeight: '500' }}
                    >
                        <Input placeholder="title" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={[{ required: false, message: 'Please input your first name!' }]}
                        className="mb-4"
                        style={{ fontSize: '14px', fontWeight: '500' }}
                    >
                        <Input placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={[{ required: false, message: 'Please input your last name!' }]}
                        className="mb-4"
                        style={{ fontSize: '14px', fontWeight: '500' }}
                    >
                        <Input placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </Form.Item>

                    <Form.Item>
                        <button type="primary" htmlType="submit" className="w-full bg-slate-100 text-black py-2 rounded-lg hover:bg-slate-300">
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </section>
        </>
    );
};

export default ClientHome;
