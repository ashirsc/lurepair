import React, { FC } from 'react'

import { Container } from '@mantine/core'

export const PageItemContainer: FC = (props) => {
    return (
        <Container mb={10} mt={10} size={400} key="create-new-item"
            style={{ paddingBottom: 20, paddingTop: 20 }}

            sx={(theme) => ({
                borderRadius: 5,
                backgroundColor: theme.colors.dark[6],

            })}
        >
            {props.children}
        </Container>
    )
}
