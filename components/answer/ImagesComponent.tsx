import { useState } from 'react';
interface Image {
    link: string;
    alt?: string;
}
interface ImagesComponentProps {
    images: Image[];
}
const ImagesComponent: React.FC<ImagesComponentProps> = ({ images }) => {
    const [showMore, setShowMore] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const ImagesSkeleton = () => (
        <>
            {Array.from({ length: showMore ? 9 : 3 }).map((_, index) => (
                <div key={index} className="w-1/3 p-1">
                    <div className="w-full overflow-hidden aspect-square">
                        <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            ))}
            <div className="flex justify-center mt-4 w-full">
                <div className="bg-gray-200 rounded-lg animate-pulse py-5 px-15 " style={{ height: '24px', width: '85px' }}></div>
            </div>
        </>
    );
    const handleImageClick = (link: string) => {
        setSelectedImage(link);
    };
    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setSelectedImage(null);
        }
    };
    return (
        <div className="bg-dark shadow-lg rounded-lg p-4 mt-4">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold flex-grow">Images</h2>
                <img src="./brave.png" alt="brave logo" className="w-6 h-6" />
            </div>
            <div className={`flex flex-wrap mx-1 text-red-50 transition-all duration-500 ${showMore ? 'max-h-[500px]' : 'max-h-[200px]'} overflow-hidden`}>
                {images.length === 0 ? (
                    <ImagesSkeleton />
                ) : (
                    images.slice(0, showMore ? 9 : 3).map((image, index) => (
                        <div
                            key={index}
                            className="transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 w-1/3 p-1 cursor-pointer"
                            onClick={() => handleImageClick(image.link)}
                        >
                            <div className="w-full overflow-hidden aspect-square">
                                <img
                                    src={image.link}
                                    alt={image.alt || `Image ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
            {images.length > 3 && (
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-dark hover:bg-gray-100 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={handleCloseModal}
                >
                    <div className="max-w-5xl max-h-full">
                        <img src={selectedImage} alt="Full size" className="max-w-full max-h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};
export default ImagesComponent;