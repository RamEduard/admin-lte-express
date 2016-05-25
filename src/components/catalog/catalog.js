/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/24/16
 * Time: 11:38 AM
 */
import React from 'react';
import AppStore from '../../stores/app-store';
import CatalogItem from './item';
import StoreWatchMixin from '../../mixins/StoreWatchMixin'

function getCatalog(){
	return { items: AppStore.getCatalog() }
}

const Catalog = (props) => {
	let items = props.items.map( item => {
		return <CatalogItem key={ item.id } item={ item } />
	});
	return (
		<div className="row">
			{ items }
		</div>
	)
}
export default StoreWatchMixin(Catalog, getCatalog);