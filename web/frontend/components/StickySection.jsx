import React from 'react';
import {
    Layout,
    Sticky
} from '@shopify/polaris'

export default ({children}) => (
    <Layout.Section secondary>
        <Sticky offset>{children}</Sticky>
    </Layout.Section>
);