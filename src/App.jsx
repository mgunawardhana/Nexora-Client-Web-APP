import { useState } from "react";
import TopRatedServices from "./components/TopRatedServices.jsx";
import FooterSection from "./components/FooterSection.jsx";
import LoginPage from "./components/LoginPage.jsx";

function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    // If not authenticated, show login page
    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    // If authenticated, show the QR scanner and other components
    return (
        <>
            {/* Navigation Bar with Logout */}
            <nav className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">HR Registry System</h1>
                        <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <TopRatedServices />
            <FooterSection />
        </>
    );
}

export default App;