import { __ } from '@wordpress/i18n'
import { useSelect, useDispatch } from '@wordpress/data'
import React, { } from "react"
import {
  useBlockProps, InspectorControls,
} from '@wordpress/block-editor'
import {
  SelectControl,
  PanelBody,
  CheckboxControl,
} from '@wordpress/components'
const { useEffect } = wp.element

export default function Edit({ attributes, setAttributes, clientId }
) {
  const {
    getBlockRootClientId,
    getBlockIndex,
    getBlocks,
  } = useSelect('core/block-editor')

  let setInitialCategories = false
  const { moveBlockToPosition } = useDispatch('core/block-editor')
  function demoMoveBlock() {
    const blocks = getBlocks()
    if (blocks.length < 2) {
      alert('Stop playing now; there\'s only this block in the editor!')
      return
    }
    const blockIndex = blocks.findIndex(b => b.name === "create-block/tmy-mediacategories")
    if (blockIndex !== 0) {
      let targetBlock = blocks.splice(blockIndex, 1)[0]
      if (clientId === targetBlock.clientId) {
        targetBlock = blocks.shift()
      }
      const sourceClientId = clientId
      const targetClientId = targetBlock.clientId
      const fromRootClientId = getBlockRootClientId(sourceClientId)
      const toRootClientId = getBlockRootClientId(targetClientId)
      const targetIndex = getBlockIndex(targetClientId)
      moveBlockToPosition(sourceClientId, fromRootClientId, toRootClientId, targetIndex)
    }
  }

  const onChangeContent = (videoposition, attachmentId) => {
    const categories = [...attributes.categories]
    const p = cats.find(p => p.id == attachmentId)
    if (p) {
      categories[videoposition] = { id: attachmentId, source_url: p?.source_url, title: p.title.raw }
    } else {
      categories[videoposition] = {
        "id": attachmentId,
        "source_url": "empty",
        "title": "empty"
      }
    }
    setAttributes({ categories })
    demoMoveBlock()
  }

  const blockProps = useBlockProps({
    className: 'categories',
  })

  let availableCats
  let availableTags
  let cats = useSelect((select) => select('core').getEntityRecords('taxonomy', 'category'), [])
  let existingTags = useSelect((select) => select('core').getEntityRecords('taxonomy', 'post_tag'), [])

  if (cats) {
    availableCats = cats
      .map((p, i) => ({ id: p.id, source_url: p.link, title: p.name }))
  }
  if (existingTags) {
    availableTags = existingTags
      .map((p, i) => ({ id: p.id, source_url: p.link, title: p.name }))
  }
  // useEffect(() => {
  //   if (cats && !setInitialCategories) {
  //     options = cats
  //       .map((p, i) => ({ id: p.id, source_url: p.link, title: p.name }))
  //     setInitialCategories = true
  //     // attributes.categories = options
  //     // setAttributes({ categories: options })
  //   }
  // }, [cats])
  // let videos = []
  let posts = useSelect((select) => select('core').getEntityRecords('postType', 'attachment'), [])
  // let dispPosts = []
  if (posts) {
    // const tags = posts.reduce((acc, post) => {
    //   post.tags.map(t => acc.add(t))
    //   return acc
    // }, new Set())
    // const cats = posts.reduce((acc, post) => {
    //   post.categories.map(t => acc.add(t))
    //   return acc
    // }, new Set())
    // posts.map(p => {
    //   attributes.categories.map(cat => {
    //     if (p.categories.includes(cat.id)) {
    //       dispPosts.push(p)
    //     }
    //   })
    // })
    // videos = dispPosts
    // console.log('videos', videos)
  }

  return (
    <div {...blockProps}>
      {!attributes.categories || attributes.categories.length === 0 && (
        <h2>Select the videos for the loop</h2>
      )}
      {attributes.categories ? <h2>Categories</h2> : null}
      {attributes.categories ? (
        <div className='category_selector'>
          {attributes.categories.map((seq, i) => (
            <a href={seq.source_url} data-catid={seq.id}>{seq.title}</a>
          ))}
        </div>
      ) : "No categories found."}
      {attributes.tags ? <h2>Tags</h2> : null}
      {attributes.tags ? (
        <div className='category_selector'>
          {attributes.tags.map((seq, i) => (
            <a href={seq.source_url} data-catid={seq.id}>{seq.title}</a>
          ))}
        </div>

      ) : "No tags found."}
      <h2>Videos: <span className='hide_in_editor'>(shift-click on video to toggle fullscreen)</span></h2>
      {attributes.sequence &&
        <div className='videos'>
          {attributes.sequence.map((seq, i) => (
            <video
              key={i + seq.id}
              width='320' height='240' class={`overlay w-100`} autoPlay={i === 0} muted preload data-seqcatid={seq.categories}>
              <source src={seq.source_url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      }
      <InspectorControls>
        <PanelBody title={__('Categories to display', 'gutenberg')} initialOpen>
          {availableCats ? availableCats.map((seq, i) => (
            <CheckboxControl
              label={seq.title}
              checked={attributes.categories.map((p, i) => p.title).includes(seq.title)}
              onChange={() => {
                var dispPosts = []
                var newCats = [...attributes.categories.filter(p => p.title !== "empty")]
                var existingTags = [...attributes.tags.filter(p => p.title !== "empty")]
                if (newCats.map(p => p.id).includes(seq.id)) {
                  newCats = newCats.slice(newCats.findIndex(c => c.id === seq.id), 1)
                } else {
                  newCats.push(seq)
                }
                posts.map(p => {
                  newCats.map(cat => {
                    if (p.categories.includes(cat.id) && !dispPosts.map(d => d.id).includes(p.id)) {
                      dispPosts.push(p)
                    }
                  })
                  existingTags.map(tag => {
                    if (p.tags.includes(tag.id) && !dispPosts.map(d => d.id).includes(p.id)) {
                      dispPosts.push(p)
                    }
                  })
                })
                setAttributes({ ...attributes, categories: newCats, sequence: dispPosts })
              }}
            />
          )) : "No categories found."}
        </PanelBody>
        <PanelBody title={__('Tags to display', 'gutenberg')} initialOpen>
          {availableTags ? availableTags.map((seq, i) => (
            <CheckboxControl
              label={seq.title}
              checked={attributes.tags.map((p, i) => p.title).includes(seq.title)}
              onChange={() => {
                var dispPosts = []
                var newTags = [...attributes.tags.filter(p => p.title !== "empty")]
                var existingCats = [...attributes.categories.filter(p => p.title !== "empty")]
                if (newTags.map(p => p.id).includes(seq.id)) {
                  newTags = newTags.slice(newTags.findIndex(c => c.id === seq.id), 1)
                } else {
                  newTags.push(seq)
                }
                posts.map(p => {
                  newTags.map(tag => {
                    if (p.tags.includes(tag.id) && !dispPosts.map(d => d.id).includes(p.id)) {
                      dispPosts.push(p)
                    }
                  })
                  existingCats.map(cat => {
                    if (p.categories.includes(cat.id) && !dispPosts.map(d => d.id).includes(p.id)) {
                      dispPosts.push(p)
                    }
                  })
                })
                setAttributes({ ...attributes, tags: newTags, sequence: dispPosts })
              }}
            />
          )) : "No categories found."}
        </PanelBody>
      </InspectorControls>
    </div>
  )
}
