import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import { useWikipediaImage } from '../hooks/useWikipediaImage';

const categoryColors = {
    Conflict: 'bg-red-500',
    Politics: 'bg-blue-500',
    Culture: 'bg-purple-500',
    Science: 'bg-green-500',
    default: 'bg-gray-500'
};

const EventCard = ({ event, onClick, 'data-id': dataId }) => {
    const colorClass = categoryColors[event.category] || categoryColors.default;

    // Use specific query if provided, else title
    const query = event.imageQuery || event.title;
    const imageUrl = useWikipediaImage(query, event.image); // Fallback to event.image if provided

    return (
        <motion.div
            className="event-card"
            data-id={dataId}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => onClick(event)}
        >
            {imageUrl && (
                <div
                    className="card-image"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        height: '140px',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

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
