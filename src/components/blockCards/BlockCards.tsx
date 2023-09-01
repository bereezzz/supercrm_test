import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Card, CardProps } from '../card/Card';
import "./blockCards.scss";
import { GetCard } from '../../APIs';
import { faker } from '@faker-js/faker';

export default function BlockCards() {
    const [cards, setCards] = useState<CardProps[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const page = useRef<number>(1);
    const limit: number = 10;
    const [count, setCount] = useState(0)
    const [hasMoreData, setHasMoreData] = useState(true);

    async function getCard() {
        try {
            const response = await GetCard(page.current, limit);
            if (response.length === 0) {
                setHasMoreData(false); 
            } else {
                const newData = response.map((item) => ({
                    ...item,
                    startDate: `${faker.date.month({
                        abbreviated: true,
                    })} ${faker.number.int({ min: 1, max: 30 })}, ${format(faker.date.anytime(), 'hh:mm a')}`,
                    endDate: `${faker.date.month({
                        abbreviated: true,
                    })} ${faker.number.int({ min: 1, max: 30 })}, ${format(faker.date.anytime(), 'hh:mm a')}`,
                    disc: faker.lorem.sentence(),
                    pTag: faker.lorem.word(),
                    gTag: faker.lorem.word(),
                }));
                setCards((prevItems) => [...prevItems, ...newData]);
                setCount((prevCount) => prevCount + limit);
                page.current += 1;
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const containerElement = containerRef.current;

        if (containerElement) {
            containerElement.addEventListener('scroll', () => {
                if (
                    Math.round(containerElement.scrollTop + containerElement.clientHeight) >=
                    containerElement.scrollHeight && hasMoreData
                ) {
                    getCard();
                }
            });
        }

        return () => {
            if (containerElement) {
                containerElement.removeEventListener('scroll', () => {
                });
            }
        };
    }, []);

    useEffect(() => {
        getCard();
    }, []);
    return (
        <div className='blockCards'>
            <div className='header_cards'>
                <p className='text'>Today</p>
                <div className='countBlock'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect width="20" height="20" rx="4" fill="#EBEEF6" />
                        <mask id="mask0_1_146" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_1_146)">
                            <path d="M10.0007 15.9486C9.73465 15.9486 9.51017 15.8571 9.32719 15.6741C9.14422 15.4911 9.05273 15.2667 9.05273 15.0007V10.9486H5.00065C4.73465 10.9486 4.51016 10.8571 4.32719 10.6741C4.14422 10.4911 4.05273 10.2667 4.05273 10.0007C4.05273 9.73465 4.14422 9.51017 4.32719 9.32719C4.51016 9.14422 4.73465 9.05273 5.00065 9.05273H9.05273V5.00065C9.05273 4.73465 9.14422 4.51017 9.32719 4.32719C9.51017 4.14422 9.73465 4.05273 10.0007 4.05273C10.2667 4.05273 10.4911 4.14422 10.6741 4.32719C10.8571 4.51017 10.9486 4.73465 10.9486 5.00065V9.05273H15.0007C15.2667 9.05273 15.4911 9.14422 15.6741 9.32719C15.8571 9.51017 15.9486 9.73465 15.9486 10.0007C15.9486 10.2667 15.8571 10.4911 15.6741 10.6741C15.4911 10.8571 15.2667 10.9486 15.0007 10.9486H10.9486V15.0007C10.9486 15.2667 10.8571 15.4911 10.6741 15.6741C10.4911 15.8571 10.2667 15.9486 10.0007 15.9486Z" fill="#3D8FEC" />
                        </g>
                    </svg>
                    <div className='count'>
                        {count}
                    </div>
                </div>
            </div>
            <div className='cards' ref={containerRef}>
                {cards.map((card, index) => {
                    return <Card
                        key={index}
                        completed={card.completed}
                        disc={card.disc}
                        endDate={card.endDate}
                        gTag={card.gTag}
                        pTag={card.pTag}
                        startDate={card.startDate}
                        title={card.title}
                    ></Card>
                })}
            </div>


        </div>
    );
}


