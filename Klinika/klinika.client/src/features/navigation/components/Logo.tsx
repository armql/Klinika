import {ReactNode} from "react";
import {Link} from "react-router-dom";

interface InnerProp {
    children: ReactNode;
}

export default function Logo({children}: InnerProp) {
    return (
        <Link to="./" className="font-semibold hover:opacity-80 text-5xl sm:text-start text-center">
            {children}
        </Link>
    );
}
