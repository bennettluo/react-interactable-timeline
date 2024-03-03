import React, { useEffect, useRef, useState } from 'react'
import interact from 'interactjs'
import Track from './Track'
import './Timeline.less'

const Timeline = () => {

  const [tracks, setTracks] = useState(() => [
    {
      id: 'track-1',
      clips: [
        { id: 'clip1', start: 50, end: 100, track: 'track-1' },
        { id: 'clip2', start: 150, end: 280, track: 'track-1' },
        { id: 'clip3', start: 300, end: 495, track: 'track-1' },
      ]
    },
    {
      id: 'track-2',
      clips: [
        { id: 'clip4', start: 320, end: 405, track: 'track-2' },
      ]
    }
  ])

  const onCreateTrack = (event, clip) => {
    const newTrackId = `track-${Date.now()}`
    
    setTracks((prev) => {
      let trackResults = prev
        .map(t => {
          if (t.id === clip.track) {
            t.clips = t.clips.filter(c => c.id !== clip.id)
          }
          return t
        })
        .concat({
          id: newTrackId,
          clips: [{ ...clip, track: newTrackId }]
        })

      return trackResults.filter(f => f.clips.length)
    })
  }

  const onUpdateTrack = (finalTrack, clip) => {
    setTracks((prev) => {
      let trackResults = []

      if (clip.track === finalTrack) {
        trackResults = prev.map(t => {
          if (t.id === clip.track) {
            t.clips = t.clips.map(c => {
              if (c.id === clip.id) {
                c.start = clip.start
                c.end = clip.end
              }
              return c
            })
          }
          return t
        })
      } else {
        trackResults = prev.map(t => {
          if (t.id === clip.track) {
            t.clips = t.clips.filter(c => c.id !== clip.id)
          } else if (t.id === finalTrack) {
            t.clips = [...t.clips, { ...clip, track: finalTrack }]
          }
          return t
        })
      }

      return trackResults.filter(f => f.clips.length)
    })
  }

  return (
    <>
      <div className="container">
        <div className="timeline">
          {tracks.map((track, index) => (
            <Track
              key={track.id}
              track={track}
              onCreateTrack={onCreateTrack}
              onUpdateTrack={onUpdateTrack}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Timeline
