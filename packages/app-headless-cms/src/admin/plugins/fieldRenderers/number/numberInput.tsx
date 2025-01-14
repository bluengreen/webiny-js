// TODO @ts-refactor figure out correct bind types and remove any
import React from "react";
import get from "lodash/get";
import { CmsEditorFieldRendererPlugin } from "~/types";
import { Input } from "@webiny/ui/Input";
import { i18n } from "@webiny/app/i18n";

const t = i18n.ns("app-headless-cms/admin/fields/number");

const plugin: CmsEditorFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-number",
    renderer: {
        rendererName: "number-input",
        name: t`Number Input`,
        description: t`Renders a simple input with its type set to "number".`,
        canUse({ field }) {
            return (
                field.type === "number" &&
                !field.multipleValues &&
                !get(field, "predefinedValues.enabled")
            );
        },
        render({ field, getBind }) {
            const Bind = getBind();

            return (
                <Bind>
                    {(bindProps: any) => {
                        return (
                            <Input
                                {...bindProps}
                                onChange={value => {
                                    return bindProps.onChange(value);
                                }}
                                label={field.label}
                                placeholder={field.placeholderText}
                                description={field.helpText}
                                type="number"
                            />
                        );
                    }}
                </Bind>
            );
        }
    }
};

export default plugin;
