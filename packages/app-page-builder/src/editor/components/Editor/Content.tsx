import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import { css } from "emotion";
import kebabCase from "lodash/kebabCase";
import { plugins } from "@webiny/plugins";
import { Elevation } from "@webiny/ui/Elevation";
import {
    PbEditorContentPlugin,
    PbPageLayout,
    PbPageLayoutPlugin,
    PbEditorElement
} from "../../../types";
import {
    isPluginActiveSelector,
    layoutSelector,
    uiAtom,
    setPagePreviewDimensionMutation,
    rootElementAtom,
    elementsAtom
} from "../../recoil/modules";

import { usePageBuilder } from "../../../hooks/usePageBuilder";
import Element from "../Element";

const BREADCRUMB_HEIGHT = 33;
const ContentContainer = styled("div")(({ theme }) => ({
    backgroundColor: (theme as any)?.colors?.background,
    position: "relative",
    margin: "0 auto",
    ".webiny-pb-page-document": {
        overflowY: "visible", // cuts off the block selector tooltip
        overflowX: "visible",
        // We need this extra spacing so that editor content won't get cutoff
        paddingBottom: BREADCRUMB_HEIGHT
    }
}));
const contentContainerWrapper = css({
    margin: "95px 65px 50px 85px",
    padding: 0,
    position: "absolute",
    width: "calc(100vw - 115px - 300px)",
    //overflow: "hidden", // cuts off the block selector tooltip
    top: 0,
    boxSizing: "border-box",
    zIndex: 1
});
const BaseContainer = styled("div")({
    width: "100%",
    left: 52,
    margin: "0 auto"
});
const renderContent = (layout: PbPageLayout, rootElement: PbEditorElement, render: boolean) => {
    const content = <Element id={rootElement.id} />;
    if (!render) {
        return content;
    }
    return React.createElement(layout.component, null, content);
};

const Content = () => {
    const rootElementId = useRecoilValue(rootElementAtom);
    const rootElement = useRecoilValue(elementsAtom(rootElementId));
    const renderLayout = useRecoilValue(isPluginActiveSelector("pb-editor-toolbar-preview"));
    const layout = useRecoilValue(layoutSelector);
    const [{ displayMode }, setUiAtomValue] = useRecoilState(uiAtom);
    const pagePreviewRef = useRef();

    const setPagePreviewDimension = useCallback(
        pagePreviewDimension => {
            setUiAtomValue(prev => setPagePreviewDimensionMutation(prev, pagePreviewDimension));
        },
        [uiAtom]
    );

    const resizeObserver = useMemo(() => {
        return new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setPagePreviewDimension({ width, height });
            }
        });
    }, []);
    // Set resize observer
    useEffect(() => {
        if (pagePreviewRef.current) {
            // Add resize observer
            resizeObserver.observe(pagePreviewRef.current);
        }

        // Cleanup
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const { theme } = usePageBuilder();
    const pluginsByType = plugins.byType<PbEditorContentPlugin>("pb-editor-content");
    const layouts = React.useMemo(() => {
        const layoutPlugins = plugins.byType<PbPageLayoutPlugin>("pb-page-layout");
        return (layoutPlugins || []).map(pl => pl.layout);
    }, []);
    const themeLayout = layouts.find(l => l.name === layout);
    if (renderLayout && !themeLayout) {
        return <div>Layout &quot;{layout}&quot; was not found in your theme!</div>;
    }
    return (
        <Elevation className={contentContainerWrapper} z={0}>
            <ContentContainer
                theme={theme}
                className={`mdc-elevation--z1 webiny-pb-editor-device--${kebabCase(
                    displayMode
                )} webiny-pb-media-query--${kebabCase(displayMode)}`}
            >
                {pluginsByType.map(plugin =>
                    React.cloneElement(plugin.render(), { key: plugin.name })
                )}
                <BaseContainer ref={pagePreviewRef} className={"webiny-pb-editor-content-preview"}>
                    {renderContent(themeLayout, rootElement, renderLayout)}
                </BaseContainer>
            </ContentContainer>
        </Elevation>
    );
};

export default Content;
