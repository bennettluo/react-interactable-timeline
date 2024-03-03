
import React, { useEffect, useRef, useState } from 'react'
import interact from 'interactjs'
import Clip from './Clip'
import './Track.less'

let initAbsoluteDistanceX = 0

const Track = ({
  track,
  onCreateTrack,
  onUpdateTrack,
  onDraggableImageOver
}) => {

  const trackRef = useRef(null)
  const clipRef = useRef(null)

  const onResizeStart = (event) => {}

  const onResize = (event) => {}

  const onResizeEnd = (event) => {}

  const onDragStart = (event, clip) => {
    const { left, right } = event.rect
    initAbsoluteDistanceX = left - clip.start
  }

  const onDrag = (event) => {
    // ...
  }

  const onDragEnd = (event, clip) => {
    if (!event.dropzone) {
      onCreateTrack(clip, event)
      return
    }

    const finalTrack = event.dropzone.target.slice(1)
    onUpdateTrack(finalTrack, clip)
  }

  useEffect(() => {
    const trackInteractable = interact(`#${track.id}`)
  
    trackInteractable.dropzone({
      overlap: 0.5,
      ondragenter(event) {
        console.log('drag-enter', event)
        if (event.draggable.target.slice(1) === 'draggable-img') {
          onDraggableImageOver(true)
        }
      },
      ondragleave(event) {
        console.log('drag-leave', event)
        if (event.draggable.target.slice(1) === 'draggable-img') {
          onDraggableImageOver(false)
        }
      }
    })

    return () => {}
  }, [])

  return (
    <div
      id={track.id}
      className="track"
      ref={trackRef}
    >
      {track.clips.map((clip) => (
        <Clip
          key={clip.id}
          clip={clip}
          ref={clipRef}
          onResizeStart={onResizeStart}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  )
}

export default Track
