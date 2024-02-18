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

  let options
  let cats = useSelect((select) => select('core').getEntityRecords('taxonomy', 'category'), [])

  if (cats) {
    options = cats
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

  return (
    <div {...blockProps}>
      {!attributes.categories || attributes.categories.length === 0 && (
        <h2>Select the videos for the loop</h2>
      )}
      {attributes.categories ? <h2>Categories</h2> : null}
      {attributes.categories ? attributes.categories.map((seq, i) => (
        <div>
          <a href={seq.source_url} >{seq.title}</a>
        </div>
      )) : "No categories found."}
      <InspectorControls>
        <PanelBody title={__('General', 'gutenberg')} initialOpen>
          {options ? options.map((seq, i) => (
            <CheckboxControl
              label={seq.title}
              help="Display this cat."
              checked={attributes.categories.map((p, i) => p.title).includes(seq.title)}
              onChange={() => {
                var newCats = [...attributes.categories]
                if (attributes.categories.map(p => p.id).includes(seq.id)) {
                  newCats = newCats.splice(attributes.categories.findIndex(c => c.id === seq.id), 1)
                } else {
                  newCats.push(seq)
                }
                console.log('newCats', newCats)
                setAttributes({ categories: newCats })
              }}
            />
          )) : "No categories found."}
        </PanelBody>
      </InspectorControls>
    </div>
  )
}
