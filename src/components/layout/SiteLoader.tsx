import logo from '../../../public/skr.png'

type SiteLoaderProps = { visible: boolean }

export function SiteLoader({ visible }: SiteLoaderProps) {
  return <div className={`site-loader ${visible ? 'site-loader-visible' : ''}`} aria-hidden={!visible} aria-busy={visible}>
    <div className="site-loader-mark"><span className="site-loader-orbit" /><img src={logo} alt="" /></div>
    <span className="site-loader-label">Preparing SKR experience</span>
  </div>
}
