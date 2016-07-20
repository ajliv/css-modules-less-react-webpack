import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import styles from './styles.less';


export default class Header extends Component {
    static defaultProps = {
        vertical: false
    };

    static propTypes = {
        vertical: PropTypes.bool
    };

    render() {
        const className = cx({
            [styles.horizontal]: !this.props.vertical,
            [styles.vertical]: this.props.vertical
        });
        return (
            <header className={ className }>
                { this.props.children }
            </header>
        );
    }
}
