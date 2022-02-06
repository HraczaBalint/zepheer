import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Facebook from "../Forms/Facebook";
import LoginForm from "../Forms/Login";
import RegisterForm from "../Forms/Register";
import ModalWindow from "../ModalWindow";
import Navigation from "../Navigation";

export default class Starter extends React.Component{

    render() {
        return(
            <> 
                <Navigation/>
                <Container className="d-flex align-items-center min-vh-100">
                    <Container>
                        <Row>
                            <Col xs={12} sm={6} className="text-center">
                                <ModalWindow name={"Sign in"}>
                                <Facebook/>
                                <LoginForm/>
                                </ModalWindow>
                            </Col>
                            <Col xs={12} sm={6} className="text-center mt-5 mt-sm-0">
                                <ModalWindow name={"Join"}>
                                <Facebook/>
                                <RegisterForm/>
                                </ModalWindow>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </>
        )
    }
}