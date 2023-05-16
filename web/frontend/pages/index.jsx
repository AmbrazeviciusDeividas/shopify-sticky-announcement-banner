import {useNavigate, TitleBar, Loading} from "@shopify/app-bridge-react";
import {
    AlphaCard,
    EmptyState,
    Layout,
    LegacyCard,
    Text,
    Page,
    SkeletonBodyText,
    CalloutCard
} from "@shopify/polaris";
import {useState, useCallback} from "react";
import {BannerIndex} from "../components";
import {useAppQuery} from "../hooks/index.js";
export default function HomePage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const isRefetching = false;

    const {
        data: Banners,
        isLoading: isLoadingCount,
        isRefetching: isRefetchingCount,
    } = useAppQuery({
        url: "/api/banners",
        reactQueryOptions: {
            onSuccess: () => {
                setIsLoading(false);
            },
        },
    });

    const loadingMarkup = isLoading ? (
        <AlphaCard sectioned>
            <Loading/>
            <SkeletonBodyText/>
        </AlphaCard>
    ) : null;

    const BannerMarkup = Banners?.length ? (
        <>
            <Text variant="headingLg" as="h4">
                Sticky Announcement Banners(SAB) Dashboard
            </Text>
            <br/>
            <AlphaCard>
                <Text as="h2" variant="bodyMd">
                    <strong>What possibilities you have with this APP:</strong>
                    <ul>
                        <li><b>3 active banners</b> at the same time! (Homepage, Cart, Global)</li>
                        <li>Set your banner to show TOP or BOTTOM places.</li>
                        <li>Make <b>text position and change font size</b> as you wish.</li>
                        <li>Change <b>background spacing</b> (top, left, right, bottom)</li>
                        <li>Make your banner with <b>rounded corners</b></li>
                        <li>Make <b>WHOLE banner clickable</b> or separate <b>action button clickable</b></li>
                        <li>Multiple <b>action button changes</b> (background, font, position, border type, distance, color, ...)</li>
                    </ul>
                </Text>
            </AlphaCard>
            <br/>
            <BannerIndex Banners={Banners} loading={isRefetching}/>
        </>
    ) : null;

    const emptyStateMarkup =
        !isLoading && !Banners?.length ? (
            <AlphaCard sectioned>
                <EmptyState
                    heading="Create Sticky Announcement Banners for your website"
                    action={{
                        content: "Create Sticky Banner",
                        onAction: () => navigate("/banners/new"),
                    }}
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                    <p>
                        Create sticky announcement banners for your website and increase your Conversion Rate.
                    </p>
                </EmptyState>
            </AlphaCard>
        ) : null;

    /*
      Use Polaris Page and TitleBar components to create the page layout,
      and include the empty state contents set above.
    */
    return (
        <>
            <Page>
                <TitleBar
                    title="Sticky Announcement Banners"
                    primaryAction={{
                        content: "Create Sticky Banner",
                        onAction: () => navigate("/banners/new"),
                    }}
                />
                <Layout>
                    <Layout.Section>
                        {loadingMarkup}
                        {BannerMarkup}
                    </Layout.Section>
                </Layout>
                <br/>
                <CalloutCard
                    title="Benefits Of Using Sticky Announcement Banner"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                    primaryAction={{
                        content: 'Create New Sticky Banner',
                        onAction: () => navigate("/banners/new"),
                    }}
                >
                    <ul>
                        <li style={{paddingBottom: "10px"}}><strong>Increased engagement:</strong> By displaying crucial
                            information, such as a special offer or an
                            important announcement, in a prominent position, you can encourage users to engage with your
                            website or e-commerce store.
                        </li>
                        <li style={{paddingBottom: "10px"}}><strong>Improved conversion rates:</strong> Top sticky
                            banners can help drive sales and conversions by promoting
                            limited-time offers, discounts, or new products, prompting users to take action before they
                            navigate
                            away from the page.
                        </li>
                        <li style={{paddingBottom: "10px"}}><strong>Enhanced user experience:</strong> By providing easy
                            access to essential navigation elements or links, a top
                            sticky banner can help improve the overall user experience and satisfaction.
                        </li>
                        <li style={{paddingBottom: "10px"}}><strong>A/B testing:</strong> You can easily test different
                            banner designs, messages, or offers to determine which
                            resonate best with your audience, helping you optimize your site for better results.
                        </li>
                        <li><strong>Time-sensitive information:</strong> A top sticky banner can be an excellent way to
                            share urgent or
                            time-sensitive information, such as upcoming events, flash sales, or shipping deadlines.
                        </li>
                    </ul>
                </CalloutCard>
            </Page>
        </>
    );
}
