import React, { useState } from "react";


export default class Alias extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { change: true };
    }
    render() {
        return (
            <div>
                <button
                    onClick={() => {
                        this.setState({ change: !this.state.change });
                    }}
                >
                    Click Here!
                </button>
                {this.state.change ? (
                    <h1>Welcome to GeeksforGeeks</h1>
                ) : (
                    <h1>A Computer Science Portal for Geeks</h1>
                )}
            </div>
        );
    }
};