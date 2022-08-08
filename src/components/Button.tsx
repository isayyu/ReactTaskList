import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes: any = {
    primary: "primary",
    secondary: "secondary",
};

const Button: React.FC<{
    taskList?: any;
    types?: string;
    children?: any;
    type?: any;
    disabled?: boolean;
    variant?: string;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void,
    onKeyDown?: React.KeyboardEventHandler,
}> = ({ children, type, variant, ...rest }: any) => {
    return (
        <button
            className={getClasses([
                styles.button,
                styles[`button--${buttonTypes[variant]}`],
            ])}
            type={type === "submit" ? "submit" : "button"}
            {...rest}
        >
            {children}
        </button>
    );
};

function SelectButton({ children, _id, ...rest }: any) {
    return (
        <select
            className={getClasses([styles.button, styles.button__select])}
            {...rest}
        >
            {children}
        </select>
    );
}

export { SelectButton };
export default Button;
