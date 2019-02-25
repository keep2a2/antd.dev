import uniqueId from 'lodash/uniqueId';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'react-sortablejs';

const codeStyle = {
    background: '#000',
    color: '#fff',
    padding: '10px',
}

class SortableExample extends React.Component {
    state = {
        items: ['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry']
    };
 
    render() {
        const items = this.state.items.map(val => (<li key={uniqueId()} data-id={val}>{val}</li>));
 
        return (
            <div>
                <Sortable
                    tag="ul" // Defaults to "div"
                    onChange={(order, sortable, evt) => {
                        console.log("onChagne:", order, sortable, evt);
                        this.setState({ items: order });
                    }}
                >
                    {items}
                </Sortable>

                <pre style={codeStyle}>
                    // Installation <br/>

                    yarn add sortablejs@1.6.1 <br/>
                    
                    yarn add react-sortablejs <br/>
                </pre>
            </div>
        );
    }
}

export default SortableExample