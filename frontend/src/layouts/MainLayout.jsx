import { Outlet, Navigate } from 'react-router-dom';

const MainLayout = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Mini-SaaS Tasks</h1>
                    <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-500">
                        Logout
                    </button>
                </div>
            </header>
            <main className="flex-1">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
