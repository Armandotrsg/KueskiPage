import { Tooltip } from "react-tooltip";

export const Button = ({
    children,
    onClick,
    type = "button",
    className,
    toolTipContent,
    toolTipPlace = "top",
    id,
    toolTipHide = "1100",
    toolTipVariant = "dark",
}) => {
    return (
        <>
            <button
                onClick={onClick}
                type={type}
                className={className}
                data-tooltip-content={toolTipContent}
                data-tooltip-id={id}
                data-tooltip-delay-show={toolTipHide}
                data-tooltip-variant={toolTipVariant}
            >
                {children}
            </button>
            <Tooltip id={id} place={toolTipPlace} type="dark" effect="solid" />
        </>
    );
};
