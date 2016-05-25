/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/24/16
 * Time: 1:44 PM
 */
import React from 'react';
import Header from './header/app-header';

export default (props) => {
	return (
		<div className="container">
			<Header />
			{ props.children }
		</div>
	);
}