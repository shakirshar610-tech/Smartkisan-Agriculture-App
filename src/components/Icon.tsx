import {
  Sprout,
  Wheat,
  Droplets,
  Leaf,
  Thermometer,
  Sun,
  CloudRain,
  Recycle,
  Scissors,
  Eye,
  Shovel,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  cotton: Sprout,
  wheat: Wheat,
  rice: Leaf,
  soil: Shovel,
  rotate: Recycle,
  seed: Sprout,
  water: Droplets,
  weed: Scissors,
  harvest: Sun,
  compost: CloudRain,
  scout: Eye,
  temperature: Thermometer,
  season: Sun,
  waterNeeds: Droplets,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Cmp = iconMap[name] ?? Leaf;
  return <Cmp className={className} />;
}
