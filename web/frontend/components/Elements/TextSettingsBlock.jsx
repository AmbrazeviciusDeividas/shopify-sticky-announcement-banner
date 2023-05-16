import {
    Box,
    ColorPicker,
    Columns,
    Divider,
    LegacyCard,
    LegacyStack,
    RangeSlider,
    Select,
    Text,
    TextField
} from "@shopify/polaris";
import {useCallback} from "@types/react";

export function TextSettingsBlock({content, textAlign, textSize, textSizeValue }) {


    const TextPositions = [
        {label: 'Left', value: 'left'},
        {label: 'Center', value: 'center'},
        {label: 'Right', value: 'right'}
    ];

    const handleTextPositionsChanges = useCallback((value) => {
        textAlign.onChange(value);
    }, []);


    return <LegacyCard title="Content Settings" sectioned>
        <Columns columns={['twoThirds', 'oneThird']} gap="5">

            <Box>
                <Text as="p" fontWeight="bold">
                    Content For Banner
                </Text>
                <LegacyStack distribution="fill">
                    <TextField
                        {...content}
                        label="Content"
                        labelHidden
                        helpText="Content for your banner"
                    />
                </LegacyStack>
                <br/>
                <Text as="p" fontWeight="bold">
                    Text Position
                </Text>
                <Select
                    {...textAlign}
                    label="Text Position"
                    options={TextPositions}
                    onChange={handleTextPositionsChanges}
                    value={textAlign.value}
                    labelHidden
                />
                <br/>
                <Text as="p" fontWeight="bold">
                    Font Size
                </Text>
                <RangeSlider
                    {...textSize}
                    min={13}
                    max={50}
                    labelHidden
                    value={textSizeValue}
                    onChange={handleTextSizeValue}
                    output
                />
            </Box>
            <Box>
                <Text as="p" fontWeight="bold">
                    Text Color
                </Text>
                <ColorPicker {...bannerTextColor}
                             onChange={changeBgTextColor}
                             color={textColor}/>
            </Box>
        </Columns>
        <br/>
        <Box>
            <Divider borderStyle="base"/>
            <br/>
            <Text as="p" fontWeight="bold">
                Action Button
            </Text>
            <br/>
            <Columns columns={['twoThirds', 'oneThird']} gap="5">
                <Box>

                </Box>
                <Box>
                    <Text as="p" fontWeight="bold">
                        Activate Action Button
                    </Text>
                    <Select
                        {...actionButtonEnabled}
                        label="Action Button Enabled"
                        options={ActionButtonStatuses}
                        onChange={handleActionButtonStatus}
                        value={ActionButton}
                        labelHidden
                        helpText="Enable or disable your action button on banner"
                    />
                </Box>
            </Columns>
        </Box>

    </LegacyCard>
}
