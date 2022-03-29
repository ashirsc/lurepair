import { Affix, Box, Button, Checkbox, Col, Divider, Drawer, Input, Space, Text, Title } from "@mantine/core";
import { BackendContext, StoreContext } from "./Contexts";
import React, { useContext, useState } from 'react'

import { RepairTicket } from "./types";
import { StatusTags } from "./StatusTags";
import { useNotifications } from "@mantine/notifications";

interface DesItemProps {
    title?: string;
    content?: string | JSX.Element;
}
const DescriptionItem = ({ title, content }: DesItemProps) => (
    <>
        <Box
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
        // sx={(theme) => ({
        //     // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        //     // textAlign: 'center',
        //     padding: theme.spacing.md,

        //     // borderRadius: theme.radius.md,
        //     // cursor: 'pointer',

        //     // '&:hover': {
        //     //     backgroundColor:
        //     //         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        //     // },
        // })}
        >
            {/* <Title order={5}   >{title ?? ""}</Title> */}
            <Text weight={500} >{title ?? ""}</Text>

            <Text>{content ?? ""}</Text>
        </Box>
    </>
);

interface Props {
    ticket: RepairTicket | undefined;
    closePanel: () => void;

}

export const RepairTicketPanel: React.FC<Props> = ({ ticket, closePanel }) => {
    const [loading, setLoading] = useState(false);
    const notifications = useNotifications();
    const backend = useContext(BackendContext)
    const store = useContext(StoreContext)




    return (
        <Drawer
            title={ticket ? "Ticket: " + ticket.ticketId : "No ticket selected"}
            position="right"
            onClose={closePanel}
            padding='md'
            opened={!!ticket}
        >




            <Title mb={5} order={3} >Status</Title>
            <Divider />

            <StatusTags tags={ticket?.tags ?? []} />

            <DescriptionItem title="Created" content={new Date(Date.parse(ticket?.createdAt ?? "")).toLocaleDateString()} />
            {/* <DescriptionItem title="Estimated completion date" content={new Date(Date.parse(ticket?.estimatedFinishDate ?? "")).toLocaleDateString()} /> */}
            {ticket?.finishedAt && <DescriptionItem title="Finished date" content={new Date(Date.parse(ticket?.finishedAt ?? "")).toLocaleDateString()} />}

            <Space h={'md'} />
            <Title mb={5} order={3} >Contact</Title>
            <Divider />
            <DescriptionItem title="Name" content={(ticket?.firstName ?? "") + " " + (ticket?.lastName ?? "")} />
            <DescriptionItem title="Email" content={ticket?.email} />
            <DescriptionItem title="Phone" content={ticket?.phone} />

            <Affix position={{ bottom: 20, right: 20 }}>


                <Button loading={loading} variant="light"
                    onClick={async () => {
                        setLoading(true);
                        await fetch(backend + "/fnCompleteItem", {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            }),
                            body: JSON.stringify({ ticket, store }),
                        })
                        setLoading(false);

                        notifications.showNotification({
                            title: `Ticket ${ticket?.ticketId} completed`,
                            message: `Notifying ${ticket?.firstName}`,
                        })
                        closePanel()
                    }}
                >
                    Complete
                </Button>
            </Affix>







        </Drawer>
    )
}
