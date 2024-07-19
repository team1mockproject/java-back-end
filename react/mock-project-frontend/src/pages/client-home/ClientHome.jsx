import React, { useEffect } from 'react';
import Flickity from 'flickity';
import './flickity.css';
import './index.css';

import auctionImage from "../../assets/auction/auction.png";
import { Col, Row } from 'antd';
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
        </>
    );
};

export default ClientHome;
