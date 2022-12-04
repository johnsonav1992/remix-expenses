import React from 'react'
import { Outlet } from '@remix-run/react'

import marketingStyles from '~/styles/marketing.css'

const MarketingLayout = () => {
    return (
        <Outlet />
    )
}

export function links() {
    return [{ rel: 'stylesheet', href: marketingStyles }]
}

export default MarketingLayout