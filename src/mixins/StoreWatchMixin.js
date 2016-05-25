/**
 * Created by Ramon Serrano <ramon.calle.88@gmail.com>
 * Date: 5/24/16
 * Time: 2:01 PM
 */
import React from 'react';
import AppStore from '../stores/app-store';

export default ( InnerComponent, stateCallback ) => class extends React.Component {
	constructor(props){
		super(props);
		this.state = stateCallback( props );
		this._onChange = this._onChange.bind(this);
	}
	componentWillMount(){
		AppStore.addChangeListener( this._onChange )
	}
	componentWillUnmount(){
		AppStore.removeChangeListener( this._onChange )
	}
	_onChange(){
		this.setState( stateCallback( this.props ) )
	}
	render(){
		return <InnerComponent {...this.state} {...this.props} />
	}
}
