import React from "react";

export const ApiContext = React.createContext({
    apiToken: null,
    login: (user_email, user_password) => {},
    getUsers: () => {},
    postUserRating: () => {},

});

export class ApiProvider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            apiToken: '',
            fetchApi: this.fetchApi,
            login: this.login,
            getUsers: this.getUsers,
            postUserRating: this.postUserRating,
        }        
    }

    fetchApi(endpoint, method = 'GET', data = null) {

        return fetch(`${this.props.serverAddress}${endpoint}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.apiToken ? `Bearer ${this.state.apiToken}` : null,
            },
            body: data ? JSON.stringify(data) : null,
        });
    }

    login = async ( user_email, user_password ) => {

        try {
            
            const response = await this.fetchApi('/login', 'POST', { user_email, user_password });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();

            this.setState({
                apiToken: data.token,
            });

            return data;

        } catch (error) {
            return error.message;
        }
    }   

    getUsers = async () => {

        const response = await this.fetchApi('/api/users', 'GET', null);

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        return data;
    }

    postUserRating = async (newRating) => {

        const response = await this.fetchApi('/api/encounters', 'POST', newRating);

        if (!response.ok) {
            throw Error(response.statusText);
        }
    }

    render() {
        return(
            <>
                <ApiContext.Provider value={this.state}>
                    { this.props.children }
                </ApiContext.Provider>
            </>
        )
    }
}