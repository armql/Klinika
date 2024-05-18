import {NavLink} from "react-router-dom";
import {nav_data} from "../data/NavData";
import {Fragment, useEffect} from "react";
import BarIcon from "../../home/assets/icons/BarIcon";
import useToggle from "../../../hooks/useToggle";
import CloseIcon from "../../home/assets/icons/CloseIcon";

export default function NavLinks() {
    const {auto, close, effect} = useToggle();

    useEffect(() => {
        if (effect) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [effect]);

    return (
        <Fragment>
            <ul className="gap-4 sm:flex hidden">
                {nav_data.map((item) => (
                    <li key={item.id}>
                        <NavLink
                            to={item.to}
                            className={({isActive}) =>
                                `px-4 py-2.5 ${
                                    isActive
                                        ? "text-compact/70"
                                        : "hover:text-compact/70 text-compact"
                                } ${
                                    item.to === "register" &&
                                    "bg-primary/50 text-compact hover:bg-primary/70 rounded-md"
                                } ${isActive && "cursor-default"}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            {/* <div className="fixed bottom-0 p-4 flex justify-center items-center left-0 right-0  z-20"> */}
            <button
                type="button"
                onClick={auto}
                className="sm:hidden block z-40 p-4 rounded-full"
            >
                {!effect ? <BarIcon/> : <CloseIcon/>}
            </button>
            {/* </div> */}
            {effect && (
                <div
                    className="fixed w-full h-full bottom-0 left-0 z-30 right-0 top-0 bg-white backdrop-blur-sm bg-opacity-95">
                    <ul className="gap-8 flex flex-col w-full h-full items-center justify-center">
                        {nav_data.map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.to}
                                    onClick={close}
                                    className={({isActive}) =>
                                        `p-2 text-3xl font-medium ${
                                            isActive
                                                ? "font-semibold"
                                                : "hover:text-compact/70 text-compact"
                                        } ${
                                            item.to === "register" &&
                                            "bg-primary text-compact hover:bg-primary/90 rounded-md px-4"
                                        } ${isActive && "cursor-default"}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Fragment>
    );
}
