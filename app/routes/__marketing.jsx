import React from 'react'
import { Outlet } from '@remix-run/react'

import MainHeader from "~/components/navigation/MainHeader";

import marketingStyles from '~/styles/marketing.css'

const MarketingLayout = () => {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )
}

export function links() {
    return [{ rel: 'stylesheet', href: marketingStyles }]
}

export default MarketingLayout