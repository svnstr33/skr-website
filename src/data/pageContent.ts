import type { PageContentMap } from '../types'

export const pageContent: PageContentMap = {
  capabilities: {
    eyebrow: 'Manufacturing Capabilities', title: 'Precision machining for controlled production.',
    description: 'Our capabilities are centred around precision machining processes supported by CNC, VMC, EDM and specialised purpose machines.',
    imageLabel: 'SKR manufacturing capabilities', imageNote: 'A clear view of the people, processes and equipment behind each requirement.',
    stats: [['CNC', 'Precision machining'], ['VMC', 'Controlled production'], ['EDM', 'Technical capability']],
    overviewTitle: 'Built for repeatable quality', overview: 'We manufacture from technical drawings, customer samples and custom specifications, with process planning designed for tight tolerances, efficient workflow and reliable output.',
    cards: [
      { meta: 'CNC', title: 'CNC machining', body: 'Precision machining for consistent, drawing-led metal components.' },
      { meta: 'VMC', title: 'VMC systems', body: 'Controlled multi-operation machining for accurate production output.' },
      { meta: 'EDM', title: 'EDM technology', body: 'Technical machining support for specialised component requirements.' },
      { meta: 'SPM', title: 'Specialised purpose machines', body: 'Efficient processing for bulk production and customised manufacturing.' },
    ],
    processTitle: 'How capability becomes output', process: [
      { meta: '01', title: 'Understand the requirement', body: 'Review drawings, samples, application, quantities and technical expectations.' },
      { meta: '02', title: 'Plan the process', body: 'Select the suitable production route, tooling, quality checks and delivery approach.' },
      { meta: '03', title: 'Execute with control', body: 'Coordinate manufacturing, verification and dispatch around the approved requirement.' },
    ], cta: 'Have a manufacturing requirement? Share the details with the SKR team.'
  },
  resources: {
    eyebrow: 'Resources', title: 'Useful information for every stage of your enquiry.',
    description: 'Explore client collaboration, manufacturing insights, company updates, career opportunities and approved documents in one place.',
    imageLabel: 'SKR resource centre', imageNote: 'Information structured to help customers, applicants and partners reach the right next step.',
    stats: [['05', 'Resource areas'], ['Official', 'Company updates'], ['B2B', 'Enquiry support']],
    overviewTitle: 'Clear information, useful next steps', overview: 'Each resource is organised to help you understand SKR, prepare a requirement, request the right document or connect with the relevant team.',
    cards: [
      { meta: 'Partnerships', title: 'Clients', body: 'Approved client relationships, collaboration stories and export-oriented support.' },
      { meta: 'Insights', title: 'Blog', body: 'Practical notes on engineering enquiries, quality and component manufacturing.' },
      { meta: 'Updates', title: 'News & events', body: 'Official capability updates, milestones, industry participation and notices.' },
      { meta: 'Opportunities', title: 'Careers & downloads', body: 'Current role information and requests for approved company and technical documents.' },
    ],
    processTitle: 'Find what you need', process: [
      { meta: '01', title: 'Choose a resource', body: 'Open the category that best fits your enquiry, application or information need.' },
      { meta: '02', title: 'Review approved details', body: 'Use the listed information to prepare a clear next step or request.' },
      { meta: '03', title: 'Contact the right team', body: 'Share your requirement, document request or application through SKR contact channels.' },
    ], cta: 'Need information that is not listed here? Contact SKR and we will guide you.'
  },
  division: {
    eyebrow: 'Our Divisions', title: 'Choose your specialist manufacturing partner.',
    description: 'Two independent divisions give your enquiry direct access to the expertise, processes and production approach it needs.',
    imageLabel: 'SKR specialist divisions', imageNote: 'Umbrella components and precision engineering under one group.',
    stats: [['02', 'Independent divisions'], ['01', 'Shared quality standard'], ['B2B', 'Manufacturing partner']],
    overviewTitle: 'Focused capability, connected by SKR', overview: 'Each division operates with a distinct manufacturing focus while being supported by the same commitment to practical planning, responsive communication and quality-aware execution.',
    cards: [
      { meta: 'Division 01', title: 'Umbrella Components', body: 'Ribs, frames, shafts, stretchers and assembly components for umbrella systems and custom requirements.' },
      { meta: 'Division 02', title: 'Vishwakarma Engineering', body: 'Precision components, metal fabrication and drawing-led industrial manufacturing support.' },
    ],
    processTitle: 'The right path for your requirement', process: [
      { meta: '01', title: 'Choose a division', body: 'Start with the specialist focus that best fits your product or drawing.' },
      { meta: '02', title: 'Share technical details', body: 'Provide material, quantity, dimensions, application and relevant specifications.' },
      { meta: '03', title: 'Build the plan', body: 'The relevant team reviews production, quality and delivery needs with you.' },
    ], cta: 'Not sure which division is right for you? Our team can guide your enquiry.'
  },
  products: {
    eyebrow: 'Manufacturing Range', title: 'Products built for dependable performance.',
    description: 'Explore umbrella frames and precision-machined metal components manufactured for industrial applications and custom requirements.',
    imageLabel: 'Product range photograph', imageNote: 'Add a clean product line-up or component close-up here.',
    stats: [['02', 'Specialised divisions'], ['B2B', 'Enquiry support'], ['QC', 'Inspection-led process']],
    overviewTitle: 'What we manufacture', overview: 'Our Umbrella Division produces 2 Fold, 3 Fold, Solid, Piano and Golf umbrella frames. Our Engineering & Hardware Division produces precision metal components using CNC, VMC, EDM and specialised machinery.',
    cards: [
      { meta: 'Umbrella Division', title: 'Umbrella frames', body: '2 Fold, 3 Fold, Solid, Piano and Golf frames designed for strength, flexibility and durability.' },
      { meta: 'Engineering & Hardware', title: 'Industrial components', body: 'ATM, printer, valve, control panel, pressure gauge and hardware joinery components.' },
      { meta: 'Custom Manufacturing', title: 'Engineered to specification', body: 'Production based on technical drawings, customer samples and custom specifications.' },
    ],
    processTitle: 'How an enquiry moves forward', process: [
      { meta: '01', title: 'Requirement review', body: 'We understand the drawing, sample, application, quantity and finish expectations.' },
      { meta: '02', title: 'Process planning', body: 'The relevant division reviews feasibility, tooling and quality checkpoints.' },
      { meta: '03', title: 'Production support', body: 'Approved requirements are planned for manufacture, inspection and dispatch coordination.' },
    ], cta: 'Need a component or manufacturing quote? Send your requirement to our team.'
  },
  gallery: {
    eyebrow: 'SKR Visual Library', title: 'A look inside our manufacturing environment.',
    description: 'This gallery is structured for real factory, machinery, product, inspection and dispatch photographs. Replace each labelled panel with approved original images.',
    imageLabel: 'Factory exterior photograph', imageNote: 'Add an approved factory exterior or reception image here.',
    stats: [['06', 'Image placements'], ['100%', 'Original photography'], ['01', 'Brand-consistent library']],
    overviewTitle: 'Recommended photography', overview: 'Use well-lit, high-resolution photographs that show actual operations, products and people. Avoid stock imagery so prospective customers can understand the real working environment.',
    cards: [
      { meta: 'Image 01', title: 'Production floor', body: 'Wide view of active manufacturing workstations and material flow.' },
      { meta: 'Image 02', title: 'Machinery & tooling', body: 'Close-ups of relevant equipment, tooling and production setup.' },
      { meta: 'Image 03', title: 'Quality inspection', body: 'Approved inspection, measuring or in-process quality checks.' },
      { meta: 'Image 04', title: 'Finished products', body: 'Clean product close-ups against a consistent background.' },
      { meta: 'Image 05', title: 'Packing & dispatch', body: 'Dispatch-ready packaging and organised loading operations.' },
      { meta: 'Image 06', title: 'Team at work', body: 'Professional team and customer-visit photographs with consent.' },
    ],
    processTitle: 'Gallery publishing standard', process: [
      { meta: '01', title: 'Select', body: 'Choose current, clear photographs that represent actual capabilities.' },
      { meta: '02', title: 'Approve', body: 'Verify safety, customer confidentiality and brand approval before upload.' },
      { meta: '03', title: 'Publish', body: 'Use concise captions that explain the process or product shown.' },
    ], cta: 'Have approved factory images ready? They can be placed directly into these panels.'
  },
  news: {
    eyebrow: 'Company Updates', title: 'News, milestones and industry activity.',
    description: 'A dedicated space for official company announcements. Until verified updates are available, this page clearly shows the types of information that can be published.',
    imageLabel: 'News or event photograph', imageNote: 'Add an approved event, customer visit or company announcement image here.',
    stats: [['Official', 'Updates only'], ['Events', 'Industry participation'], ['Quality', 'Certification notices']],
    overviewTitle: 'Keep customers informed', overview: 'Use this page for dated, factual announcements: new capabilities, plant developments, exhibitions, customer visits, certifications and important business milestones.',
    cards: [
      { meta: 'Update format', title: 'Company announcements', body: 'Incorporation milestones, facility developments and official business announcements.' },
      { meta: 'Update format', title: 'Capability updates', body: 'New machinery, product categories, tooling or process improvements once confirmed.' },
      { meta: 'Update format', title: 'Events & visits', body: 'Trade fairs, customer visits, supplier meets and other industry participation.' },
    ],
    processTitle: 'Publishing an update', process: [
      { meta: '01', title: 'Confirm facts', body: 'Use the event date, correct names and approved information only.' },
      { meta: '02', title: 'Prepare assets', body: 'Pair a short announcement with a relevant approved photograph.' },
      { meta: '03', title: 'Share clearly', body: 'Publish the update with a concise title and an enquiry contact where needed.' },
    ], cta: 'For current business enquiries or announcements, contact SKR directly.'
  },
  'umbrella-manufacturing': {
    eyebrow: 'Division 01', title: 'Umbrella Manufacturing',
    description: 'We manufacture umbrella ribs and frames in 2 Fold, 3 Fold, Solid, Piano and Golf configurations for large-scale production environments.',
    imageLabel: 'Umbrella manufacturing photograph', imageNote: 'Add an approved frame, component or assembly-line photograph here.',
    stats: [['01', 'Dedicated division'], ['Fit', 'Component focus'], ['Finish', 'Quality attention']],
    overviewTitle: 'Strength, flexibility and smooth function', overview: 'Our umbrella products are designed for durability, functional consistency and dependable performance across standard and custom manufacturing requirements.',
    cards: [
      { meta: 'Frame Types', title: 'Multiple configurations', body: '2 Fold, 3 Fold, Solid, Piano and Golf umbrella frame configurations.' },
      { meta: 'Performance', title: 'Built to perform', body: 'Products developed for strength, flexibility, durability and smooth operation.' },
      { meta: 'Production', title: 'Large-scale manufacturing', body: 'Controlled production support for repeatable output and batch consistency.' },
    ],
    processTitle: 'Division workflow', process: [
      { meta: '01', title: 'Share the requirement', body: 'Send samples, drawings, specifications or a clear product brief.' },
      { meta: '02', title: 'Review feasibility', body: 'We review the component, production need and applicable quality requirements.' },
      { meta: '03', title: 'Plan supply', body: 'Once agreed, the team coordinates the manufacturing and delivery approach.' },
    ], cta: 'Discuss your umbrella component requirement with the SKR team.'
  },
  'vishwakarma-engineering': {
    eyebrow: 'Division 02', title: 'Vishwakarma Engineering',
    description: 'Precision-machined metal components for industrial applications, manufactured using CNC, VMC, EDM and specialised purpose machines.',
    imageLabel: 'Engineering workshop photograph', imageNote: 'Add an approved machinery, fabrication or metal-component photograph here.',
    stats: [['01', 'Engineering division'], ['Drawing', 'Requirement-led review'], ['Metal', 'Manufacturing support']],
    overviewTitle: 'Engineering & hardware manufacturing', overview: 'We produce ATM machine parts, printer components, valve fittings, control panel components, pressure gauge meter parts, hardware joineries and custom engineered components.',
    cards: [
      { meta: 'Machining', title: 'CNC, VMC & EDM', body: 'Precision machining technologies for dimensional accuracy and repeatability.' },
      { meta: 'Products', title: 'Industrial applications', body: 'Components for ATM machines, printers, valve systems, panels and instrumentation.' },
      { meta: 'Custom Work', title: 'Made to requirement', body: 'Manufacturing based on drawings, samples and custom technical specifications.' },
    ],
    processTitle: 'Engineering enquiry process', process: [
      { meta: '01', title: 'Technical brief', body: 'Provide drawings, material, dimensions, use case and expected quantity.' },
      { meta: '02', title: 'Manufacturing review', body: 'The team considers a practical method, quality needs and delivery expectations.' },
      { meta: '03', title: 'Quote & execution', body: 'Proceed after requirement alignment and commercial confirmation.' },
    ], cta: 'Have a drawing or metal component requirement? Start an engineering enquiry.'
  },
}
