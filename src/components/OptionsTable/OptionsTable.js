import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import actions from 'actions';


import {Loader, Icon} from 'components';


class OptionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'key',
            sortReverse: false
        };
    }

    componentWillMount() {
        this.props.actions.optionsGet();
    }


    render() {
        let {contents} = this;
        if (!contents) contents = <tr>
            <td colSpan="3" className="po-r">
                <Loader />
            </td>
        </tr>;

        return <table>
            <tbody>
                {this.header}
                {contents}
            </tbody>
        </table>;
    }

    get sortBy() { return this.state.sortBy; }
    set sortBy(v) { return this.setState({sortBy: v}); }

    get sortReverse() { return this.state.sortReverse; }
    set sortReverse(v) { return this.setState({sortReverse: v}); }

    get headings() { return ['key', 'value']; }

    get header() {

        return <tr>
            {this.headings.map(h =>
                <th onClick={() => this.sort(h)} key={h}>
                    <span>{h}</span>
                    {this.sortBy === h &&
                        <Icon type={`arrow-short-${this.sortReverse ? 'up' : 'down'}`} />
                    }
                </th>
            )}
            <th className="icon" />
        </tr>;
    }


    get contents() {
        if (!this.sortBy) return null;
        const entries = Object.entries(this.props.options);
        const keyIndex = this.headings.indexOf(this.sortBy);

        if (entries.length) {
            let sorted = entries.sort((a, b) => {
                const v1 = a[keyIndex];
                const v2 = b[keyIndex];
                if (v1 < v2) return -1;
                if (v1 > v2) return 1;
                if (v1 == v2) return 0;
            });

            sorted = this.sortReverse ? sorted.reverse() : sorted;

            return sorted
                .map(([key, value]) =>
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                        <td className="icon">
                            <Icon type="remove" color="error" onClick={() => this.remove(key)}/>
                        </td>
                    </tr>
                ).concat([this.newOption]);

        } else return null;
    }


    get newOption() {
        return <tr className="row-new" key="$new">
            <td> <input placeholder="Option" ref={i => this.inputOption = i}/> </td>
            <td>
                <input placeholder="Value" ref={i => this.inputValue = i} />
            </td>
            <td className="icon">
                <Icon type="add" color="success" onClick={this.add.bind(this)}/>
            </td>
        </tr>;
    }


    sort(heading) {
        const h = heading;
        if (this.sortBy === h) this.sortReverse = !this.sortReverse;
        else {
            this.sortBy = h;
            this.sortReverse = false;
        }
    }

    add() {
        const option = this.inputOption.value;
        const {value} = this.inputValue;

        if (!option || !value) return;
        else this.props.actions.optionsAdd(option, value);

        this.inputOption.value = '';
        this.inputValue.value = '';
    }

    remove(option) {
        this.props.actions.optionsRemove(option);
    }
}

const matchStateToProps = state => ({
    options: state.Options
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Options
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(OptionsTable);
