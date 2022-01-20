import React from "react";
import ModalWindow from "../ModalWindow";


export default class Starter extends React.Component{

    constructor(props) {
        super(props);
        this.setState = {
            name: '',
        }
    }

    render() {
        return(
            <>
                <div className="starter_wrapper">
                    <ModalWindow name={"Sign in"} />
                    <ModalWindow name={"Join"} />
                </div>
            </>
        )
    }
}