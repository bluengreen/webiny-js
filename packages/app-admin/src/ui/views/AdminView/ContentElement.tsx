import React from "react";
import styled from "@emotion/styled";
import { UIElement } from "~/ui/UIElement";
import { UIRenderer, UIRenderParams } from "~/ui/UIRenderer";

const ContentWrapper = styled("div")({
    width: "100%",
    paddingTop: 67
});

class ContentElementRenderer extends UIRenderer<ContentElement> {
    public render({ next, props }: UIRenderParams<ContentElement>): React.ReactNode {
        return <ContentWrapper>{props.children ? props.children : next()}</ContentWrapper>;
    }
}

export class ContentElement extends UIElement {
    public constructor(id: string) {
        super(id);
        this.useGrid(false);
        this.addRenderer(new ContentElementRenderer());
        this.applyPlugins(ContentElement);
    }
}
