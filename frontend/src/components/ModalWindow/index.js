import React from "react";
import { Button, Modal } from "react-bootstrap";
import ReactModal from "react-modal";

export default class ModalWindow extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            handleModal: this.handleModal,
        };
    }
    
    handleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    componentDidMount() {
        ReactModal.setAppElement('body');
    }
    
    render () {
        return (
            <>
                <Button variant="primary" onClick={this.handleModal}>
                    { this.props.name }
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>{ this.props.name }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{ this.props.children }</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
  }