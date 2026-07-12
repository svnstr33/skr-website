import { useState } from 'react'
import { FiHeart, FiMaximize2, FiMinimize2, FiX } from 'react-icons/fi'

const galleryItems = Array.from({ length: 15 }, (_, index) => ({ id: index + 1, title: `Image ${String(index + 1).padStart(2, '0')}` }))

export function GalleryPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [likedImages, setLikedImages] = useState<number[]>([])
  const [halfView, setHalfView] = useState(false)
  const activeItem = galleryItems.find((item) => item.id === activeImage)
  const toggleLike = (id: number) => setLikedImages((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const viewImage = (id: number) => { setActiveImage(id); setHalfView(false) }

  return <main className="gallery-page" aria-labelledby="gallery-page-title">
    <section className="gallery-intro"><p className="eyebrow">SKR Visual Library</p><h1 id="gallery-page-title">Factory &amp; product gallery</h1><p>Add approved factory, machinery, product, inspection and dispatch images to these 15 image slots.</p></section>
    <section className="gallery-browser-grid" aria-label="Gallery image placeholders">{galleryItems.map((item) => { const liked = likedImages.includes(item.id); return <article className="gallery-tile" key={item.id}><button type="button" className="gallery-image-placeholder" onClick={() => viewImage(item.id)} aria-label={`View ${item.title}`}><span>SKR</span><small>{item.title}</small><em>Add image</em></button><div className="gallery-tile-actions"><button type="button" onClick={() => toggleLike(item.id)} className={liked ? 'liked' : ''}><FiHeart /><span>{liked ? 'Liked' : 'Like'}</span></button><button type="button" onClick={() => viewImage(item.id)}><FiMaximize2 /><span>View</span></button></div></article> })}</section>
    {activeItem && <div className="gallery-viewer" role="dialog" aria-modal="true" aria-label={`${activeItem.title} viewer`} onMouseDown={() => setActiveImage(null)}><div className={`gallery-viewer-panel ${halfView ? 'half-view' : ''}`} onMouseDown={(event) => event.stopPropagation()}><div className="gallery-viewer-placeholder"><span>SKR</span><strong>{activeItem.title}</strong><small>Add the approved image for this slot</small></div><div className="gallery-viewer-controls"><button type="button" onClick={() => setHalfView((current) => !current)}>{halfView ? <FiMaximize2 /> : <FiMinimize2 />}<span>{halfView ? 'Full screen' : 'Half screen'}</span></button><button type="button" onClick={() => toggleLike(activeItem.id)} className={likedImages.includes(activeItem.id) ? 'liked' : ''}><FiHeart /><span>{likedImages.includes(activeItem.id) ? 'Liked' : 'Like'}</span></button><button type="button" onClick={() => setActiveImage(null)}><FiX /><span>Close</span></button></div></div></div>}
  </main>
}
