import * as React from "react";
import { default as RcTooltip } from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import "./style.scss";

interface TooltipProps {
    // A component (eg. button) which will trigger the tooltip.
    children: React.ReactNode;

    // Content which will be shown inside the tooltip.
    content: React.ReactNode;

    // Defines which action will trigger the tooltip: "hover", "click" or "focus".
    trigger?: string;

    // Can be "left","right","top","bottom", "topLeft", "topRight", "bottomLeft" or "bottomRight".
    placement?: string;

    // CSS class name
    className?: string;
}

interface State {
    tooltipIsOpen: boolean;
}

/**
 * Use Tooltip component to display a list of choices, once the handler is triggered.
 */
class Tooltip extends React.Component<TooltipProps, State> {
    state: State = { tooltipIsOpen: false };

    onVisibleChange = (visible: boolean) => {
        this.setState({
            tooltipIsOpen: visible
        });
    };

    render() {
        return (
            <RcTooltip
                /**
                 * rc-tooltip types do not have animation as prop, but the rc-tooltip lib has.
                 */
                // @ts-ignore
                animation={"fade"}
                onVisibleChange={this.onVisibleChange}
                overlay={this.props.content}
                {...this.props}
            >
                <span className="webiny-ui-tooltip tooltip-content-wrapper">
                    {this.props.children}
                </span>
            </RcTooltip>
        );
    }
}

export { Tooltip };
