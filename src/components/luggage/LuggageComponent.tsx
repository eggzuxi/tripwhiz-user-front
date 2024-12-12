import {useNavigate} from "react-router-dom";


function LuggageComponent() {

    const navigate = useNavigate();

    return (
        <div className="luggage-container">
            <h2 className="title">수화물 서비스</h2>
            <div
                className="service-card"
                onClick={() => navigate("/luggage/storage")}
            >
                <img
                    src="/images/luggage/luggage_storage.png"
                    alt="수화물 보관"
                    className="service-image"
                />
                <p className="service-label">수화물 보관</p>
            </div>

            <div className="service-card"
                 onClick={() => navigate("/luggage/move")}
            >
                <img
                    src="/images/luggage/luggage_move.png"
                    alt="수화물 이동"
                    className="service-image"
                />
                <p className="service-label">수화물 이동</p>
            </div>
        </div>
    );
}

export default LuggageComponent;