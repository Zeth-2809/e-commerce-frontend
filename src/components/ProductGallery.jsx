import { useState, useRef } from 'react'

function ProductGallery({ mainImage, images = [] }) {
  const allImages = [mainImage, ...images.filter(img => img !== mainImage)]
  const [selected, setSelected] = useState(allImages[0])
  const [zoomStyle, setZoomStyle] = useState({})
  const [isZooming, setIsZooming] = useState(false)
  const imgRef = useRef(null)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    })
  }

  return (
    <div>
      {/* Main Image with Zoom */}
      <div
        ref={imgRef}
        className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-900 cursor-zoom-in"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => {
          setIsZooming(false)
          setZoomStyle({})
        }}
        onMouseMove={handleMouseMove}
      >
        <img
          src={selected}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-200"
          style={isZooming ? zoomStyle : {}}
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(img)}
              className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition ${
                selected === img ? 'border-purple-500' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`thumbnail-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery