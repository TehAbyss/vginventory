import React from 'react';
import { useUpdateVideoGame } from '../../hooks/useUpdateVideoGame';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const VideoGameEdit = (props: any) => {
    const { videogame, description, onDescriptionChange, onUpdate } = useUpdateVideoGame(props.location.state.game);
    
    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <div className="title">
                        <h1>{videogame.title}</h1>
                    </div>
                    <Form>
                        <FormGroup>
                            <Label for="description">Description:</Label>
                            <Input type="textarea" id="description" value={description} onChange={onDescriptionChange} />
                        </FormGroup>
                        <Button onClick={onUpdate}>Update</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}