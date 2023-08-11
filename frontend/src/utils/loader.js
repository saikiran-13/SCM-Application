import React from 'react'

const Loader = () => {
  return (
    <div
    class="inline-block h-5 w-5 mr-4 my-auto animate-spin rounded-full border-4 border-solid border-current border-r-creamblue align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"
  >
    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
  )
}

export default Loader