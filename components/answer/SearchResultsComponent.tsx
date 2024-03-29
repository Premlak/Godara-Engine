import { useState, useEffect } from 'react';
export interface SearchResult {
    favicon: string;
    link: string;
    title: string;
}
export interface SearchResultsComponentProps {
    searchResults: SearchResult[];
}
const SearchResultsComponent = ({ searchResults }: { searchResults: SearchResult[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [loadedFavicons, setLoadedFavicons] = useState<boolean[]>([]);
    useEffect(() => {
        setLoadedFavicons(Array(searchResults.length).fill(false));
    }, [searchResults]);
    const toggleExpansion = () => setIsExpanded(!isExpanded);
    const visibleResults = isExpanded ? searchResults : searchResults.slice(0, 3);
    const handleFaviconLoad = (index: number) => {
        setLoadedFavicons((prevLoadedFavicons) => {
            const updatedLoadedFavicons = [...prevLoadedFavicons];
            updatedLoadedFavicons[index] = true;
            return updatedLoadedFavicons;
        });
    };
    const SearchResultsSkeleton = () => (
        <>
            {Array.from({ length: isExpanded ? searchResults.length : 3 }).map((_, index) => (
                <div key={index} className="p-2 w-full sm:w-1/2 md:w-1/4">
                    <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg h-full">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            ))}
        </>
    );
    return (
        <div className="bg-gray-950 shadow-lg rounded-lg p-4 mt-4">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold flex-grow">Sources</h2>
                <img src="./brave.png" alt="brave logo" className="w-6 h-6" />
            </div>
            <div className="flex flex-wrap my-2">
                {searchResults.length === 0 ? (
                    <SearchResultsSkeleton />
                ) : (
                    visibleResults.map((result, index) => (
                        <div key={index} className="p-2 w-full sm:w-1/2 md:w-1/4">
                            <div className="flex items-center space-x-2 p-3 rounded-lg h-full">
                                {!loadedFavicons[index] && (
                                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                                )}
                                <img
                                    src={result.favicon}
                                    alt="favicon"
                                    className={`w-5 h-5 ${loadedFavicons[index] ? 'block' : 'hidden'}`}
                                    onLoad={() => handleFaviconLoad(index)}
                                />
                                <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold truncate">
                                    {result.title}
                                </a>
                            </div>
                        </div>
                    ))
                )}
                <div className="w-full sm:w-full md:w-1/4 p-2">
                    <div
                        onClick={toggleExpansion}
                        className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer h-12 justify-center"
                    >
                        {!isExpanded ? (
                            <>
                                {searchResults.slice(3).map((result, index) => (
                                    <img key={index} src={result.favicon} alt="favicon" className="w-4 h-4" />
                                ))}
                                <span className="text-xs font-semibold">View more</span>
                            </>
                        ) : (
                            <span className="text-sm font-semibold">Show Less</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchResultsComponent;