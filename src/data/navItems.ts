import type { NavItem } from '../types'

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#profile' },
  {
    label: 'Division',
    href: '#division',
    children: [
      { label: 'Umbrella Manufacturing', href: '#umbrella-manufacturing' },
      { label: 'Engineering', href: '#vishwakarma-engineering' },
    ],
  },
  { label: 'Products', href: '#products' },
  {
    label: 'Capabilities',
    href: '#capabilities',
    children: [
      { label: 'Manufacturing Facility', href: '#manufacturing' },
      { label: 'Infrastructure', href: '#infrastructure' },
      { label: 'Machinery', href: '#machinery' },
      { label: 'Quality Assurance', href: '#quality' },
      { label: 'Certifications', href: '#certifications' },
      { label: 'Industries Served', href: '#industries' },
    ],
  },
  { label: 'Gallery', href: '#gallery' },
  {
    label: 'Resources',
    href: '#resources',
    children: [
      { label: 'Clients', href: '#clients' },
      { label: 'Blog', href: '#blog' },
      { label: 'News & Events', href: '#news' },
      { label: 'Careers', href: '#careers' },
      { label: 'Downloads', href: '#downloads' },
    ],
  },
  { label: 'Contact', href: '#contact' },
]
