# fetching data

[ Fetch Data from an API in React.js - Part 12 (good video)](https://youtu.be/T3Px88x_PsA)   

```
  import React from "react";

  export default class FetchRandomUser extends React.Component{

    state = {
      loading: true,
      person: null
    }
    // where is the constructor? - maybe only needed when passing props?

    async componentDidMount(){
      const url = "https://api.randomuser.me";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ person: data.results[0], loading: false });
    }

    render(){

      if(this.state.loading){
        return <div> didn't get a person </div>
      }

      if(!this.state.person){
        return <div>didn't get a person</div>
      }

      return (
        <div>
          {this.state.loading || !this.state.person ? (
            <div>loading...</div>
            ) : (
              <div>
                <div>{this.state.person.name.title}</div>
                <div>{this.state.person.name.first}</div>
                <div>{this.state.person.name.last}</div>
                <img src={this.state.person.picture.large} />
              </div>
              )
          }
        </div>
        )
    }
  }// FetchRandomUser
```
> notice the async outside of componentDidMount to make it asynchronous
> **i didn't know i could return different render values**


[ How to fetch data in React - RWieruch ](https://www.robinwieruch.de/react-fetching-data#how-to-fetch-data-in-render-props)   

[ Patterns for data fetching in React - LogRocket Blog (best article for hooks)](https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/)   
> i can useEffect((){},[]); with an empty array to run once to run a fetch api then use state updates to re-render
```
  import React, {useEffect, useState} from 'react';
  import axios from "axios";
  import SimpleUserTable from "./SimpleUserTable";
  const USER_SERVICE_URL = 'https://jsonplaceholder.typicode.com/users';

  function UserTableReactHooks() {

      const [data, setData] = useState({users: [], isFetching: false});

      useEffect(() => {
            const fetchUsers = async () => {
                try {
                    setData({users: data.users, isFetching: true});
                    const response = await axios.get(USER_SERVICE_URL);
                    setData({users: response.data, isFetching: false});
                } catch (e) {
                    console.log(e);
                    setData({users: data.users, isFetching: false});
                }
            };
            fetchUsers();
        }, []);
```
> why wold i need to setData({users: data.users, isFetching: true}); initially when useState already has the initial data?

**both methods render without the available data and then render something else later**

react-dom.development.js:524 Warning: An effect function must not return anything besides a function, which is used for clean-up.

It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:
```
  useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state
```
