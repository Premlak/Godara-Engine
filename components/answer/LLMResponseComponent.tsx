interface LLMResponseComponentProps {
    llmResponse: string;
    currentLlmResponse: string;
    index: number;
}
import Markdown from 'react-markdown';
const StreamingComponent = ({ currentLlmResponse }: { currentLlmResponse: string }) => {
    return (
        <>
            {currentLlmResponse && (
                <div className="shadow-lg rounded-lg p-4 mt-4">
                    <div className="bg-gray-300 flex items-center">
                        <h2 className="text-lg font-semibold flex-grow text-red-50">Answer</h2>
                        <img src="./groq.png" alt="groq logo" className='w-6 h-6' />
                    </div>
                    {currentLlmResponse}
                </div>
            )}
        </>
    );
};
const LLMResponseComponent = ({ llmResponse, currentLlmResponse, index }: LLMResponseComponentProps) => {
    const hasLlmResponse = llmResponse && llmResponse.trim().length > 0;
    return (
        <>
            {hasLlmResponse ? (
                <div className="text-red-50 shadow-lg rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold flex-grow">Answer</h2>
                        <img src="./mistral.png" alt="mistral logo" className='w-6 h-6 mr-2' />
                        <img src="./groq.png" alt="groq logo" className='w-6 h-6' />
                    </div>
                    <Markdown>{llmResponse}</Markdown>
                </div>
            ) : (
                <StreamingComponent currentLlmResponse={currentLlmResponse} />
            )}
        </>
    );
};

export default LLMResponseComponent;