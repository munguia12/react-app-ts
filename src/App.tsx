import React, { useState, useEffect } from 'react';
import List from './components/List'
import Form from './components/Form'
import {Sub, SubsResponseFromApi} from './types'
import './App.css';


interface AppState  {
  subs: Array<Sub>
  newSubsNumber: number
  subsResponse: Array<SubsResponseFromApi>
}

const INITAL_STATE = [
  {
    nick: 'mayer',
    subMonths: 2,
    avatar: 'https://i.pravatar.cc/150?u=mayer',
    description: 'Mayer es el god'
  },
  {
    nick: 'Ramses',
    subMonths: 4,
    avatar: 'https://i.pravatar.cc/150?u=ramses',
  }
]

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)

  useEffect(() => {
    // setSubs(INITAL_STATE)
    const getSubsFromApi = (): Promise<SubsResponseFromApi> => {
      return fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
    }

    const mapFromApiToSubs = (apiResponse: AppState["subsResponse"]): Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          name: nick,
          id: subMonths,
          image: avatar
        } = subFromApi

        return {
          nick,
          subMonths,
          avatar
        }
      })
    }

    getSubsFromApi()
      .then(subs => {
        const subsApi = mapFromApiToSubs(subs.results)
        setSubs(subsApi)
      })
  }, [])

  const handleNewSubs = (newSub: Sub): void => {
    setSubs(subs => [... subs, newSub])
  }

  return (
    <div className="App">
      <List subs={subs} />
      <Form onNewSub={handleNewSubs} />
    </div>
  );
}

export default App;
