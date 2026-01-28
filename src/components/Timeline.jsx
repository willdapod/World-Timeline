import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const Timeline = ({ events, onEventClick, onFocusedEvent }) => {
    const scrollRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const options = {
            root: scrollRef.current,
            threshold: 0.6, // Higher threshold => must be more visible to be "focused"
            rootMargin: "0px -30% 0px -30%" // Focus area in the center portion
        };

        observerRef.current = new IntersectionObserver((entries) => {
            // Find the most visible entry or just the first intersecting one
            const intersecting = entries.find(entry => entry.isIntersecting);
            if (intersecting) {
                const eventId = intersecting.target.getAttribute('data-id');
                const event = events.find(e => e.id === eventId);
                if (event && onFocusedEvent) {
                    onFocusedEvent(event);
                }
            }
        }, options);

        const cards = document.querySelectorAll('.event-card');
        cards.forEach(card => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [events, onFocusedEvent]);

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
                        data-id={event.id}
                        event={event}
                        onClick={onEventClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
