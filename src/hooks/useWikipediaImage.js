import { useState, useEffect } from 'react';

const imageCache = {};

export const useWikipediaImage = (query, fallbackImage) => {
    const [imageUrl, setImageUrl] = useState(fallbackImage || null);

    useEffect(() => {
        if (!query) return;

        // Check cache first
        if (imageCache[query]) {
            setImageUrl(imageCache[query]);
            return;
        }

        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${encodeURIComponent(query)}`
                );
                const data = await response.json();
                const pages = data.query?.pages;

                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    const page = pages[pageId];
                    const url = page.original?.source;

                    if (url) {
                        imageCache[query] = url;
                        setImageUrl(url);
                    } else {
                        // No image found, try description or valid fallback?
                        // For now keep null or pre-set fallback
                    }
                }
            } catch (error) {
                console.error("Error fetching Wiki image:", error);
            }
        };

        fetchImage();
    }, [query]);

    return imageUrl || fallbackImage;
};
