import {useState, useCallback} from "react";
import {SketchPicker, SwatchesPicker} from 'react-color';
import {Toast} from "@shopify/app-bridge-react";
import {useAppQuery, useAuthenticatedFetch} from "../hooks";
import Sticky from 'react-stickynode';

import {
    Form,
    TextField,
    Button,
    Box,
    Text,
    FormLayout,
    Grid,
    Divider,
    HorizontalGrid,
    LegacyCard,
    RangeSlider,
    Select,
    Layout, buttonFrom, Checkbox,
} from "@shopify/polaris";

import {
    ContextualSaveBar,
    useAppBridge,
    useNavigate,
} from "@shopify/app-bridge-react";

/* Import custom hooks for forms */
import {useForm, useField, notEmptyString} from "@shopify/react-form";

export function NewBannerForm({Banner: InitialBanner}) {

    const navigate = useNavigate();
    const appBridge = useAppBridge();
    const fetch = useAuthenticatedFetch();
    const [isLoading, setIsLoading] = useState(false);
    const emptyToastProps = {content: null};
    const [toastProps, setToastProps] = useState(emptyToastProps);
    const [Banner, setBanner] = useState(InitialBanner);
    const [showResourcePicker, setShowResourcePicker] = useState(false);
    const [PTValue, setPTValue] = useState(20);
    const [ActionButton, setActionButtonValue] = useState('no');
    const [ActionButtonAl, setActionButtonAligment] = useState('right');
    const [setActionType] = useState('no');
    const [setBackgroundButton] = useState('transparent');
    const [PBValue, setPBValue] = useState(20);
    const [PLValue, setPLValue] = useState(20);
    const [ButtonSH, setButtonSpacingH] = useState(10);
    const [buttonSV, setButtonSpacingV] = useState(5);
    const [BRvalue, setBorderRadius] = useState(0);
    const [PRValue, setPRValue] = useState(20);
    const [textSizeValue, setTextSizeValue] = useState(16);
    const [buttonContentSizeValue, setButtonContentSize] = useState(20);
    const [isDeleting, setIsDeleting] = useState(false);


    const toastMarkup = toastProps.content && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)}/>
    );

    const [textColor, setTextColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });

    const [ButtonTextColor, setButtonTextColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });

    const [ButtonBackgroundColor, setButtonBackgroundColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });

    const [buttonBorderColorValue, setButtonBorderColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });

    const [bgColor, setBgcolor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });

    const onSubmit = useCallback(
        (body) => {
            (async () => {

                setIsLoading(true);
                const parsedBody = body;

                const BannerId = Banner?.id;
                const url = BannerId ? `/api/banners/${BannerId}` : "/api/banners";
                const method = BannerId ? "PATCH" : "POST";

                const response = await fetch(url, {
                    method,
                    body: JSON.stringify(parsedBody),
                    headers: {"Content-Type": "application/json"},
                });
                const message = await response.json();
                if (response.ok) {
                    setToastProps({content: message.message});
                    setIsLoading(false);
                }
            })();
            return {status: "success"};
        },
        [Banner]
    );

    const PreviewBanner = ({
                               content = 'Preview Banner',
                               // actionButton = 'no',
                               buttonContent = "Open",
                               buttonContentSize = '20px',
                               buttonContentColor = '#000',
                               buttonBackgroundColor = '#BF9B30',
                               buttonBorderColor = '#fff',
                               buttonBackground = 'solid',
                               buttonPosition = 'inherit',
                               buttonBorder = 'solid',
                               actionType = 'no',
                               actionUrl = 'https://',
                               actionSeparateTab = 'no',
                               height = 'auto',
                               width = 'auto',
                               backgroundColor = backgroundColor,
                               textColor = '#fff',
                               textPosition = 'left',
                               textSize = '16px',
                               paddingTop = '20px',
                               paddingBottom = '20px',
                               paddingLeft = '20px',
                               borderRadius = '0px',
                               paddingRight = '20px',
                               buttonSpacingV = '5px',
                               buttonSpacingH = '10px',

                           }) => {
        return (
            <>
                {actionType === 'whole' &&
                    <a href={actionUrl}>
                        <div
                            style={{
                                background: backgroundColor,
                                height: height,
                                width: '100%',
                                color: textColor,
                                paddingTop: paddingTop,
                                fontSize: textSize,
                                paddingBottom: paddingBottom,
                                paddingLeft: paddingLeft,
                                borderRadius: borderRadius,
                                paddingRight: paddingRight,
                                textAlign: textPosition,
                                display: "inline-block",
                            }}

                        >
                            {content}
                        </div>
                    </a>
                }
                {actionType === 'no' &&
                    <div
                        style={{
                            background: backgroundColor,
                            height: height,
                            width: '100%',
                            color: textColor,
                            paddingTop: paddingTop,
                            fontSize: textSize,
                            paddingBottom: paddingBottom,
                            paddingLeft: paddingLeft,
                            borderRadius: borderRadius,
                            paddingRight: paddingRight,
                            textAlign: textPosition,
                            display: "inline-block",
                        }}

                    >
                        {content}
                    </div>
                }
                {actionType === 'button' &&
                    <div
                        style={{
                            background: backgroundColor,
                            height: height,
                            width: '100%',
                            color: textColor,
                            paddingTop: paddingTop,
                            fontSize: textSize,
                            paddingBottom: paddingBottom,
                            paddingLeft: paddingLeft,
                            borderRadius: borderRadius,
                            paddingRight: paddingRight,
                            textAlign: textPosition,
                            display: "inline-block",
                        }}

                    >
                        {content}
                        <div style={{
                            float: buttonPosition,
                            display: buttonPosition === 'inherit' ? 'inline-block' : 'unset',
                            marginLeft: buttonPosition === 'inherit' ? '10px' : 'unset',
                        }}>
                            <a href={actionUrl} style={{
                                color: buttonContentColor,
                                textDecoration: "none",
                                borderStyle: buttonBorder,
                                borderColor: buttonBorderColor,
                                borderWidth: '1px',
                                display: buttonPosition === 'left' || buttonPosition === 'right' ? 'inline' : 'block',
                                fontSize: buttonContentSize,
                                backgroundColor: buttonBackground === 'solid' ? buttonBackgroundColor : 'transparent',
                                padding: buttonSpacingV + " " + buttonSpacingH
                            }}>{buttonContent}</a>
                        </div>
                    </div>
                }
            </>
        );
    };

    const {
        fields: {
            title,
            content,

            buttonContent,
            buttonContentSize,
            buttonContentColor,
            buttonBackgroundColor,
            buttonBorderColor,
            buttonBackground,
            buttonPosition,
            buttonBorder,
            position,
            status,
            page,
            actionButtonEnabled,
            actionButtonAligment,
            textAlign,
            backgroundColor,
            paddingTop,
            paddingBottom,
            paddingLeft,
            buttonSpacingV,
            buttonSpacingH,
            borderRadius,
            paddingRight,
            actionType,
            actionLink,
            actionSeparateTab,
            bannerTextColor,
            textSize,
        },
        dirty,
        reset,
        submitting,
        submit,
        makeClean,
    } = useForm({
        fields: {
            title: useField({
                value: Banner?.title || "",
                validates: [notEmptyString("Please name your Sticky Banner Campaign")],
            }),
            actionType: useField(Banner?.action_type || 'button'),
            actionSeparateTab: useField(Banner?.action_separate_tab || false),
            actionLink: useField(Banner?.action_link || 'https://'),
            content: useField({
                value: Banner?.text_content || "Limited time offer: Free shipping on all orders!",
                validates: [notEmptyString("Please add content on your banner")],
            }),
            buttonContent: useField({
                value: Banner?.button_content || "SHOP NOW",
                validates: [notEmptyString("You Can't Leave Button Text Blank")],
            }),
            buttonContentColor: useField(Banner?.button_content_color || '#fff'),
            buttonContentSize: useField(Banner?.button_content_size || '20'),
            buttonBackgroundColor: useField(Banner?.button_background_color || '#BF9B30'),
            buttonBorderColor: useField(Banner?.button_border_color || '#fff'),
            buttonBackground: useField(Banner?.button_background || 'solid'),
            buttonPosition: useField(Banner?.button_position || 'inherit'),
            buttonBorder: useField(Banner?.button_border || 'none'),
            status: useField(Banner?.status || 'active'),
            position: useField(Banner?.position || 'top'),
            textAlign: useField(Banner?.text_align || 'center'),
            backgroundColor: useField(Banner?.background_color || '#F7D1C7'),
            bannerTextColor: useField(Banner?.text_color || '#7B3F00'),
            paddingTop: useField(Banner?.padding_top || '20'),
            paddingBottom: useField(Banner?.padding_bottom || '20'),
            paddingLeft: useField(Banner?.padding_left || '20'),
            buttonSpacingV: useField(Banner?.button_spacing_v || '5'),
            buttonSpacingH: useField(Banner?.button_spacing_h || '10'),
            borderRadius: useField(Banner?.border_radius || '0'),
            paddingRight: useField(Banner?.padding_right || '20'),
            page: useField(Banner?.page || 'global'),
            textSize: useField(Banner?.text_size || '20'),
        },
        onSubmit,
    });

    /*
    This is a placeholder function that is triggered when the user hits the "Delete" button.

    It will be replaced by a different function when the frontend is connected to the backend.
    */

    const deleteBanner = useCallback(async () => {
        reset();
        setIsDeleting(true);
        const response = await fetch(`/api/banners/${Banner.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        if (response.ok) {
            navigate(`/`);
        }
    }, [Banner]);

    const BannerStatusOptions = [
        {label: 'Active', value: 'active'},
        {label: 'Inactive', value: 'inactive'}
    ];

    const BannerWhereOptions = [
        {label: 'Top', value: 'top'},
        {label: 'Bottom', value: 'bottom'}
    ];

    const ActionButtonStatuses = [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'}
    ];

    const BannerPositionStatus = [
        {label: 'Global', value: 'global'},
        {label: 'Homepage Page Only', value: 'homepage'},
        {label: 'Cart page Page Only', value: 'cart'},
    ];

    const ActionButtonAligments = [
        {label: 'left', value: 'left'},
        {label: 'Next To Text', value: 'inherit'},
        {label: 'Right', value: 'right'}
    ];

    const TextPositions = [
        {label: 'Left', value: 'left'},
        {label: 'Center', value: 'center'},
        {label: 'Right', value: 'right'}
    ];

    const handleBannerStatusChanges = useCallback((value) => {
        status.onChange(value);
    }, []);

    const handleBannerWhereChanges = useCallback((value) => {
        position.onChange(value);
    }, []);

    const handleBannerPositionChanges = useCallback((value) => {
        page.onChange(value);
    }, []);


    const handleButtonBackgroundChanges = useCallback((value) => {
        buttonBackground.onChange(value);
    }, []);

    const handleButtonPositionChanges = useCallback((value) => {
        buttonPosition.onChange(value);
    }, []);

    const handleButtonBorderChanges = useCallback((value) => {
        buttonBorder.onChange(value);
    }, []);

    const handleActionButtonStatus = useCallback((value) => {
        actionButtonEnabled.onChange(value);
        setActionButtonValue(value);
    }, []);

    const handleActionButtonAligment = useCallback((value) => {
        actionButtonAligment.onChange(value);
        setActionButtonAligment(value);
    }, []);

    const handleTextPositionsChanges = useCallback((value) => {
        textAlign.onChange(value);
    }, []);

    const handleBannerContentChanges = useCallback((value) => {
        content.onChange(value);
    }, []);

    const handleButtonContentChanges = useCallback((value) => {
        buttonContent.onChange(value);
    }, []);

    const handleButtonContentColorChanges = useCallback((value) => {
        buttonContentColor.onChange(value);
    }, []);

    const handleButtonBackgroundColorChanges = useCallback((value) => {
        buttonBackgroundColor.onChange(value);
    }, []);

    const handleButtonBorderColorChanges = useCallback((value) => {
        buttonBorderColor.onChange(value);
    }, []);

    const handlePTValue = useCallback(
        (value) => {
            paddingTop.onChange(value);
            setPTValue(value)
        }, []);

    const handlePBValue = useCallback(
        (value) => {
            paddingBottom.onChange(value);
            setPBValue(value)
        }, []);

    const handleTextSizeValue = useCallback(
        (value) => {
            textSize.onChange(value);
            setTextSizeValue(value)
        }, []);

    const handlePLValue = useCallback(
        (value) => {
            paddingLeft.onChange(value);
            setPLValue(value)
        }, []);

    const handleButtonSpacingH = useCallback(
        (value) => {
            buttonSpacingH.onChange(value);
            setButtonSpacingH(value)
        }, []);

    const handleButtonSpacingV = useCallback(
        (value) => {
            buttonSpacingV.onChange(value);
            setButtonSpacingV(value)
        }, []);

    const handleBorderRadiusValue = useCallback(
        (value) => {
            borderRadius.onChange(value);
            setBorderRadius(value)
        }, []);

    const handleButtonContentSizeChanges = useCallback(
        (value) => {
            buttonContentSize.onChange(value);
            setButtonContentSize(value)
        }, []);

    const handlePRValue = useCallback(
        (value) => {
            paddingRight.onChange(value);
            setPRValue(value)
        }, []);


    const changeBgColor = useCallback((value) => {
        backgroundColor.onChange(value.hex);
        setBgcolor(value);
    }, []);

    const changeBgTextColor = useCallback((value) => {
        bannerTextColor.onChange(value.hex);
        setTextColor(value);
    }, []);

    const changeButtonTextColor = useCallback((value) => {
        buttonContentColor.onChange(value.hex);
        setButtonTextColor(value);
    }, []);

    const changeButtonBackgroundColor = useCallback((value) => {
        buttonBackgroundColor.onChange(value.hex);
        setButtonBackgroundColor(value);
    }, []);

    const changeButtonBorderColor = useCallback((value) => {
        buttonBorderColor.onChange(value.hex);
        setButtonBorderColor(value);
    }, []);

    const ActionTypeSelection = [
        {label: 'No Action', value: 'no'},
        {label: 'Whole Banner Clickable', value: 'whole'},
        {label: 'Separate Action Button', value: 'button'}
    ];

    const buttonBackgroundSelection = [
        {label: 'Solid Color', value: 'solid'},
        {label: 'Transparent', value: 'transparent'}
    ];

    const buttonBorderSelection = [
        {label: 'None', value: 'none'},
        {label: 'Solid', value: 'solid'},
        {label: 'Dotted', value: 'dotted'},
        {label: 'Dashed', value: 'dashed'},
    ];


    /* The form layout, created using Polaris and App Bridge components. */
    const onActionTypeChange = (selected, id) => {
        actionType.onChange(selected);
        setActionType(selected);
    }

    const onButtonBackgroundChange = (selected, id) => {
        buttonBackground.onChange(selected);
        setBackgroundButton(selected);
    }

    const onActionSeparateTabChange = (selected) => {
        actionSeparateTab.onChange(selected);
    }

    return (
        <>
            {toastMarkup}
            <Layout>
                <Layout.Section>
                    <Form onSubmit={onSubmit}>
                        {Banner?.id && (
                            <Button
                                outline
                                destructive
                                onClick={deleteBanner}
                                loading={isDeleting}
                            >
                                Delete Sticky Banner
                            </Button>
                        )}
                        <ContextualSaveBar
                            saveAction={{
                                label: "Save",
                                onAction: submit,
                                loading: isLoading,
                                disabled: isLoading,
                            }}
                            leaveConfirmationDisable
                            discardAction={{
                                label: "Discard",
                                onAction: reset,
                                loading: isLoading,
                                disabled: isLoading,
                            }}
                            visible={dirty}
                            fullWidth
                        />
                        <FormLayout>
                            {/*Main settings title & status*/}
                            <Layout>
                                <Layout.Section>
                                    <LegacyCard title="Name Your Banner" sectioned>
                                        <TextField
                                            {...title}
                                            label="Title"
                                            labelHidden
                                            helpText="Name your sticky banner campaign(It's only visible for you)"
                                        />
                                    </LegacyCard>
                                </Layout.Section>
                                <Layout.Section secondary>
                                    <LegacyCard title="Banner Main Settings" sectioned>
                                        <Select
                                            {...status}
                                            label="Status"
                                            options={BannerStatusOptions}
                                            onChange={handleBannerStatusChanges}
                                            value={status.value}
                                            labelHidden
                                            helpText="You can disable or activate you'r banner "
                                        />
                                        <Select
                                            {...page}
                                            label="Position In Website"
                                            options={BannerPositionStatus}
                                            onChange={handleBannerPositionChanges}
                                            value={page.value}
                                            labelHidden
                                            helpText="Control Where You Will See You'r Banner"
                                        />
                                        <Select
                                            {...position}
                                            label="Banner Aligment"
                                            options={BannerWhereOptions}
                                            onChange={handleBannerWhereChanges}
                                            value={position.value}
                                            labelHidden
                                            helpText="You can choose to set banner TOP or BOTTOM"
                                        />
                                    </LegacyCard>
                                </Layout.Section>
                            </Layout>
                            {/*Banner preview*/}
                            <Text variant="headingLg" as="h4">
                                Banner PREVIEW
                            </Text>
                            <Sticky enabled={true} top={0} bottomBoundary={3000} innerZ={999999}>
                                <Layout>
                                    <Layout.Section>
                                        <LegacyCard>
                                            <PreviewBanner paddingTop={paddingTop.value + 'px'}
                                                           actionType={actionType.value}
                                                           actionUrl={actionLink.value}
                                                           paddingBottom={paddingBottom.value + 'px'}
                                                           paddingLeft={paddingLeft.value + 'px'}
                                                           buttonSpacingV={buttonSpacingV.value + 'px'}
                                                           buttonSpacingH={buttonSpacingH.value + 'px'}
                                                           paddingRight={paddingRight.value + 'px'}
                                                           textSize={textSize.value + 'px'}
                                                           content={content.value}
                                                           buttonContent={buttonContent.value}
                                                           buttonContentColor={buttonContentColor.value}
                                                           buttonContentSize={buttonContentSize.value + 'px'}
                                                           buttonBackground={buttonBackground.value}
                                                           buttonBackgroundColor={buttonBackgroundColor.value}
                                                           buttonPosition={buttonPosition.value}
                                                           buttonBorder={buttonBorder.value}
                                                           buttonBorderColor={buttonBorderColor.value}
                                                           borderRadius={borderRadius.value + 'px'}
                                                           textPosition={textAlign.value}
                                                           backgroundColor={backgroundColor.value}
                                                           textColor={bannerTextColor.value}/>
                                        </LegacyCard>
                                    </Layout.Section>
                                </Layout>
                            </Sticky>
                            {/*Content settings */}
                            <Layout>
                                <Layout.Section>
                                    <Divider borderColor="border-inverse"/>
                                    <br/>
                                    <Text variant="headingLg" as="h4">
                                        Content Settings
                                    </Text>
                                    <br/>
                                    <Grid>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <TextField
                                                    {...content}
                                                    label="Content"
                                                />
                                                <br/>
                                                <Select
                                                    {...textAlign}
                                                    label="Text Position"
                                                    options={TextPositions}
                                                    onChange={handleTextPositionsChanges}
                                                    value={textAlign.value}
                                                />
                                                <br/>
                                                <RangeSlider
                                                    {...textSize}
                                                    min={13}
                                                    max={50}
                                                    label="Font size"
                                                    value={textSize.value}
                                                    onChange={handleTextSizeValue}
                                                    output
                                                />
                                            </LegacyCard>
                                        </Grid.Cell>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <Text as="p" fontWeight="regular">
                                                    Font Color
                                                </Text>
                                                <SketchPicker
                                                    {...bannerTextColor}
                                                    color={bannerTextColor.value}
                                                    onChange={changeBgTextColor} disableAlpha={true}/>
                                            </LegacyCard>
                                        </Grid.Cell>
                                    </Grid>
                                    <br/>
                                    <Divider borderColor="border-inverse"/>
                                </Layout.Section>
                            </Layout>
                            {/*Background settings*/}
                            <Layout>
                                <Layout.Section>
                                    <Text variant="headingLg" as="h4">
                                        Background Settings
                                    </Text>
                                    <br/>
                                    <Grid>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <RangeSlider
                                                    {...paddingTop}
                                                    label="TOP Spacing"
                                                    value={paddingTop.value}
                                                    onChange={handlePTValue}
                                                    output
                                                />

                                                <RangeSlider
                                                    {...paddingBottom}
                                                    label="BOTTOM Spacing"
                                                    value={paddingBottom.value}
                                                    onChange={handlePBValue}
                                                    output
                                                />
                                                <RangeSlider
                                                    {...paddingLeft}
                                                    label="LEFT Spacing"
                                                    value={paddingLeft.value}
                                                    onChange={handlePLValue}
                                                    output
                                                />
                                                <RangeSlider
                                                    {...paddingRight}
                                                    label="RIGHT Spacing"
                                                    value={paddingRight.value}
                                                    onChange={handlePRValue}
                                                    output
                                                />
                                                <br/>
                                                <Text as="p" fontWeight={"medium"}>
                                                    Extra Stuff
                                                </Text><br/>
                                                <RangeSlider
                                                    {...borderRadius}
                                                    label="Round Your Corners"
                                                    value={borderRadius.value}
                                                    onChange={handleBorderRadiusValue}
                                                    output
                                                />
                                            </LegacyCard>
                                        </Grid.Cell>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <Text as="p" fontWeight="regular">
                                                    Background Color
                                                </Text>
                                                <SketchPicker
                                                    {...backgroundColor}
                                                    color={backgroundColor.value}
                                                    onChange={changeBgColor} disableAlpha={true}/>
                                            </LegacyCard>
                                        </Grid.Cell>
                                    </Grid>
                                </Layout.Section>
                            </Layout>
                            {/*Action settings*/}
                            <Layout>
                                <Layout.Section>
                                    <Divider borderColor="border-inverse"/>
                                    <br/>
                                    <Text variant="headingLg" as="h4">
                                        Action Settings
                                    </Text>
                                    <br/>
                                    <Grid>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <Checkbox
                                                    {...actionSeparateTab}
                                                    label="Check If Open In Separate Tab"
                                                    checked={actionSeparateTab.value}
                                                    onChange={onActionSeparateTabChange}
                                                />
                                                <br/>
                                                <br/>
                                                <TextField inputMode={"url"}
                                                           label={"URL address"} {...actionLink}/>
                                            </LegacyCard>
                                        </Grid.Cell>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <Select
                                                    {...actionType}
                                                    label="Action Type"
                                                    options={ActionTypeSelection}
                                                    value={actionType.value}
                                                    onChange={onActionTypeChange}/>
                                            </LegacyCard>
                                        </Grid.Cell>
                                    </Grid>
                                    <br/>
                                    <Text variant="headingLg" as="h4">
                                        Action Button Settings
                                    </Text>
                                    <br/>
                                    <Grid>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <TextField
                                                    {...buttonContent}
                                                    label="Action Button Text"
                                                />
                                                <br/>

                                                <RangeSlider
                                                    {...buttonContentSize}
                                                    min={13}
                                                    max={35}
                                                    label="Button Content Font Size"
                                                    value={buttonContentSize.value}
                                                    onChange={handleButtonContentSizeChanges}
                                                    output
                                                />
                                                <br/>
                                                <Text variant="bodyLg" as="p">
                                                    Action Button Background Type
                                                </Text>
                                                <Select
                                                    {...buttonBackground}
                                                    options={buttonBackgroundSelection}
                                                    onChange={handleButtonBackgroundChanges}
                                                    value={buttonBackground.value}
                                                    labelHidden
                                                    helpText="You can select Solid color OR transparent button background"
                                                />
                                                <br/>
                                                <Text variant="bodyLg" as="p">
                                                    Action Button Position
                                                </Text>
                                                <Select
                                                    {...buttonPosition}
                                                    options={ActionButtonAligments}
                                                    onChange={handleButtonPositionChanges}
                                                    value={buttonPosition.value}
                                                    labelHidden
                                                    helpText="You can select where to show action button"
                                                />
                                                <br/>
                                                <Text variant="bodyLg" as="p">
                                                    Action Button Border Type
                                                </Text>
                                                <Select
                                                    {...buttonBorder}
                                                    options={buttonBorderSelection}
                                                    onChange={handleButtonBorderChanges}
                                                    value={buttonBorder.value}
                                                    labelHidden
                                                    helpText=""
                                                />
                                                <br/>
                                                <Text as="p" variant="bodyLg">
                                                    Button Spacing
                                                </Text>
                                                <br/>
                                                <RangeSlider
                                                    {...buttonSpacingH}
                                                    label="Horizontal Spacing"
                                                    value={buttonSpacingH.value}
                                                    onChange={handleButtonSpacingH}
                                                    output
                                                />
                                                <RangeSlider
                                                    {...buttonSpacingV}
                                                    label="Vertical Spacing"
                                                    value={buttonSpacingV.value}
                                                    onChange={handleButtonSpacingV}
                                                    output
                                                />
                                            </LegacyCard>
                                        </Grid.Cell>
                                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                                            <LegacyCard sectioned>
                                                <Text as="p" fontWeight="regular">
                                                    Action Button Text Color
                                                </Text>
                                                <SketchPicker
                                                    {...buttonContentColor}
                                                    color={buttonContentColor.value}
                                                    onChange={changeButtonTextColor}
                                                    disableAlpha={true}/>
                                                <br/>
                                                <Text as="p" fontWeight="regular">
                                                    Action Button Background Color
                                                </Text>
                                                <SketchPicker
                                                    {...buttonBackgroundColor}
                                                    color={buttonBackgroundColor.value}
                                                    onChange={changeButtonBackgroundColor}
                                                    disableAlpha={true}/>
                                                <br/>
                                                <Text as="p" fontWeight="regular">
                                                    Action Button Border Color
                                                </Text>
                                                <SketchPicker
                                                    {...buttonBorderColor}
                                                    color={buttonBorderColor.value}
                                                    onChange={changeButtonBorderColor}
                                                    disableAlpha={true}/>
                                            </LegacyCard>
                                        </Grid.Cell>
                                    </Grid>

                                </Layout.Section>
                            </Layout>
                        </FormLayout>
                    </Form>
                </Layout.Section>
            </Layout>
        </>

    )
        ;
}
