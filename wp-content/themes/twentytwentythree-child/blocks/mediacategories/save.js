import { useBlockProps } from '@wordpress/block-editor'

export default function save(props) {
  const blockProps = useBlockProps.save({
    className: 'categories',
  })

  return (
    <div {...blockProps}>
      {props.attributes.categories ? <h2>Categories</h2> : null}

      {props.attributes.categories ? (
        <div className='category_selector'>
          {props.attributes.categories.map((seq, i) => (
            <a href={seq.source_url} data-catid={seq.id}>{seq.title}</a>
          ))}
        </div>
      ) : "No categories found."}

      {props.attributes.sequence &&
        <div className='videos'>
          {props.attributes.sequence.map((seq, i) => (
            <video width='320' height='240' class={`overlay w-100 ${i !== 0 ? "hidden" : ""}`} autoPlay={i === 0} muted preload data-seqcatid={JSON.stringify(seq.categories)}>
              <source src={seq.source_url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      }
    </div>
  )
}
