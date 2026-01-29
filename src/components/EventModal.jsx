import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <h2 className="modal-title">{event.title}</h2>
                    <span className="modal-year">{event.year}</span>
                    <p className="modal-description">{event.details || event.description}</p>

                    <div className="modal-footer">
                        <span className="modal-category">{event.category}</span>
                        <a
                            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(event.imageQuery || event.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wiki-link"
                            style={{
                                color: 'var(--accent-color)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                marginLeft: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Read on Wikipedia ↗
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EventModal;
