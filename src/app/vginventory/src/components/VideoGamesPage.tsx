import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Container, Card, CardHeader, CardBody, CardText, CardFooter, Button, CardDeck, Row, Col } from "reactstrap";
import './../styles/videoGames.css';

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props.games);
    let pageHeader = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        if (window.innerWidth < 991) {
        const updateScroll = () => {
            let windowScrollTop = window.pageYOffset / 3;
            if (pageHeader.current) {
                pageHeader.current.style.transform =
                "translate3d(0," + windowScrollTop + "px,0)";
            }
        };
        window.addEventListener("scroll", updateScroll);
        return function cleanup() {
            window.removeEventListener("scroll", updateScroll);
        };
        }
    });

    return (
        <>
            <div
                className="page-header page-header-xs section-dark"
                style={{
                backgroundImage:
                    "url(" + require("../img/daniel-olahh.jpg") + ")"
                }}
                data-parallax={true}
                ref={pageHeader} />
            
            <div className="section section-dark">
                <Container>
                    <div className="title">
                        <h2>Video Games</h2>
                    </div>
                    <Row>
                        <Col md="8">
                            <Button href="" color="default">Add video Game</Button>
                        </Col>
                    </Row>
                    <CardDeck>
                        {videoGames.map((vg) => (
                            <div key={vg.title}>
                                <Card className="VG-card">
                                    <CardHeader>{vg.title}</CardHeader>
                                    <CardBody className="VG-card-body">
                                        <CardText className="VG-card-text">{vg.description}</CardText>
                                    </CardBody>
                                    <CardFooter><Button href={`/videogames/${vg.title}`} color="default">Read more</Button></CardFooter>
                                </Card>
                            </div>
                        ))}
                    </CardDeck>
                </Container>
            </div>
        </>
    )
};