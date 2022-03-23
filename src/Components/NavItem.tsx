import { Button, Container, Group, GroupPosition, Text } from '@mantine/core';
import React, { FC } from 'react'

interface Props {
    body: JSX.Element;
    onClick: () => void;
    position?: GroupPosition
}
export const NavItem: FC<Props> = ({ body, onClick, position }) => {
    return (
        <Group
            style={{ padding: 10, width: '100%' }}
            position={position}
            // grow
            sx={(theme) => ({
                borderRadius: 5,
                '&:hover': {
                    backgroundColor: theme.colors.dark[5],
                },
            })}

            onClick={onClick}
        >



            {body}
        </Group>
    )
}
