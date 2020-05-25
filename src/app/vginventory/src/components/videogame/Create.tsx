import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const VideoGameCreate = (props: any) => {
    
    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <div className="title text-center">
                        <h1>Add a Video Game</h1>
                    </div>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" id="title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <Input type="text" id="genre" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" id="description" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="releasedate">Release Date</Label>
                            <Input type="date" id="releasedate" placeholder="date placeholder" />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}