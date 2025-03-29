import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import List from "./List"
import Favorites from './List/Favorites'

const queryClient = new QueryClient()

const App = () => {
  const [currentTab, setCurrentTab] = useState('list')

  const handleTabChange = (event, newValue) => setCurrentTab(newValue)


  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
      >
        <Tab value='list' label="list" />
        <Tab value='favs' label="favs" />
      </Tabs>
      {currentTab === 'list' && <List />}
      {currentTab === 'favs' && <Favorites />}
    </QueryClientProvider>
  )
}

export default App