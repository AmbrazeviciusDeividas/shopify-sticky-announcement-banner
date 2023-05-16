import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { NewBannerForm } from "../../components";

export default function ManageCode() {
    const breadcrumbs = [{ content: "Sticky Banner", url: "/" }];

    return (
        <Page>
            <TitleBar
                title="Create new Sticky Banner"
                breadcrumbs={breadcrumbs}
                primaryAction={null}
            />
            <NewBannerForm />
        </Page>
    );
}
