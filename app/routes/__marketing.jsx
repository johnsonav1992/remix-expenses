import React from 'react'
import { Outlet } from '@remix-run/react'

import MainHeader from "~/components/navigation/MainHeader";

import marketingStyles from '~/styles/marketing.css'
import { getUserFromSession } from '~/data/auth.server';

const MarketingLayout = () => {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )
}

export const loader = async ({ request }) => {
    return await getUserFromSession(request)
}

export function links() {
    return [{ rel: 'stylesheet', href: marketingStyles }]
}

export default MarketingLayout