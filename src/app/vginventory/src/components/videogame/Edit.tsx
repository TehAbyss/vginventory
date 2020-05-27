import React from 'react';
import DateTime from 'react-datetime';
import { useUpdateVideoGame } from '../../hooks/useUpdateVideoGame';
import { Container, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export const VideoGameEdit = (props: any) => {
    const { 
        videogame,
        genres,
        addGenre,
        updateGenre,
        removeGenre,
        description,
        updateDescription,
        releaseDate,
        updateReleaseDate,
        submitHandler
      } = useUpdateVideoGame(props.location.state.game);
    
    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <div className="title">
                        <h1>{videogame.title}</h1>
                    </div>
                    <Form onSubmit={submitHandler}>
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
                            <Label className="description" for="datetimepicker">Release Date</Label>
                            <InputGroup className="date" id="datetimepicker">
                                <DateTime value={releaseDate} dateFormat="YYYY-MM-DD" timeFormat={false} onChange={updateReleaseDate} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <span className="glyphicon glyphicon-calendar">
                                            <i aria-hidden={true} className="fa fa-calendar" />
                                        </span>
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <Button type="submit">Update</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}