import React, { Component } from 'react';

class Counter extends Component {
    render() { 
        return (
        <div className="counter-container">
            <span className={this.props.counter.value > 0 ? 'has-value' : null}>{this.props.counter.value}</span>
            <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-primary m-2">
                +
            </button>
            <button onClick={() => this.props.onDecrement(this.props.counter)} className="btn btn-warning m-2">
                -
            </button>
            <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger m-2">
                Remove
            </button>
        </div>

        );
    }
}
 
export default Counter;