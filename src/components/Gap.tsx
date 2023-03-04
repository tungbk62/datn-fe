import React from "react";

const Gap = (): JSX.Element => <div style={{ width: 20, height: 20 }} />;

Gap.XXS = () => (<div style={{ width: 5, height: 5 }} />) as JSX.Element;

Gap.XS = () => (<div style={{ width: 10, height: 10 }} />) as JSX.Element;

Gap.S = () => (<div style={{ width: 20, height: 20 }} />) as JSX.Element;

Gap.M = () => (<div style={{ width: 40, height: 40 }} />) as JSX.Element;

Gap.L = () => (<div style={{ width: 60, height: 60 }} />) as JSX.Element;

export default Gap;
