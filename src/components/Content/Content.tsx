import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default class Content extends React.Component {
    render() {
        return (
            <Outlet />
        );
    }
};