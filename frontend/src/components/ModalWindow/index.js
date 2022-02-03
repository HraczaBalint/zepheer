import React from "react";
import { Button, Modal } from "react-bootstrap";
import ReactModal from "react-modal";

export default class ModalWindow extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            handleOpenModal: this.handleOpenModal,
            handleCloseModal: this.handleCloseModal,
        };
    }
    
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    componentDidMount() {
        ReactModal.setAppElement('body');
    }
    
    render () {
        return (
            <>

                <Button variant="primary" onClick={this.handleOpenModal}>
                    { this.props.name }
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>{ this.props.name }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{ this.props.children }</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
  }