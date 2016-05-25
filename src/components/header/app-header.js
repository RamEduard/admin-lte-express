/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/24/16
 * Time: 1:46 PM
 */
import React from 'react';
import CartSummary from './app-cart-summary';

export default () => {
	return (
		<div className="row" style={{borderBottom: '1px solid #ccc'}}>
			<div className="col-sm-2">
				<h1>Store</h1>
			</div>
			<div className="col-sm-10 text-right">
				<CartSummary />
			</div>
		</div>
	);
}