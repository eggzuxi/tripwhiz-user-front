
function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        </div>
    );
}

export default LoadingPage;