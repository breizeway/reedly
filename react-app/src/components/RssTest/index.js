import React, { useState, useEffect } from 'react'
import { parse } from 'fast-xml-parser'

const RssTest = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState({})

  const getRss = async () => {
    const response = await fetch('https://www.theverge.com/rss/index.xml')
    const text = await response.text()
    const { feed } = parse(text)
    console.log('   :::FEED:::   ', feed);
    // return Object.values(feed)
    return feed
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
      <div>title :: {data.title}</div>
      <div>icon :: {data.icon}</div>
      <div>updated :: {data.updated}</div>
      <div>link :: {data.link}</div>
      <div>id :: {data.id}</div>
      <div>
        {data.entry.map((entry, i) => (
          <>
            <div>entry-{i}-title :: {entry.title}</div>
            <div>entry-{i}-author :: {entry.author[0]}</div>
            <div>entry-{i}-content :: {entry.content}</div>
            <div>entry-{i}-published :: {entry.published}</div>
            <div>entry-{i}-id :: {entry.id}</div>
            <div>entry-{i}-updated :: {entry.updated}</div>
            <div>entry-{i}-link :: {entry.link}</div>
          </>
        ))}
      </div>
    </div>
  )
}

export default RssTest
