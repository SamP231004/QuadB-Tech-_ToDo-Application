import React from 'react';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="container">
                <div className="footer-content">
                    <p>
                        TaskMaster &copy; {new Date().getFullYear()} - All Rights Reserved
                    </p>
                    <div className="footer-links">
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <a href="#" className="footer-link">Terms of Service</a>
                        <a href="#" className="footer-link">Contact Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;