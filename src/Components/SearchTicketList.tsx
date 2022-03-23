import { Button, Center, Container, Loader, Pagination, Space, Table, Text, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react'

import { PageItemContainer } from './PageItemContainer';
import { RepairTicket } from './types';
import { RepairTicketPanel } from './RepairTicketPanel';
import { StatusTags } from './StatusTags';
import useFetch from 'react-fetch-hook';

export const SearchTicketList = () => {
    const PAGESIZE = 10


    const { isLoading, data, error } = useFetch<RepairTicket[]>("https://lurepair-fn.azurewebsites.net/api/getItems");
    // const { isLoading, data, error } = useFetch<RepairTicket[]>(" http://localhost:7071/api/getItems");

    const [activeTicket, setActiveTicket] = useState<RepairTicket | undefined>(undefined);
    const [search, setSearch] = useState("")
    const [filteredItems, setFilteredItems] = useState(data)
    const [activePage, setPage] = useState(1);

    useEffect(() => {
        if (search) {
            setFilteredItems(data?.filter(item => item.ticketId.toLowerCase().includes(search.toLowerCase())))
        } else {
            setFilteredItems(data)
        }
    }, [search, isLoading])


    const ths = (
        <tr>
            <th>Ticket ID</th>
            <th>Tags</th>
        </tr>
    );

    const rows: JSX.Element[] = []
    const indexStart = (activePage - 1) * PAGESIZE;
    for (let index = indexStart; index < indexStart + PAGESIZE; index++) {
        const element = filteredItems?.[index];
        rows.push((
            <tr key={element?.ticketId}>
                <td>
                    <Text weight={500} onClick={() => {
                        setActiveTicket(element as RepairTicket)
                    }}>{element?.ticketId}</Text></td>
                <td> <StatusTags tags={element?.tags ?? []} /></td>
            </tr>
        ))
    }


    if (error) {
        return <div>
            <p>Code: ${error.status}</p>
            <p>Message: ${error.statusText}</p>
        </div>
    }

    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    return (
        <PageItemContainer
        >


            <TextInput
                placeholder="Search"
                onChange={(event) => setSearch(event.currentTarget.value)}
                mb={10}
            />
            <Table highlightOnHover captionSide="bottom" style={{ margin: 5 }}>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
            </Table>
            <Pagination withControls={false} page={activePage} onChange={setPage} total={(filteredItems?.length ?? 0) / PAGESIZE} />

            <RepairTicketPanel
                closePanel={() => {
                    setActiveTicket(undefined)
                }}
                ticket={activeTicket}
            />
        </PageItemContainer>
    )
}
