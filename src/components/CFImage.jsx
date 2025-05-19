import React from 'react'

function CFImage({src, alt, className, width="100%", height, loading="lazy"}) {
  return (
    <div className={className}>
      <img src={src} alt={alt} style={{ width: width, height: height }} loading={loading}/>
    </div>
  ) 
}

export default CFImage
