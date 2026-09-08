// Central icon registry. Components that look up an icon by name (from
// data files) import from here instead of `import * as Icons from
// "lucide-react"`, which would otherwise pull the entire icon set into the
// production bundle.
import {
  Code2,
  ShieldCheck,
  TestTubeDiagonal,
  GitBranch,
  CloudCog,
  LayoutDashboard,
  Users,
  MessagesSquare,
  BarChart3,
  Workflow,
  Radar,
  Atom,
  Server,
  Braces,
  Plug,
  Cloud,
  Lightbulb,
  Lock,
  BadgeCheck,
  Eye,
  HeartHandshake,
  GraduationCap,
  Cpu,
  Sparkles,
  Layers,
  Network,
} from "lucide-react";

export const iconMap = {
  Code2,
  ShieldCheck,
  TestTubeDiagonal,
  GitBranch,
  CloudCog,
  LayoutDashboard,
  Users,
  MessagesSquare,
  BarChart3,
  Workflow,
  Radar,
  Atom,
  Server,
  Braces,
  Plug,
  Cloud,
  Lightbulb,
  Lock,
  BadgeCheck,
  Eye,
  HeartHandshake,
  GraduationCap,
  Cpu,
  Sparkles,
  Layers,
  Network,
};

export function getIcon(name, fallback = Sparkles) {
  return iconMap[name] || fallback;
}
