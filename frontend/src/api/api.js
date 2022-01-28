import React from "react";

export const ApiContext = React.createContext({
    apiToken: null,
    networkError: false,
    login: (user_email, user_password) => {},
    getUsers: () => {},
    postUserRating: () => {},

});

export class ApiProvider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            apiToken: '',
            networkError: false,
            fetchApi: this.fetchApi,
            login: this.login,
            getUsers: this.getUsers,
            postUserRating: this.postUserRating,
        }        
    }

    async fetchApi(endpoint, method = 'GET', data = null) {

        try {
            const response = await fetch(`${this.props.serverAddress}${endpoint}`, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.state.apiToken ? `Bearer ${this.state.apiToken}` : null,
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (response == null) {
                this.setState({
                    networkError: true,
                })
            }
            else{
                this.setState({
                    networkError: false,
                })
                return response;
            }
        } catch (error) {
            this.setState({
                networkError: true,
            })
        }
    }

    login = async ( user_email, user_password ) => {
            
        const response = await this.fetchApi('/login', 'POST', { user_email, user_password });

        if (response == null) {
            this.setState({
                networkError: true,
            })
        }
        else if(!response.ok){
            throw new Error(response.statusText);
        }
        else{
            const data = await response.json();
            if(data.message) {
                throw new Error(data.message);
            }
            else{
                this.setState({
                    apiToken: data.token,
                });
            }
            return data;
        }
    }   

    getUsers = async () => {

        const response = await this.fetchApi('/api/users', 'GET', null);

        if (response == null) {
            this.setState({
                networkError: true,
            })
            throw new Error("Network error");
        }
        else if(!response.ok){
            throw new Error(response.statusText);
        }
        else{
            const data = await response.json();
            return data;
        }
    }

    postUserRating = async (newRating) => {

        const response = await this.fetchApi('/api/encounters', 'POST', newRating);

        if (response == null) {
            this.setState({
                networkError: true,
            })
        }
        else if(!response.ok){
            throw new Error(response.statusText);
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