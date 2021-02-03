import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {

    render() { 
        return ( 
            <div>
                <button onReset={this.handleReset} className="btn btn-primary">Reset</button>
                {this.props.counters.map(counter => 
                    <Counter 
                        onIncrement = {this.props.onIncrement}
                        onDelete={this.props.onDelete} 
                        onDecrement={this.props.onDecrement}
                        key={counter.id} 
                        counter={counter}
                    />
                )}
            </div> 
        )
        ;
    }
}
 
export default Counters;