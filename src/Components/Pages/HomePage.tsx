import { NewItemForm } from '../NewItemForm';
import { PageItemContainer } from '../PageItemContainer';
import React from 'react'

interface Props {
}

export const HomePage: React.FC<Props> = ({ }) => {








    return (
        <>
            <PageItemContainer>
                {/* <Center>

                    <Button variant='subtle'
                        onClick={() => {
                            setShowNewItemPanel(true)
                        }}
                    >
                        + Add new repair
                    </Button>
                </Center> */}

                <NewItemForm />
            </PageItemContainer>
        </>
    )
}
