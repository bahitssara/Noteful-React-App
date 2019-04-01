import React from 'react'

export default function PageNav(props) {
  return (
    <div className='page-nav'>
      <button
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='back-button'
      > &#8592;
        <br />
        Back
      </button>
      {props.folder && (
        <h3 className='folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

PageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}