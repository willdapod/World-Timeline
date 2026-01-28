import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundImage = ({ imageUrl }) => {
    return (
        <div className="background-container">
            <div className="background-overlay" />
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={imageUrl}
                    className="background-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            </AnimatePresence>
        </div>
    );
};

export default BackgroundImage;
