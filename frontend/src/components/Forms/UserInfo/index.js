import React from 'react';
import { ApiContext } from '../../../api/api';
import { Alert, Button, Form } from "react-bootstrap";

export default class UserDataForm extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            handleProfileUpdate: this.handleProfileUpdate,
        }
    }

    loadUser = async () => {
        const userData = await this.context.getUser(this.context.userData.user_id);

        this.setState({
            userData: userData,
        })

        console.log(this.state.userData);
    }

    handleProfileUpdate = async (e) => {

        e.preventDefault();


    }

    componentDidMount() {
        this.loadUser();
    }

    render() {

        const { userData } = this.state;

        return(
            <>
                <Form onSubmit={this.handleProfileUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Interests:</Form.Label>
                        <Form.Select name="gender" value={userData.user_gender_preference} onChange={this.handleChange} required>
                            <option value="" >--Choose--</option>
                            <option value="0">Females</option>
                            <option value="1">Males</option>
                            <option value="2">Both</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit">Update profile</Button>
                    </Form.Group>
                </Form>
            </>
        )
    }
}