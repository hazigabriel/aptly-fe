import type { ThemeConfig } from 'antd';

import { purpleBase, purpleLight, purpleSoft } from '@/assets/styles/colors';

const theme: ThemeConfig = {
    token: {
        // Seed Token
        // colorPrimary: '#00b96b',
        // borderRadius: 2,
        // // Alias Token
        // colorBgContainer: '#f6ffed',
    },
    components: {
        Form: {
            labelRequiredMarkColor: purpleBase,
        },
        Input: {
            activeBorderColor: purpleBase,
        },
        Button: {
            defaultHoverBg: purpleLight,
            defaultHoverColor: 'white',
        },
        Typography: {
            colorLink: purpleBase,
            colorLinkHover: purpleSoft,
        },
    },
};

export default theme;
