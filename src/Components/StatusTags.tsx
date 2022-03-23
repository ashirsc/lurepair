import { Badge } from '@mantine/core'
import React from 'react'

interface Props {
    tags: string[];
}

export const StatusTags: React.FC<Props> = ({ tags }) => {
    return (
        <>
            {tags.map(tag => {
                let color
                if (tag === 'created') {
                    color = 'blue';
                } else if (tag === 'inProgress') {
                    color = 'orange';
                } else if (tag === 'completed') {
                    color = 'green';
                }

                return (
                    <Badge color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Badge>
                );
            })}
        </>
    )
}
