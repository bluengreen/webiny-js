import { ContextPlugin } from "@webiny/handler";
import { PbContext } from "~/graphql/types";

export default () => {
    return new ContextPlugin<PbContext>(async context => {
        context.pageBuilder.onAfterPageUnpublish.subscribe(async ({ page }) => {
            const promises = [];
            promises.push(
                context.pageBuilder.prerendering.flush({
                    context,
                    paths: [{ path: page.path }]
                })
            );
            /**
             * Note: special pages (404 / home) cannot be unpublished, that's why
             * there is no special handling in regards to that here.
             */
            await Promise.all(promises);
        });
    });
};
