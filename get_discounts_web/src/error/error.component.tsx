import * as React from 'react';

export function Error(props){
  return <div className="error" >Error Loading the page: {props.message} </div>;
}