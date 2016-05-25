/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/24/16
 * Time: 11:39 AM
 */
import React from 'react';

export default (props) => {
	return (
		<button className="btn btn-default btn-sm"
			onClick={ props.handler }>
			{ props.txt }
		</button>
	)
}