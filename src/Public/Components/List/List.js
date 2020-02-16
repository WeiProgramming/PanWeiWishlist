import React, {useState, useEffect} from 'react';
import { withFirebase } from '../../../Firebase';
import _ from 'lodash';

// const testCase = {
//     Wei: {
//         list: [
//             {
//                 Name: 'Litake LED Night Light',
//                 Link: 'https://amzn.to/38yAREH'
//             },
//             {
//                 Name: 'Litake LED Night Light',
//                 Link: 'https://amzn.to/38yAREH'
//             },
//         ]
//     },
//     Panee: {
//         list: [
//             {
//                 Name: 'Litake LED Night Light',
//                 Link: 'https://amzn.to/38yAREH'
//             },
//             {
//                 Name: 'Litake LED Night Light',
//                 Link: 'https://amzn.to/38yAREH'
//             },
//         ]
//     }
// };

const BaseListComponent = (props) => {
    const [values, setValues] = useState({name: '', link: ''})
    const [items, setItems] = useState({});
    
    useEffect(() => {
        props.firebase.getAllItems().on('value', snapshot => {
            setItems(snapshot.val());
        })
    },[]);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = (event, name) => {
        event.preventDefault();
        props.firebase.addWishItem(name,values);
    }

    const ObjToArray = (obj) => {
        return Object.values(obj);
    }
    return (
    <div>
        <div class="container">
            <div class="Title">
                <h1 class="text-center">Our Wish List {"<"}3 :D</h1>     
            </div> 
            <div class="row">
                {_.isEmpty(items) ? (<div>Nothing</div>) :
                <div>
                <div class="col-md-6 col-sm-6">
                    <h1>Wei's List</h1>
                    {console.log('lock', ObjToArray(items.Wei.list))}
                    {ObjToArray(items.Wei.list) !== 0 ? 
                        ObjToArray(items.Wei.list).map((item) =>(
                            (
                            <div><h3>{item.name}</h3>
                            <a rel="noopener noreferrer" href={item.link} target="_blank">Link</a>
                            </div>
                            ))) : (<div> There are no items</div>)}
                    <div class="row">
                        <div class="container-fluid">
                        <h3>Form</h3>
                            <form>
                                <label htmlFor="name">Name</label> 
                                <input name='name' type="text" onChange={handleInputChange}/>
                                <label htmlFor="link">Link</label> 
                                <input name='link' type="text" onChange={handleInputChange}/>
                                <button onClick={event => handleSubmit(event,'Wei')}>Submit</button>
                            </form>    
                        </div>
                    </div> 
                </div>
                <div class="col-md-6 col-sm-6">
                    <h1>Panee's List</h1>
                    {console.log('lock', ObjToArray(items.Wei.list))}
                    {ObjToArray(items.Panee.list) !== 0 ? 
                        ObjToArray(items.Panee.list).map((item) =>(
                            (
                            <div><h3>{item.name}</h3>
                            <a rel="noopener noreferrer" href={item.link} target="_blank">Link</a>
                            </div>
                            ))) : (<div> There are no items</div>)}
                    <div class="row">
                        <div class="container-fluid">
                        <h3>Form</h3>
                            <form>
                            <label htmlFor="name">Name</label> 
                                <input name='name' type="text" onChange={handleInputChange}/>
                                <label htmlFor="link">Link</label> 
                                <input name='link' type="text" onChange={handleInputChange}/>
                                <button onClick={event => handleSubmit(event,'Wei')}>Submit</button>
                            </form>    
                        </div>
                    </div> 
                </div>
                </div>
                }
            </div>
        </div>
    </div>
    )
};

const ListComponent = withFirebase(BaseListComponent);
export default ListComponent;