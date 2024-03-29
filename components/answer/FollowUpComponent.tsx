interface FollowUp {
    choices: {
        message: {
            content: string;
        };
    }[];
}
const FollowUpComponent = ({ followUp, handleFollowUpClick }: { followUp: FollowUp; handleFollowUpClick: (question: string) => void }) => {
    const handleQuestionClick = (question: string) => {
        handleFollowUpClick(question);
    };
    return (
        <div className="bg-dark shadow-lg rounded-lg p-4 mt-4">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold flex-grow">Relevant</h2>
                <img src="./mistral.png" alt="mistral logo" className='w-6 h-6 mr-2' />
                <img src="./groq.png" alt="groq logo" className='w-6 h-6' />
            </div>
            <ul className="mt-2 text-red-50">
                {followUp.choices[0].message.content && JSON.parse(followUp.choices[0].message.content).followUp.map((question: string, index: number) => (
                    <li
                        key={index}
                        className="flex items-center mt-2 cursor-pointer"
                        onClick={() => handleQuestionClick(question)}
                    >
                        <span role="img" aria-label="link" className="mr-2">🔗</span>
                        <p className="text-red-50 hover:underline">{`${question}`}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FollowUpComponent;