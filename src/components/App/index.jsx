import React, { Component } from 'react';
import Header from 'components/Header';
import styles from './styles.less';


export default class App extends Component {
	render() {
		return (
			<div className={ styles.normal }>
				<Header vertical>
					<h1>CSS Modules &amp; LESS Setup</h1>
					<a href='http://github.com/ajliv' target='_blank'>@ajliv</a>
				</Header>
			</div>
		);
	}
}
