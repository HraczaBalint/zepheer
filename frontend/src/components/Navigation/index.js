import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import GitHubLogo from "../../assets/github_logo.png";
import DiscordLogo from "../../assets/discord_logo.png";
import Icon from "../../assets/icon.png";

export default class Navigation extends React.Component{

    render() {
        return(
            <>
                <Navbar expand="sm" bg="dark" variant="dark">
                <Container>
                        <Navbar.Brand href="#home"><img src={Icon} alt="Zepheer logo" width="25px" height="25px"/>Zepheer</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar" />
                        <Navbar.Collapse id="navbar">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#" disabled>Learn more</Nav.Link>
                                <Nav.Link href="#" disabled>Support us</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="mx-2" href="https://github.com/HraczaBalint/zepheer" target="_blank"><img src={GitHubLogo} alt="Github logo" width="25px" height="25px"/></Nav.Link>
                                <Nav.Link className="mx-2" href="https://discord.gg/APRf3V3S7M" target="_blank"><img src={DiscordLogo} alt="Discord logo" width="25px" height="25px"/></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}