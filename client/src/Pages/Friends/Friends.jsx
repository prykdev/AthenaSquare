import React from "react";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { Footer } from "../../Components/Footer/Footer.jsx";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "./Friends.scss";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="home">
      <NavbarComponent />
      <Container>
        <div
          data-aos="fade-in"
          data-aos-offset="10"
          data-aos-delay="0"
          data-aos-duration="500"
          data-aos-mirror="true"
          data-aos-easing="ease-in-out"
          id="friends"
        >
          <div className="schedule">
            <h1>Friends</h1>
            <div className="context">
              <Link to="/connect"></Link>
            </div>
            <Tabs
              defaultActiveKey="Friends"
              id="uncontrolled-tab-example"
              className="mb-3 tabs"
            >
              <Tab eventKey="Friends" title="Friends">
                <table class="table table-hover table-bordered text-center">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td> Remove </td>
                    </tr>
                  </tbody>
                </table>
              </Tab>

              <Tab eventKey="Pending" title="Pending" classname="mb-3 tab">
                <table class="table table-hover table-bordered text-center">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td> Cancel Request </td>
                    </tr>
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey="Requests" title="Requests">
              <table class="table table-hover table-bordered text-center">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td> Reject Request </td>
                    </tr>
                  </tbody>
                </table>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
