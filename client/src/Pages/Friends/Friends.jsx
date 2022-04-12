import React, { useEffect } from "react"
import NavbarComponent from "../../Components/Navbar/NavbarComponent"
import { Footer } from "../../Components/Footer/Footer.jsx"
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap"
import "./Friends.scss"
import { Tabs, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppContext } from "../../Context/appContext"
const Friends = () => {
  const { getPendingReq, username, friends, getCancelReq } = useAppContext()
  useEffect(() => {
    getPendingReq()
  }, [])

  function handleCancel(friend) {
    console.log(friend)
    getCancelReq(friend)
  }
  return (
    <div className='home'>
      <NavbarComponent />
      <Container>
        <div
          data-aos='fade-in'
          data-aos-offset='10'
          data-aos-delay='0'
          data-aos-duration='500'
          data-aos-mirror='true'
          data-aos-easing='ease-in-out'
          id='friends'
        >
          <div className='schedule'>
            <h1>Friends</h1>
            <div className='context'>
              <Link to='/connect'></Link>
            </div>
            <Tabs
              defaultActiveKey='Friends'
              id='uncontrolled-tab-example'
              className='mb-3 tabs'
            >
              <Tab eventKey='Friends' title='Friends'>
                <table class='table  table-bordered text-center'>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td style={{ width: "30%" }}> Remove </td>
                    </tr>
                  </tbody>
                </table>
              </Tab>

              <Tab eventKey='Pending' title='Pending'>
                <table class='table table-bordered text-center'>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td style={{ width: "30%" }}> Cancel Request </td>
                    </tr>
                    {friends &&
                      friends.map((friend) => (
                        <tr>
                          <td> {friend}</td>
                          <td style={{ width: "30%" }}>
                            <button
                              type='button'
                              onClick={() => handleCancel(friend)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey='Requests' title='Requests'>
                <table class='table  table-bordered text-center'>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td style={{ width: "30%" }}> Reject Request </td>
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
  )
}

export default Friends
