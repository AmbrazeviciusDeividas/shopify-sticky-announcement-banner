import {Card, Page, Layout, SkeletonBodyText, Banner, SkeletonPage} from "@shopify/polaris";
import {Loading, TitleBar} from "@shopify/app-bridge-react";
import {NewBannerForm} from "../../components";
import {useParams} from "react-router-dom";
import {useAppQuery} from "../../hooks";

export default function QRCodeEdit() {
    const breadcrumbs = [{content: "Sticky Banners", url: "/"}];

    const {id} = useParams();
    // const [isLoading, setIsLoading] = useState(true);

    const {
        data: Banner,
        isLoading: isLoading,
        isRefetching: isRefetching,
    } = useAppQuery({
        url: `/api/banners/${id}`,
        reactQueryOptions: {
            refetchOnReconnect: false,
            onSuccess: () => {
                // setIsLoading(false);
            },
        },
    });


    /* Loading action and markup that uses App Bridge and Polaris components */
    if (isLoading || isRefetching) {
        return (
            <Page>
                <TitleBar
                    title="Edit Sticky Banner"
                    breadcrumbs={breadcrumbs}
                    primaryAction={null}
                />
                <Loading/>
                <Layout>
                    <Layout.Section>
                        <SkeletonPage/>
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }

    return (
        <Page>
            <TitleBar
                title="Edit Sticky Banner"
                breadcrumbs={breadcrumbs}
                primaryAction={null}
            />
            <NewBannerForm Banner={Banner}/>
        </Page>
    );
}
