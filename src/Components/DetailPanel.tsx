import React, { ReactNode } from 'react'

import { Drawer, } from "@mantine/core";

interface Props {
    closePanel: () => void;
    isOpen: boolean;
    title?: ReactNode

    body: ReactNode
}


export const DetailPanel = ({ closePanel, isOpen, title, body }: Props) => {





    return (
        <>

            <Drawer
                title={title}
                position="right"
                onClose={closePanel}
                padding='md'
                opened={!!isOpen}
            >
                {body}


            </Drawer>
        </>

    )
}
