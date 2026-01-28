import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const Timeline = ({ events, onEventClick }) => {
    const scrollRef = useRef(null);

    const handleWheel = (e) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <div
            className="timeline-container"
            ref={scrollRef}
            onWheel={handleWheel}
        >
            <div className="timeline-track">
                <div className="timeline-line"></div>
                {events.map((event, index) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onClick={onEventClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
