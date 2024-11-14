
import { useNavigate } from 'react-router-dom';

function ThemePage(): JSX.Element {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate('/product/list');
    };


    return (
        <div className="grid grid-cols-2 gap-4 p-5">
            <div
                className="bg-gray-300 h-40 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleItemClick}
            >
                이미지 1
            </div>
            <div
                className="bg-gray-300 h-40 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleItemClick}
            >
                이미지 2
            </div>
            <div
                className="bg-gray-300 h-40 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleItemClick}
            >
                이미지 3
            </div>
            <div
                className="bg-gray-300 h-40 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleItemClick}
            >
                이미지 4
            </div>
            <div
                className="bg-gray-300 h-40 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleItemClick}
            >
                이미지 5
            </div>
            <div
                className="bg-gray-300 h-40 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleItemClick}
            >
                이미지 6
            </div>
        </div>
    );
}

export default ThemePage;
