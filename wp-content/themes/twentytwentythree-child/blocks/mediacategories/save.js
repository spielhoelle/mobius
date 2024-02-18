import { useBlockProps } from '@wordpress/block-editor'

export default function save(props) {
  const blockProps = useBlockProps.save({
    className: 'categories',
  })
  return (
    <div {...blockProps}>
      {props.attributes.categories ? props.attributes.categories.map((seq, i) => (
        <div>
          <a href={seq.source_url} >{seq.title}</a>
        </div>
      )) : "No categories found."}
    </div>
  )
}
