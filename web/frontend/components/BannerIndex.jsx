// import {useState} from "react";
import {Toast, useNavigate} from "@shopify/app-bridge-react";
import {
    Badge,
    Link,
    Button,
    IndexTable,
    Icon,
    LegacyCard,
} from "@shopify/polaris";
import {useMedia} from "@shopify/react-hooks";
import dayjs from "dayjs";

function SmallScreenCard({
                             id,
                             title,
                             createdAt,
                             status,
                             navigate,
                         }) {
    return (
        <Link onClick={() => navigate(`/banners/${id}`)}>
            <div
                style={{padding: "0.75rem 1rem", borderBottom: "1px solid #E1E3E5"}}
            >
                <p>
                    {truncate(title, 35)}
                </p>
                <p>{dayjs(createdAt).format("MMMM D, YYYY")}</p>
            </div>
        </Link>
    );
}


export function BannerIndex({Banners, loading}) {
    const navigate = useNavigate();

    /* Check if screen is small */
    const isSmallScreen = useMedia("(max-width: 640px)");

    /* Map over QRCodes for small screen */
    const smallScreenMarkup = Banners.map((Banner) => (
        <SmallScreenCard key={Banner.id} navigate={navigate} {...Banner} />
    ));

    const resourceName = {
        singular: "Sticky Banner",
        plural: "Sticky Banners",
    };

    const rowMarkup = Banners.map(
        ({id, title, createdAt, status, position, page}, index) => {
            return (
                <>
                    <IndexTable.Row id={id} key={'listing-' + id} position={index}>
                        <IndexTable.Cell>
                            {truncate(id, 25)}
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            {truncate(title, 25)}
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            {status === 'active' ?
                                <Badge
                                    progress="complete"
                                    statusAndProgressLabelOverride="Status: Active. Visible in your store"
                                    status="success">Active</Badge>
                                :
                                <Badge status="critical">Inactive</Badge>
                            }
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                        <span style={{
                            textTransform: 'uppercase'
                        }}>{truncate(position, 25)}</span>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                        <span style={{
                            textTransform: 'capitalize'
                        }}>
                            {truncate(page, 25)}</span>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            {dayjs(createdAt).format("MMMM D, YYYY")}
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <Button primary id="edit-banner" onClick={() => navigate(`/banners/${id}`)}
                                    size="slim">Edit</Button>&nbsp;
                        </IndexTable.Cell>
                    </IndexTable.Row>
                </>
            );
        }
    );

    /* A layout for small screens, built using Polaris components */
    return (
        <LegacyCard>
            <IndexTable
                resourceName={resourceName}
                itemCount={Banners.length}
                headings={[
                    {title: 'ID'},
                    {title: 'Title'},
                    {title: 'Status'},
                    {title: 'Position'},
                    {title: 'Page'},
                    {title: 'Created At'},
                    {title: 'Actions'},
                ]}
                selectable={false}
            >
                {rowMarkup}
                {/*{toastMarkup}*/}
            </IndexTable>
        </LegacyCard>
    );
}

/* A function to truncate long strings */
function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "…" : str;
}
