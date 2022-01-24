import React from "react";
import Facebook from "../Forms/Facebook";
import LoginForm from "../Forms/Login";
import RegisterForm from "../Forms/Register";
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
                    <ModalWindow name={"Sign in"} facebook={<Facebook />} form={<LoginForm />} />
                    <ModalWindow name={"Join"} facebook={<Facebook />} form={<RegisterForm />} />
                </div>
            </>
        )
    }
}