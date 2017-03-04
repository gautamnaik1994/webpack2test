import React, {
    Component
} from 'react';

// var isAdmin = true;
// var adminComponent = (Component) => {
//     return class Admin extends Component {
//         render() {
//             if (isAdmin) {
//                 return (
//                     <div>
//                         Test test
//                         <Component {...this.props} />
//                     </div>
//                 );
//             } else {
//                 return null;
//             }
//         }
//     };
// };

var isAdmin = true;
var adminComponent = (Component) => {
    return class Admin extends Component {
        componentDidUpdate() {
            console.log("Component updated sucesfully");
            if (super.componentDidUpdate) {
                super.componentDidUpdate();
            }
        }
        render() {
            if (isAdmin) {
                return (
                    <div>
                        Test test
                       {super.render()}
                    </div>
                );
            } else {
                return null;
            }
        }
    };
};

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count
        }
        this.onClick2 = this.onClick2.bind(this);
    }
    componentDidUpdate() {
        console.log("Test updated");
    }
    onClick() {
        this.setState({
            count: this.state.count + 1
        });
    }
    onClick2() {
        this.setState({
            count: this.state.count + 2
        });
    }
    render() {
        return (
            <div>
                <h1> Test Component </h1>
                <p> Count = {this.state.count} </p>
                <button onClick={this.onClick.bind(this)}> Button</button>
                <button onClick={this.onClick2}> Button2 </button>
            </div>
        );
    }
}

Test.defaultProps = {
    count: 50
};

Test.propTypes = {
    count: React.PropTypes.number
}

export default adminComponent(Test);