import { useMemo, useState } from 'react'
import { FiArrowUpRight, FiHeart, FiMaximize2, FiMinimize2, FiSearch, FiX } from 'react-icons/fi'
import engineeringImage from '../../assets/eng.jpeg'
import manufacturingImage from '../../assets/mix.jpg'
import umbrellaImage from '../../assets/umbrella.jpeg'
import facilityImage from '../../assets/tagline.jpeg'

type GalleryItem = {
  id: number
  title: string
  category: 'Factory' | 'Products' | 'Engineering' | 'Quality'
  image: string
  featured?: boolean
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Precision component finishing', category: 'Engineering', image: engineeringImage, featured: true },
  { id: 2, title: 'Umbrella frame production', category: 'Products', image: umbrellaImage },
  { id: 3, title: 'Integrated production floor', category: 'Factory', image: manufacturingImage },
  { id: 4, title: 'Final inspection workflow', category: 'Quality', image: facilityImage },
  { id: 5, title: 'Engineered metal components', category: 'Engineering', image: engineeringImage },
  { id: 6, title: 'Assembly-ready product range', category: 'Products', image: umbrellaImage, featured: true },
  { id: 7, title: 'Manufacturing operations', category: 'Factory', image: manufacturingImage },
  { id: 8, title: 'Quality control standards', category: 'Quality', image: facilityImage },
  { id: 9, title: 'Custom machining detail', category: 'Engineering', image: engineeringImage },
  { id: 10, title: 'Finished umbrella systems', category: 'Products', image: umbrellaImage },
  { id: 11, title: 'Production capacity overview', category: 'Factory', image: manufacturingImage },
  { id: 12, title: 'Approved material checks', category: 'Quality', image: facilityImage },
]

const filters = ['All', 'Factory', 'Products', 'Engineering', 'Quality'] as const

export function GalleryPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [likedImages, setLikedImages] = useState<number[]>([])
  const [halfView, setHalfView] = useState(false)
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [query, setQuery] = useState('')
  const visibleItems = useMemo(() => galleryItems.filter((item) => (filter === 'All' || item.category === filter) && item.title.toLowerCase().includes(query.toLowerCase())), [filter, query])
  const activeItem = galleryItems.find((item) => item.id === activeImage)
  const toggleLike = (id: number) => setLikedImages((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const viewImage = (id: number) => { setActiveImage(id); setHalfView(false) }

  return <main className="gallery-page gallery-page-advanced" aria-labelledby="gallery-page-title">
    <section className="gallery-intro gallery-intro-advanced">
      <div><p className="eyebrow">SKR Visual Library</p><h1 id="gallery-page-title">Inside the work that shapes every detail.</h1><p>A curated look at our factory floor, product systems, engineering work and quality process.</p></div>
      <div className="gallery-intro-metric"><b>{galleryItems.length}</b><span>Curated visual stories</span></div>
    </section>
    <section className="gallery-toolbar" aria-label="Gallery filters">
      <label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the gallery" aria-label="Search gallery" /></label>
      <div>{filters.map((item) => <button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
    </section>
    <p className="gallery-results"><b>{visibleItems.length}</b> visual {visibleItems.length === 1 ? 'story' : 'stories'} selected</p>
    <section className="gallery-browser-grid gallery-browser-advanced" aria-label="Gallery images">{visibleItems.map((item, index) => {
      const liked = likedImages.includes(item.id)
      return <article className={`gallery-tile gallery-tile-advanced ${item.featured ? 'gallery-tile-featured' : ''}`} key={item.id}>
        <button type="button" className="gallery-image-placeholder gallery-image-card" onClick={() => viewImage(item.id)} aria-label={`View ${item.title}`}><img src={item.image} alt="" /><span className="gallery-card-index">{String(index + 1).padStart(2, '0')}</span><span className="gallery-card-category">{item.category}</span><div className="gallery-card-copy"><small>{item.title}</small><em>View story <FiArrowUpRight /></em></div></button>
        <button type="button" className={`gallery-like-button ${liked ? 'liked' : ''}`} onClick={() => toggleLike(item.id)} aria-label={liked ? `Remove ${item.title} from favourites` : `Add ${item.title} to favourites`}><FiHeart /></button>
      </article>
    })}</section>
    {!visibleItems.length && <p className="gallery-empty">No images match this search. Try another category or search term.</p>}
    {activeItem && <div className="gallery-viewer" role="dialog" aria-modal="true" aria-label={`${activeItem.title} viewer`} onMouseDown={() => setActiveImage(null)}><div className={`gallery-viewer-panel ${halfView ? 'half-view' : ''}`} onMouseDown={(event) => event.stopPropagation()}><div className="gallery-viewer-placeholder gallery-viewer-image"><img src={activeItem.image} alt={activeItem.title} /><div><span>{activeItem.category}</span><strong>{activeItem.title}</strong><small>SKR Metal Industries visual library</small></div></div><div className="gallery-viewer-controls"><button type="button" onClick={() => setHalfView((current) => !current)}>{halfView ? <FiMaximize2 /> : <FiMinimize2 />}<span>{halfView ? 'Expand' : 'Compact'}</span></button><button type="button" onClick={() => toggleLike(activeItem.id)} className={likedImages.includes(activeItem.id) ? 'liked' : ''}><FiHeart /><span>{likedImages.includes(activeItem.id) ? 'Saved' : 'Save image'}</span></button><button type="button" onClick={() => setActiveImage(null)}><FiX /><span>Close</span></button></div></div></div>}
  </main>
}
