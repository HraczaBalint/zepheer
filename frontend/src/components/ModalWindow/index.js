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
                <div>
                    <button onClick={this.handleOpenModal}>Open modal</button>
                    <ReactModal 
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                    >
                    <div>
                        <button onClick={this.handleCloseModal}>x</button>
                        
                    </div>
                    </ReactModal>
                </div>
            </>
        )
    }
  }