import React, { useContext } from "react";
import {
    BrowserRouter as RBrowserRouter,
    BrowserRouterProps,
    RouteChildrenProps,
    StaticRouter as RStaticRouter
} from "react-router-dom";
import { __RouterContext, StaticRouterProps } from "react-router";
import { RouterContext, ReactRouterContextValue } from "./context/RouterContext";

export * from "react-router-dom";

export { Link } from "./Link";

export type UseRouter = RouteChildrenProps & ReactRouterContextValue;

export function useRouter(): UseRouter {
    return {
        ...useContext(RouterContext),
        ...useContext(__RouterContext)
    };
}

import enhancer from "./routerEnhancer";
export const BrowserRouter: React.FC<BrowserRouterProps> = enhancer(RBrowserRouter);
export const StaticRouter: React.FC<StaticRouterProps> = enhancer(RStaticRouter);
