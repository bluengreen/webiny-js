import React from "react";
import {
    FormFieldElement,
    FormFieldElementConfig,
    FormFieldElementRenderProps
} from "~/ui/elements/form/FormFieldElement";

export class HiddenElement extends FormFieldElement {
    constructor(id: string, config: FormFieldElementConfig) {
        super(id, config);

        this.applyPlugins(HiddenElement);
    }

    public render(props: FormFieldElementRenderProps): React.ReactNode {
        if (!props.formProps) {
            throw Error(`HiddenElement must be placed inside of a FormElement.`);
        }

        const { Bind } = props.formProps;

        return (
            <Bind
                name={this.getName()}
                validators={this.getValidators(props)}
                defaultValue={this.getDefaultValue(props)}
                beforeChange={(value: string, cb) => this.onBeforeChange(value, cb)}
                afterChange={(value: string, form) => this.onAfterChange(value, form)}
            />
        );
    }
}
