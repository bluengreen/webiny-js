import * as React from "react";
import { Plugin } from "@webiny/plugins";

interface Permission {
    name: string;
    [key: string]: any;
}

interface RenderParams {
    value: Permission[];
    onChange: (value: Permission[]) => void;
}

interface Config {
    render(props: RenderParams): React.ReactElement;
    system?: boolean;
}

export class PermissionRendererPlugin extends Plugin {
    public static readonly type = "admin-app-permissions-renderer";
    private _config: Partial<Config>;

    public constructor(config?: Config) {
        super();
        this._config = config || {};
    }

    get system(): boolean {
        return Boolean(this._config.system);
    }

    public render(props: RenderParams): React.ReactElement {
        return this._config.render(props);
    }
}
