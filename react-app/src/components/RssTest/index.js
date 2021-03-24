import React, { useState, useEffect } from 'react'


const RssTest = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState({})

  const getRss = async () => {
    const id = 1
    const response = await fetch(`/api/sources/${id}`)
    if (response.ok) {
      const data = await response.json();
      console.log('   :::FETCH_DATA:::   ', data);
      return data
    }
  }

  useEffect(() => {
    (async () => {
      setData(await getRss())
      setLoaded(true)
    })()
  }, [])

  if (!loaded) {
      return null;
  }

  return (
    <div>
      <div>title :: {data.feed.title}</div>
      <div>
        {data.entries.map((entry, i) => (
          <>
            <div>entry-{i}-title :: {entry.title}</div>
            <div>entry-{i}-published :: {entry.published}</div>
            <div>entry-{i}-content :: {entry.content[0].value}</div>
            <div>entry-{i}-id :: {entry.id}</div>
          </>
        ))}
      </div>
    </div>
  )
}

export default RssTest
