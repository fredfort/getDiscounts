import * as React from 'react';
import { Link } from 'react-router-dom'

export function Navigation() {
    return (<div className='navigation'>
        <Link to='/'>Products</Link>
        <Link to='/settings'>Settings</Link>
      </div>);
}