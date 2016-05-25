/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/24/16
 * Time: 2:03 PM
 */
import React from 'react';
import { Link } from 'react-router';

import AppStore from '../../stores/app-store';
import StoreWatchMixin from '../../mixins/StoreWatchMixin';
import AppActions from '../../actions/app-actions'
import CartButton from '../cart/button';

function getCatalogItem( props ){
	let item = AppStore.getCatalog().find( ({ id }) => id === props.params.item )
	return {item}
}

const CatalogDetail = (props) => {
	return (
		<div>
			<h4>{ props.item.title }</h4>
			<img src="http://placehold.it/250x250" />
			<p>{ props.item.description }</p>
			<p>${ props.item.cost } <span
				className="text-success">
              { props.item.qty && `(${props.item.qty} in cart)`}
            </span>
			</p>
			<div className="btn-group">
				<Link to="/" className="btn btn-default btn-sm">Continue Shopping</Link>
				<CartButton
					handler={
                AppActions.addItem.bind(null, props.item)
              }
					txt="Add To Cart"
					/>
			</div>

		</div>
	)
}

export default StoreWatchMixin( CatalogDetail, getCatalogItem )
