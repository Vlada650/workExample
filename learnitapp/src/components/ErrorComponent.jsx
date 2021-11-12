import React from "react";
import { Link } from "react-router-dom";
const ErrorComponent = () => {
    return (
        <div className="error-container">
            <div className="error-container__message">Page not found</div>
            <Link to="/" ><p className="error-container__message_link">You can return on our main page</p></Link>
        </div>
    )
}
export default ErrorComponent;