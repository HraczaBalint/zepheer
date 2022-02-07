import React from 'react';
import Pictures from '../Pictures';
import Buttons from '../Buttons';
import Description from '../Description';
import { ApiContext } from '../../api/api';
import Logout from '../Forms/Logout';
import AgeCalculator from '../Moment/AgeCalculator';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class Encounters extends React.Component{

    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.state = {

            errorMessage: null,
            loading: true,

            rating: null,
            encounterProfiles: [],
            ep_index: 0,
        }
    }

    loadAllUsers = async () => {
        this.setState({
            loading: true,
            errorMessage: null,
            ep_index: 0,
        });
        try {
            await this.context.getUsers().then(encounterProfiles => {
                this.setState({
                    encounterProfiles: encounterProfiles.map(profile => {
                        return {
                            user_id: profile.user_id,
                            user_name: profile.user_name,
                            user_age: <AgeCalculator date={profile.user_birthday} />,
                            user_description: profile.user_description,
                            pictures: [profile.picture_name],
                        };
                    }),
                    loading: false,
                    errorMessage: null,
                });
            });
        } catch (error) {
            this.setState({
                errorMessage: error.message,
            })
        }
    }

    componentDidMount() {
        this.loadAllUsers();
    }

    handleNewRating = async (rating) => {

        const { encounterProfiles, ep_index } = this.state;

        try {
            await this.context.postUserRating(this.context.userData.user_id, encounterProfiles[ep_index].user_id, rating);

            if (ep_index < encounterProfiles.length - 1) {
            
                this.setState({
                    ep_index: ep_index + 1,
                });
            }
            else{
                this.setState({
                    errorMessage: "That was everyone!"
                })
            }
        } catch (error) {
            this.setState({
                errorMessage: error.message,
            })
        }
    };

    render() {

        const { encounterProfiles, ep_index, loading, errorMessage } = this.state;

        if (errorMessage) {
            return( 
            <>
                <div className='encounters'>
                    <div className='error'>
                        <p><h3>{ this.state.errorMessage }</h3></p>
                        <button onClick={this.loadAllUsers}>Reload</button>
                    </div>
                </div>
            </>
            )
        }

        if (loading) {
            return( 
                <>
                    <div className='encounters'>
                        <div className='loading'>
                            <h3>Loading...</h3>
                        </div>
                    </div>
                </>
            )
        };

        return(
        <>
            <Container>
                <Link to="/app/profile">{this.context.userData.user_name}</Link>
            </Container>
            <Container className="d-flex align-items-center min-vh-100">
                <Container>
                    <Row className="border border-dark rounded">
                        <Col xs={12} md={7} className="p-0">
                            <Pictures
                            pictures={encounterProfiles[ep_index].pictures}
                             />
                        </Col>
                        <Col xs={12} md={5} className="p-0">
                            <Description
                            user_name={encounterProfiles[ep_index].user_name}
                            user_age={encounterProfiles[ep_index].user_age}
                            user_description={encounterProfiles[ep_index].user_description}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Buttons
                            on_click={this.handleNewRating}
                            />
                        </Col>
                    </Row>
                    
                    <Logout/>
                </Container>
            </Container>

            
        </>
        )
    }
}