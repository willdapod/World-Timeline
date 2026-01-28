import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';

const categoryColors = {
    Conflict: 'bg-red-500',
    Politics: 'bg-blue-500',
    Culture: 'bg-purple-500',
    Science: 'bg-green-500',
    default: 'bg-gray-500'
};

const EventCard = ({ event, onClick }) => {
    const colorClass = categoryColors[event.category] || categoryColors.default;

    return (
        <motion.div
            className="event-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => onClick(event)}
        >
            <div className={`event-year ${colorClass}`}>
                <Calendar size={16} className="inline-block mr-1" />
                {event.year}
            </div>
            <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <span className={`event-category ${colorClass}`}>
                    <Tag size={12} className="inline-block mr-1" />
                    {event.category}
                </span>
                <p className="event-desc">{event.description}</p>
            </div>
        </motion.div>
    );
};

export default EventCard;
