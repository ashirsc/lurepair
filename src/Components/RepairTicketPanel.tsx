import { Box, Button, Checkbox, Col, Divider, Drawer, Input, Space, Text, Title } from "@mantine/core";

import React from 'react'
import { RepairTicket } from "./types";
import { StatusTags } from "./StatusTags";

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
    return (
        <Drawer
            title={ticket ? "Ticket: " + ticket.ticketId : "No ticket selected"}
            position="right"
            onClose={closePanel}
            padding='md'
            opened={!!ticket}
        >




            <Title order={4} >Status</Title>

            <StatusTags tags={ticket?.tags ?? []} />

            <DescriptionItem title="Started" content={new Date(Date.parse(ticket?.createdAt ?? "")).toLocaleDateString()} />
            <DescriptionItem title="Estimated completion date" content={new Date(Date.parse(ticket?.estimatedFinishDate ?? "")).toLocaleDateString()} />

            {ticket?.finishedAt && <DescriptionItem title="Finished date" content={new Date(Date.parse(ticket?.finishedAt ?? "")).toLocaleDateString()} />}


            <Divider />
            <Title order={4} >Contact</Title>
            <DescriptionItem title="Name" content={ticket?.firstName ?? "" + ticket?.lastName ?? ""} />
            <DescriptionItem title="Email" content={ticket?.email} />
            <DescriptionItem title="Phone" content={ticket?.phone} />










        </Drawer>
    )
}
