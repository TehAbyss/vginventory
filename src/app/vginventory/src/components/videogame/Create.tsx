import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { useCreateVideoGame } from '../../hooks/useCreateVideoGame';

export const VideoGameCreate = () => {
    const {
        title,
        updateTitle,
        genres,
        addGenre,
        updateGenre,
        removeGenre,
        description,
        updateDescription,
        updateReleaseDate,
        submitHandler
    } = useCreateVideoGame();

    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <div className="title text-center">
                        <h2>Add a Video Game</h2>
                    </div>
                    <Form onSubmit={submitHandler}>
                        <FormGroup>
                            <Label className="description" for="title">Title</Label>
                            <Input type="text" id="title" onChange={updateTitle} value={title} />
                        </FormGroup>
                        <FormGroup>
                            <legend className="description">Genre</legend>
                            {genres.map((genre, idx) => (
                                <InputGroup key={idx}>
                                    <Input type="text" placeholder="New Genre" value={genre} onChange={(event) => updateGenre(event, idx)} />
                                    <InputGroupAddon addonType="append">
                                        <Button className="btn-round" color="danger" type="button" onClick={() => removeGenre(idx)}> - </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            ))}
                            <Button type="button" color="default" onClick={addGenre}>Add Genre</Button>
                        </FormGroup>
                        <FormGroup>
                            <Label className="description" for="description">Description</Label>
                            <Input type="textarea" id="description" value={description} onChange={updateDescription} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="description" for="releasedate">Release Date</Label>
                            <InputGroup className="date" id="datetimepicker">
                                <Input type="date" id="releasedate" onChange={updateReleaseDate} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <span className="glyphicon glyphicon-calendar">
                                            <i aria-hidden={true} className="fa fa-calendar" />
                                        </span>
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}