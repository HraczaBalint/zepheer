import React from "react";

export const ApiContext = React.createContext({
    apiToken: null,
    getUsers: () => {},
});

export class ApiProvider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            apiKey: '65b09b151d4379a5ac8de26c02f51a31688e96e150ebc831f3e6a0a62ade4759428881636c625b85222181176e7be5d10b9f704d09bc6fee7ad13fce55a9d697',
            getUsers: this.getUsers,
        }        
    }

    getUsers = async () => {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.state.apiKey}` ,
            },
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();

        return data;
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