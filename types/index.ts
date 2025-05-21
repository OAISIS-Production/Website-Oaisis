export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface CaseStudy {
  icon: JSX.Element;
  industry: string;
  company: string;
  result: string;
  description: string;
  image: string;
  color: string;
}