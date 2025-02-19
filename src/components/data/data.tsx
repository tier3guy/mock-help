import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  CircleX,
  Clock,
  Eye,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "flagged",
    label: "flagged",
    icon: CircleX,
  },
  {
    value: "approved",
    label: "approved",
    icon: Check,
  },
  {
    value: "inreview",
    label: "inreview",
    icon: Eye,
  },
  {
    value: "pending",
    label: "pending",
    icon: Clock,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];
