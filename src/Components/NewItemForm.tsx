import { BackendContext, StoreContext } from './Contexts';
import { Box, Button, Group, Radio, RadioGroup, Select, Slider, TextInput } from '@mantine/core';
import React, { useContext, useState } from 'react'
import { makeid, sleep } from './utils';
import { randomId, useForm } from '@mantine/hooks';

import { useNotifications } from '@mantine/notifications';

export const NewItemForm = () => {
    const store = useContext(StoreContext)
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState(true);


    const notifications = useNotifications();
    const backend = useContext(BackendContext)



    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            ticketId: makeid(6),
        },

        // validate: {
        //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        // },
    });



    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(async (values) => {

                const currentDate = new Date().toISOString()
                console.log(values)
                setLoading(true)
                await sleep(1000)

                await fetch(backend + "/fnCreateWorkItem", {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ store, item: { ...values, createdAt: currentDate, tags: ['new'] } }),
                })
                form.reset()
                setLoading(false)
                notifications.showNotification({
                    title: `Created ticket ${values.ticketId}`,
                    message: ``,
                })


            }
            )}>
                <Group direction="column" spacing="sm" grow>

                    <TextInput
                        required
                        label="Ticket Id"
                        // value={randomId()}
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
                    {/* <Select
                        label="Phone / Email"
                        placeholder="Pick one"
                        defaultValue={phone ? 'phone' : 'email'}
                        onChange={(value: string) => value == "phone" ? setPhone(true) : setPhone(false)}
                        data={[
                            { value: 'phone', label: 'Phone' },
                            { value: 'email', label: 'Email' },
                        ]}
                    /> */}
                    <RadioGroup
                        label="Contact method"
                        // description="This is anonymous"
                        defaultValue={phone ? 'phone' : 'email'}
                        onChange={(value: string) => value == "phone" ? setPhone(true) : setPhone(false)}
                        required
                    >
                        <Radio value="phone" label="Phone" />
                        <Radio value="email" label="Email" />
                    </RadioGroup>
                    {phone ?
                        <TextInput
                            required
                            label="Phone number"
                            {...form.getInputProps('phone')}
                        />
                        :
                        <TextInput
                            required
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />
                    }
                    {/* <Slider label="Turn around time"
                        size="xl"
                        min={1}
                        max={28}
                        marks={[
                            { value: 7, label: '7 days' },
                            { value: 14, label: '14 days' },
                            { value: 21, label: '21 days' },
                        ]}
                    /> */}
                </Group>




                <Group position="right" mt="md">
                    <Button loading={loading} type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )
}
