import { Box, Button, Group, TextInput } from '@mantine/core';

import React from 'react'
import { useForm } from '@mantine/hooks';

export const NewItemForm = () => {

    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            ticketId: '',
        },

        // validate: {
        //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        // },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Group direction="column" spacing="sm" grow>

                    <TextInput
                        required
                        label="Ticket Id"
                        {...form.getInputProps('ticketId')}

                    />
                    <TextInput
                        label="First name"
                        required
                        {...form.getInputProps('firstName')}

                    />
                    <TextInput
                        required
                        label="Last name"
                        {...form.getInputProps('lastName')}
                    />
                    <TextInput
                        required
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        required
                        label="Phone number"
                        {...form.getInputProps('phone')}
                    />
                </Group>




                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )
}
