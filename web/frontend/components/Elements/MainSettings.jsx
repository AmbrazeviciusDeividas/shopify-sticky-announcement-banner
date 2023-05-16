import {Box, Columns, LegacyCard, Select, Text, TextField} from "@shopify/polaris";
import {useState, useCallback} from "react";

export function MainSettings({title, status}) {

    const BannerStatusOptions = [
        {label: 'Active', value: 'active'},
        {label: 'Inactive', value: 'inactive'}
    ];

    const handleBannerStatusChanges = useCallback((value) => {
        status.onChange(value);
    }, []);

    return <LegacyCard title="Main Settings" sectioned>

        <Columns columns={['twoThirds', 'oneThird']} gap="4">
            <Box>
                <Text as="p" fontWeight="bold">
                    Content For Banner
                </Text>
                <TextField
                    {...title}
                    label="Title"
                    labelHidden
                    helpText="Name your sticky banner campaign(It's only visible for you)"
                />
            </Box>
            <Box>
                <Text as="p" fontWeight="bold">
                    Status
                </Text>
                <Select
                    {...status}
                    label="Status"
                    options={BannerStatusOptions}
                    onChange={handleBannerStatusChanges}
                    value={status.value}
                    labelHidden
                    helpText="You can disable or activate your banner "
                />
            </Box>
        </Columns>

    </LegacyCard>;
}
