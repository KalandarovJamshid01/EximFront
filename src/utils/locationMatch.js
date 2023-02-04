import { useLocation } from "react-router";

function LocationMatch(path, includes=false) {
    const location = useLocation();
    const match = function() {
        if (includes && location.pathname.includes(path)) return true;
        else if (!includes && location.pathname.indexOf(path) !== - 1) return true;
        else return false;
    }();
    return match;
}

export default LocationMatch;