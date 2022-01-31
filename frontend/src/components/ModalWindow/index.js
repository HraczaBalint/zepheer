import React from "react";
import ReactModal from "react-modal";

export default class ModalWindow extends React.Component {
    constructor () {
        super();
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
                <div className="modal_wrapper">
                    <button className="modal_opener" onClick={this.handleOpenModal}>{this.props.name}</button>
                    <ReactModal 
                        isOpen={this.state.showModal}
                        onRequestClose={this.handleCloseModal}
                        className="modal"
                    >
                    <div>
                        <button onClick={this.handleCloseModal}>x</button>
                        { this.props.children }
                    </div>
                    </ReactModal>
                </div>
            </>
        )
    }
  }