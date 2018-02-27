import Link from 'next/link';
import React from 'react';

import Layout from '../components/layout';
import Fetch from 'isomorphic-unfetch';

class Send extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    updateToken(evt) {
        this.setState({token: evt.target.value})
    }
    sendToken() {
        console.log(this.state)
        fetch('/settoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: this.state.token})
        }).then( r => {

        })
    }
    render() {
        return (
            <div>
                <input value={this.state.token} onChange={this.updateToken.bind(this)} type={'text'} placeholder={'type token'}/>
                <div onClick={() => {this.sendToken()}}>Send token</div></div>
        )
    }
}

const Index = () => {
    return (
        <Layout>
            <Send></Send>
        </Layout>
    )
};



export default Index;