import {
  BadgeCheck,
  Briefcase,
  Building,
  Building2,
  Bus,
  Car,
  FileBadge,
  FileText,
  HeartPulse,
  Home,
  Hospital,
  IdCard,
  Landmark,
  Languages,
  Plane,
  Receipt,
  Scale,
  ScrollText,
  Shield,
  Smartphone,
  Stamp,
  Stethoscope,
  Ticket,
  Users,
} from "lucide-react";

const icons = {
  BadgeCheck,
  Briefcase,
  Building,
  Building2,
  Bus,
  Car,
  FileBadge,
  FileText,
  HeartPulse,
  Home,
  Hospital,
  IdCard,
  Landmark,
  Languages,
  Plane,
  Receipt,
  Scale,
  ScrollText,
  Shield,
  Smartphone,
  Stamp,
  Stethoscope,
  Ticket,
  Users,
};

export default function Icon({ name, ...props }) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component aria-hidden="true" strokeWidth={1.75} {...props} />;
}
