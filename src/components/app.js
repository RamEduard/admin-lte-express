/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/23/16
 * Time: 4:42 PM
 */
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Template from './app-template';
import Cart from '../components/cart/cart';
import Catalog from '../components/catalog/catalog';
import CatalogItem from '../components/product/item';

export default () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Template}>
                <IndexRoute component={Catalog} />
                <Route path="cart" component={Cart} />
                <Route path="item/:item" component={CatalogItem} />
            </Route>
        </Router>
    )
}