import { BackendContext, StoreContext } from '../Contexts'
import React, { useContext, useEffect, useState } from 'react'
import { Text, Title } from '@mantine/core'

import { PageItemContainer } from '../PageItemContainer'

export const UserProfile = () => {

    const store = useContext(StoreContext)
    const [profileData, setProfileData] = useState(undefined)
    const backend = useContext(BackendContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getProfile = async () => {

            const data = await (await fetch(backend + `/fnGetStoreProfile?store=${store}`)).json()
            setProfileData(data)
            setLoading(false)
        }
        getProfile()

    }, [])

    return (
        <>
            <PageItemContainer>
                <Title>StoreId: {store}</Title>
                <Title order={3}>address:</Title>
                <Text>{`${profileData?.address?.street1} ${profileData?.address?.street2} `}</Text>
            </PageItemContainer>
            <PageItemContainer>
            </PageItemContainer>
        </>
    )
}
