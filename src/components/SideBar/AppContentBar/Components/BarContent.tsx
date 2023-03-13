import AppItemComponent from "./AppItemComponent";
import { BsAlarm } from 'react-icons/bs';
import React from 'react';
import ItemsManager from "../../../../managers/ItemsManager";

import {fillAppItems, getItem} from "../../../../store/manager";
import { connect } from 'react-redux';

class BarContent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            name:"",
            entries: [],
            model: props.model,
        }
    }

    getModelName(): String {
        return this.getModel().getModelName()
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.getEntries()
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.model !== this.state.model){
            console.log("componentDidUpdate prevProps.model")
            console.log(this.state.model)
            // this.getEntries()
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
    // check if the value of the state property 'myData' has changed
        console.log("componentDidUpdate")
        console.log(this.state.model)
        //on load check that the current model is the first to be initialized on load
    if (nextProps.model !== this.state.model) {
      // allow the component to update if the value has changed
        console.log("changed")
      return true;
    }
    console.log("not changed")
    // prevent the component from updating if the value hasn't changed
    return false;
  }

    getEntries(): void {
        // Check that the items stored are the ones from the current app
        // const entries = ItemsManager.getItems();
        // if (entries.length === 0) {
        // this.getEntriesFromDB()
        // } else {
        // this.setState({ entries: entries });
        // }
        this.getEntriesFromDB()
    }

    getEntriesFromDB(): void {
        this.getModel().getAll()
            .then((entries: Array<any>) => { this.saveEntries(entries); })
            .catch((error: any) => { console.error(error); })
    }

    getModel() { return new this.state.model }

    saveEntries(entries: Array<any>) {
        ItemsManager.saveAllItems(entries);
        this.props.setItems(entries);
        this.setState({ entries: entries });
    }

    handleDropDown(event: any) {
        console.log(event)
    }

    render() {
        return (
            <div>
                {this.state.entries.map((value, index) => {
                    return <AppItemComponent value={value} title={value.title} url={`/${this.getModelName()}/${value.id}`} icon={<BsAlarm size="15" />} key={index} />
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
  return {
    name: state.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (data) => dispatch(fillAppItems(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarContent);