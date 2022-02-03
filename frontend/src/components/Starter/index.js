import React from "react";
import Facebook from "../Forms/Facebook";
import LoginForm from "../Forms/Login";
import RegisterForm from "../Forms/Register";
import ModalWindow from "../ModalWindow";


export default class Starter extends React.Component{

    render() {
        return(
            <>
                <div>
                    <ModalWindow name={"Sign in"}>
                        <Facebook/>
                        <LoginForm/>
                    </ModalWindow>
                    <ModalWindow name={"Join"}>
                        <Facebook/>
                        <RegisterForm/>
                    </ModalWindow>
                </div>
            </>
        )
    }
}