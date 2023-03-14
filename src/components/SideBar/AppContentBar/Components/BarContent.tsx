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
            entries: [],
        }
    }

    getModelName(): String {return this.getModel().getModelName()}

    componentDidMount(): void {this.getEntries()}

    currentAppHasChanged(propsToCompare: any):boolean {
        return propsToCompare.currentApp !== this.props.currentApp
    }

    currentStateHasChanged(stateToCompare:any):boolean {
        return stateToCompare !== this.state
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log(this.state)
        if (this.currentAppHasChanged(prevProps)){
            this.getEntries()
        }
    }

    shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>): boolean {
        //on load check that the current model is the first to be initialized on load
        if (this.currentAppHasChanged(nextProps) || this.currentStateHasChanged(nextState)) {
          // allow the component to update if the value has changed
          return true;
        }
        // prevent the component from updating if the value hasn't changed
        return false;
    }

    getEntries(): void {
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

    getModel(): any { // @ts-ignore
        return new this.props.model
    }

    updateEntries(value:Array<any>):void{
        this.setState({entries:[]})
        this.setState({entries:value})
    }

    saveEntries(entries: Array<any>): void {
        // @ts-ignore
        this.props.setItems(entries);
        this.updateEntries(entries)
    }

    render() {
        // Problems with the urls
        return (
            <div>
                {this.props.entries.map((value, index) => {
                    return <AppItemComponent value={value} title={value.title} url={`/${this.getModelName()}/${value.id}`} icon={<BsAlarm size="15" />} key={index} />
                })}
            </div>
        );
    }
}

const mapStateToProps = (state:any) => {
    // the param state is the redux state store
    // the return, returns props for the class
    const entries = state.items.stateData.itemsPerApp[state.items.stateData.currentApp]
  return {
        entries: entries
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    setItems: (data:any) => dispatch(fillAppItems(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarContent);