import React, { Component } from 'react';

class UserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentUser: null,
        };
    }

    render() {
        return (
            <div>
                Hello World from User View!
            </div>
        );
    }
}

export default UserView;