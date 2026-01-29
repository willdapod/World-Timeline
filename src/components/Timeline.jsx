import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const Timeline = ({ events, onEventClick, onFocusedEvent }) => {
    const scrollRef = useRef(null);
    const observerRef = useRef(null);

    // Drag state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isClick = useRef(true);

    useEffect(() => {
        const options = {
            root: scrollRef.current,
            threshold: 0.6,
            rootMargin: "0px -30% 0px -30%"
        };

        observerRef.current = new IntersectionObserver((entries) => {
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

    const onMouseDown = (e) => {
        isDragging.current = true;
        isClick.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;

        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;

        if (Math.abs(walk) > 5) {
            isClick.current = false;
        }
    };

    const handleEventClick = (event) => {
        if (isClick.current) {
            onEventClick(event);
        }
    };

    return (
        <div
            className="timeline-container"
            ref={scrollRef}
            onWheel={handleWheel}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={{ cursor: 'grab' }}
        >
            <div className="timeline-track">
                <div className="timeline-line"></div>
                {events.map((event, index) => (
                    <EventCard
                        key={event.id}
                        data-id={event.id}
                        event={event}
                        onClick={handleEventClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
