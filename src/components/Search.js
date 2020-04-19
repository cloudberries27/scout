import React from 'react';
import {Button} from 'semantic-ui-react';

export default function SearchBox({submitFunction}){
    return (
        <div>
            <form onSubmit={e=>submitFunction(e)}>
                <input type='text' name='searchValue'/>
                <Button>Search</Button>
            </form>
        </div>
    )
}