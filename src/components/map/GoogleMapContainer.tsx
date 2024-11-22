import { Status, Wrapper } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMapsComponent.tsx';

const render = (status: Status) => {
    switch (status) {
        case Status.LOADING:
            return <>로딩중...</>;
        case Status.FAILURE:
            return <>에러 발생</>;
        case Status.SUCCESS:
            return <GoogleMap />;
        default:
            return <>에러 발생</>;
    }
};

const GoogleMapContainer: React.FC = () => {
    return (
        <Wrapper
            apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}  // 환경 변수에서 API 키를 가져옴
            render={render}
            libraries={['places']}
        />
    );
}

export default GoogleMapContainer;
