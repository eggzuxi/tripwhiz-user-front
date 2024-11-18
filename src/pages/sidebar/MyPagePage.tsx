import MyPageComponent from "../../components/sidebar/MyPageComponent.tsx";
import BaseLayout from "../../layouts/BaseLayout.tsx";


function MyPagePage() {
    return (
        <BaseLayout>
            <MyPageComponent/>
        </BaseLayout>
    );
}

export default MyPagePage;