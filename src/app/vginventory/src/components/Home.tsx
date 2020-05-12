import React from "react";
import { Container } from "reactstrap";

export const Home = () => {
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
    <div
      style={{
        backgroundImage: "url(" + require("../img/daniel-olahh.jpg") + ")"
      }}
      className="page-header"
      data-parallax={true}
      ref={pageHeader}>
        <div className="filter">
          <Container>
            <div className="motto text-center">
              <h1>Video Game Inventory</h1>
              <h3>Welcome to the video game inventory.</h3>
            </div>
          </Container>
        </div>
    </div>
  );
}