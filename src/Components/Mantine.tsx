import { ActionIcon, AppShell, Avatar, Box, Burger, Divider, Group, Header, MediaQuery, Navbar, Space, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import { Adjustments, Checkbox, ChevronRight, List, Photo } from 'tabler-icons-react';
import { BackendContext, StoreContext } from './Contexts';

import { HomePage } from './Pages/HomePage';
import { ItemManager } from './Pages/ItemManager';
import { NavItem } from './NavItem';
import { Pages } from './types';
import { UserProfile } from './Pages/UserProfile';
import { useLocalStorage, } from '@mantine/hooks';
import { useState } from 'react';

export function Mantine() {
    const [opened, setOpened] = useState(false);
    const [currentPage, setCurrentPage] = useLocalStorage({ key: 'currentPage', defaultValue: Pages.home });
    const theme = useMantineTheme()



    const handleNavItemClick = (page: Pages) => {
        setCurrentPage(page)
        setOpened(false)
    }

    return (
        <BackendContext.Provider value='http://localhost:7071/api'>
            {/* <BackendContext.Provider value='https://lurepair-fn.azurewebsites.net/api'> */}
            <StoreContext.Provider value={"store3"}>


                <AppShell
                    styles={(theme) => ({
                        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                    })}
                    navbarOffsetBreakpoint="sm"
                    fixed
                    navbar={
                        <Navbar
                            p="md"
                            hiddenBreakpoint="sm"
                            hidden={!opened}
                            width={{ sm: 300, lg: 400 }}
                            color={theme.colors.dark[1]}
                        >
                            <Navbar.Section grow mt="md">
                                <Group direction='column' >

                                    <NavItem
                                        body={
                                            <>
                                                <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                                                    <List size={20} />
                                                </ThemeIcon>
                                                <Text>Store home</Text>
                                            </>

                                        }
                                        onClick={() => handleNavItemClick(Pages.home)}
                                    />
                                    <NavItem
                                        body={
                                            <>
                                                <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                                                    <Checkbox size={20} />
                                                </ThemeIcon>
                                                <Text>{"Item manager"}</Text>
                                            </>
                                        }
                                        onClick={() => handleNavItemClick(Pages.itemManager)}
                                    />
                                    {/* <NavItem
                                icon={<ThemeIcon size="lg" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                                <Photo size={20} />
                                </ThemeIcon>}
                                title='Home page'
                                />
                                <NavItem
                                icon={<ThemeIcon size="lg" variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                                <Photo size={20} />
                                </ThemeIcon>}
                                title='Home page'
                                />
                                <NavItem
                                icon={<ThemeIcon size="lg" variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}>
                                <Photo size={20} />
                                </ThemeIcon>}
                                title='Home page'
                            /> */}





                                </Group>
                            </Navbar.Section>
                            <Navbar.Section>
                                <Divider />
                                <Space h="sm" />
                                <NavItem
                                    position='apart'
                                    onClick={() => handleNavItemClick(Pages.userProfile)}
                                    body={<>
                                        <Avatar color="cyan" radius="xl">DH</Avatar>
                                        <Group spacing={"xs"} direction='column' >
                                            <Text weight={500}>{"Dmitry Hromada"}</Text>
                                            <Text size='sm'>{"Store name"}</Text>
                                        </Group>
                                        {/* <ActionIcon> */}
                                        <ChevronRight />
                                        {/* </ActionIcon> */}
                                    </>} />
                            </Navbar.Section>
                        </Navbar>
                    }
                    header={
                        <Header height={70} p="md">
                            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                    <Burger
                                        opened={opened}
                                        onClick={() => setOpened((o) => !o)}
                                        size="sm"
                                        color={theme.colors.gray[6]}
                                        mr="xl"
                                    />
                                </MediaQuery>

                                <Title order={3}>Repair center</Title>
                            </div>
                        </Header>
                    }
                >
                    {currentPage == Pages.home && <HomePage />}
                    {currentPage == Pages.itemManager && <ItemManager />}
                    {currentPage == Pages.userProfile && <UserProfile />}
                </AppShell>
            </StoreContext.Provider>
        </BackendContext.Provider>
    );
}
