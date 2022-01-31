import React from "react";

export const ApiContext = React.createContext({
    apiToken: null,
    userData: [],
    networkError: false,
    login: (user_email, user_password) => {},
    register: (user_gender, user_name, user_email, user_password) => {},
    facebook: (user_gender, user_name, user_email, user_password) => {},
    logout: () => {},
    getUsers: () => {},
    postUserRating: () => {},

});

export class ApiProvider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            apiToken: '',
            loadApiToken: this.loadApiToken,
            checkApiToken: this.checkApiToken,
            userData: [],
            networkError: false,
            fetchApi: this.fetchApi,
            login: this.login,
            register: this.register,
            facebook: this.facebook,
            logout: this.logout,
            getUsers: this.getUsers,
            postUserRating: this.postUserRating,
        }        
    }

    componentDidMount() {
        this.loadApiToken();
    }
    
    loadApiToken = () => {
        const token = window.localStorage.getItem('apiToken');
        if (token) {
            this.setState({
                apiToken: token,
            })
            this.checkApiToken(token);
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

    checkApiToken = async ( token ) => {
        
        const response = await this.fetchApi('/token', 'POST', { token });
    
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
                window.localStorage.removeItem('apiToken');
                this.setState({
                    apiToken: null,
                    userData: [],
                    networkError: false,
                })
            }
            else{
                this.setState({
                    userData: data,
                })
            }
        }
    }

    logout = async () => {

        await this.fetchApi(`/logout/${this.state.userData.user_id}`, 'DELETE', null);

        this.setState({
            apiToken: null,
            userData: {},
        })
    }

    facebook = async ( user_gender, user_name, user_email, user_password ) => {

        const response = await this.fetchApi('/register', 'POST', { user_gender, user_name, user_email, user_password });

        if (response == null) {
            this.setState({
                networkError: true,
            })
        }
        else if(!response.ok){
            throw new Error(response.statusText);
        }
        else{
            this.login(user_email, user_password);
        }
    }

    register = async ( user_gender, user_name, user_email, user_password ) => {

        const response = await this.fetchApi('/register', 'POST', { user_gender, user_name, user_email, user_password });

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
                this.login(user_email, user_password);
            }
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
                window.localStorage.setItem('apiToken', data.token);
                this.setState({
                    apiToken: data.token,
                    userData: data,
                });
            }
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

    postUserRating = async ( user_id, user_id_rated, rating ) => {

        const response = await this.fetchApi('/api/encounters', 'POST', { user_id, user_id_rated, rating });

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