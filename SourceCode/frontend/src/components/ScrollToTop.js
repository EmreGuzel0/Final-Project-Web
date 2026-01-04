import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const action = useNavigationType();

    useEffect(() => {
        const handleUnload = () => window.scrollTo(0, 0);
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);

    useEffect(() => {
        // Scroll to top unless the user pressed the "Back" button
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action, pathname]);

    return null;
}

export default ScrollToTop;