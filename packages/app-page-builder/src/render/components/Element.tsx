import React, { useMemo } from "react";

import { plugins } from "@webiny/plugins";
import { PbElement, PbRenderElementPlugin, PbTheme, PbThemePlugin } from "~/types";
import { usePageElements } from "@webiny/app-page-builder-elements/hooks/usePageElements";
import { Element as PeElement } from "@webiny/app-page-builder-elements/components/Element";
import tryRenderingPlugin from "~/utils/tryRenderingPlugin";

export interface ElementProps {
    element: PbElement;
}

const Element: React.FC<ElementProps> = props => {
    const { element } = props;

    // TODO @ts-refactor verify that PbTheme is correct
    const theme: PbTheme = useMemo(
        () => Object.assign({}, ...plugins.byType("pb-theme").map((pl: PbThemePlugin) => pl.theme)),
        []
    );

    if (!element) {
        return null;
    }

    const pageElements = usePageElements();
    if (pageElements) {
        return <PeElement element={element} />;
    }

    const plugin = plugins
        .byType<PbRenderElementPlugin>("pb-render-page-element")
        .find(pl => pl.elementType === element.type);

    if (!plugin) {
        return null;
    }

    const renderedPlugin = tryRenderingPlugin(() => plugin.render({ theme, element }));

    return <>{renderedPlugin}</>;
};

export default Element;
