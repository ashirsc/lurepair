import * as utils from './utils';

import { BackendContext, StoreContext } from './Contexts';
import { Button, Center, Container, Grid, Group, Loader, Pagination, Skeleton, Space, Table, Text, TextInput } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react'
import { useDebouncedValue, usePagination } from '@mantine/hooks';

import { PageItemContainer } from './PageItemContainer';
import { RepairTicket } from './types';
import { RepairTicketPanel } from './RepairTicketPanel';
import { Search } from 'tabler-icons-react';
import { StatusTags } from './StatusTags';
import useFetch from 'react-fetch-hook';

export const SearchTicketList = () => {
    const PAGESIZE = 10
    const store = useContext(StoreContext)
    const backend = useContext(BackendContext)


    const [loading, setLoading] = useState(false)
    const [activeTicket, setActiveTicket] = useState<RepairTicket | undefined>(undefined);
    const [searchText, setSearch] = useState("")
    const [debouncedSearch] = useDebouncedValue(searchText, 200);

    // const { isLoading, data, error } = useFetch<RepairTicket[]>(LIST_URL + `?store=${store}`, { depends: [], }, {});
    const [data, setData] = useState<RepairTicket[]>([])
    // const [filteredItems, setFilteredItems] = useState(data)
    // const [activePage, setPage] = useState(1);
    // const pagination = usePagination({ total: 10, initialPage: 1 });


    useEffect(() => {
        const getData = async () => {

            let fetch_url = backend + "/fnGetItems" + `?store=${store}` + (searchText ? `&search=${searchText}` : "")
            setLoading(true)
            utils.sleep(500)
            const res = await fetch(fetch_url)
            const data = await res.json()
            setData(data)
            setLoading(false)
        }

        // if (searchText) {
        //     setFilteredItems(data?.filter(item => item.ticketId.toLowerCase().includes(searchText.toLowerCase())))
        // } else {
        //     setFilteredItems(data)
        // }

        getData()
    }, [debouncedSearch, JSON.stringify(activeTicket)])


    const ths = (
        <tr>
            <th>Ticket ID</th>
            <th>Status</th>
        </tr>
    );

    const rows: JSX.Element[] = []
    // const indexStart = (activePage - 1) * PAGESIZE;
    // for (let index = indexStart; index < indexStart + PAGESIZE; index++) {
    const indexStart = 0;
    for (let index = indexStart; index < (loading ? 5 : (data?.length ?? 0)); index++) {
        const element = data?.[index];
        if (loading) {

            rows.push(
                <tr key={index} >
                    <td
                        colSpan={2}>
                        <Skeleton height={16} my={10} radius="xl" />
                    </td>
                </tr>
            )
        }
        else {

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
    }


    // if (error) {
    //     return <div>
    //         <p>Code: ${error.status}</p>
    //         <p>Message: ${error.statusText}</p>
    //     </div>
    // }

    // if (isLoading) {
    //     return <Center>
    //         <Loader />
    //     </Center>
    // }
    return (
        <PageItemContainer
        >

            <Grid columns={3} pr={10}>
                <Grid.Col span={2}>
                    <TextInput
                        placeholder="Search"
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        mb={10}
                    />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button leftIcon={<Search size={14} />} loading={false}>
                        Search
                    </Button>
                </Grid.Col>
            </Grid>

            <Table highlightOnHover captionSide="bottom" style={{ margin: 5 }}>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
            </Table>
            {/* <Pagination withControls={false} page={activePage} onChange={setPage} total={(filteredItems?.length ?? 0) / PAGESIZE} /> */}
            {data?.length == 0 && !loading && <Text py={20} px={5}>We didn't find any results. Try clearing your search.</Text>}
            <RepairTicketPanel
                closePanel={() => {
                    setActiveTicket(undefined)
                }}
                ticket={activeTicket}
            />
        </PageItemContainer>
    )
}
