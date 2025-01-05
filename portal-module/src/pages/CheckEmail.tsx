import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const CheckInboxPage: React.FC = () => {
    const menuItems = [
        { id: 1, name: 'Main Page', route: '/admin' },
    ];

    return (
        <div className="app-wrapper">
            <Navbar menuItemsProp={menuItems} />
            <main className="main-content">
                <div className="container mx-auto text-center mt-16">
                    <h1 className="text-3xl font-bold mb-4">Please Check Your Inbox</h1>
                    <p className="text-lg text-gray-600">An activation email has been sent to your email address. Follow the instructions to activate your account.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckInboxPage;
