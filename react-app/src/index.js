import React from 'react';
import ReactDOM from 'react-dom';

const colors = ["red", "green", "blue"];
const items = colors.map(color => <li>{color}</li>);
const element = <ul>{items}</ul>;

ReactDOM.render(element, document.getElementById('root'))