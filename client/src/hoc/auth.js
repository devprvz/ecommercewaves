import React, { Component } from 'react'
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import { CircularProgress } from '@material-ui/core'

export default function (ComposedClass, reload, adminRoute = null) {

    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount() {
            this.props.dispatch(auth()).then(response => {
                //not checking response as the dispatch has already
                //updated the state of reducer so now data is availabe 
                //in props through redux (connect)
                let user = this.props.user.userData;

                if (!user.isAuth) {
                    if (reload) {
                        this.props.history.push('/register_login')
                    }
                }
                else {
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push('/user/dashboard')
                    } else {
                        if (reload === false) {
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }

                this.setState({
                    loading: false
                })
                //console.log(user);
            })
        }

        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress style={{ color: '#2196F#' }} thickness={7} />
                    </div>
                )
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}


