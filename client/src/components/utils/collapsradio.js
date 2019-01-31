import React, { Component } from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown/';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';


class CollapseRadio extends Component {

    state = {
        open: false,
        value: 0
    }

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    handleAngle = () => (
        this.state.open ?
            <FontAwesomeIcon
                icon={faAngleUp}
                className="icon"
            />
            :
            <FontAwesomeIcon
                icon={faAngleDown}
                className="icon"
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map((value) => (
                <FormControlLabel
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio/>}
                    label={value.name}
                />
            ))
            :null
    )

    handleChange=(event)=>{
        this.setState({value:event.target.value},
           this.props.handleFilters(event.target.value))
    }

    render() {
        const props = this.props;
        return (
            <div className="collapse_items_wrapper">
                <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                    <ListItem onClick={this.handleClick}>
                        <ListItemText
                            primary={props.title}
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                </List>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <RadioGroup
                        aria-label="prices"
                        name="prices"
                        value={`${this.state.value}`}
                        onChange={this.handleChange}
                    >
                        {this.renderList()}
                    </RadioGroup>
                </Collapse>
            </div>
        )
    }
}

export default CollapseRadio;