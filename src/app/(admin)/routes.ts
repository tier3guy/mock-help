import {
    User,
    Users,
    Radio,
    Layers,
    LogOut,
    Headset,
    Settings,
    Calendar,
    HelpCircle,
    CalendarCheck,
    LayoutDashboard
} from "lucide-react";

export const Routes = [
    {
      "title": "Overview",
      "icon": "layout-dashboard",
      "route": "/admin/overview"
    },
    {
      "title": "Student Manager",
      "icon": "users",
      "route": "/admin/students",
      "subMenu": [
        { "title": "Manage Batches",        "route": "/admin/students/batches"       },
        { "title": "Enroll Student",        "route": "/admin/students/enroll"        },
        { "title": "Bulk Enrolment",        "route": "/admin/students/bulk"          },
        { "title": "View All Students",     "route": "/admin/students/all"           },
        { "title": "Request Profile Photo", "route": "/admin/students/request-profile-photo" }
      ]
    },
    {
      "title": "Test Manager",
      "icon": "calendar-check",
      "route": "/admin/tests"
    },
    {
      "title": "Course Manager",
      "icon": "layers",
      "route": "/admin/courses",
      "subMenu": [
        { "title": "All Courses",           "route": "/admin/courses/all"     },
        { "title": "Upload New Course",     "route": "/admin/courses/upload"  }
      ]
    },
    {
      "title": "Live Class",
      "icon": "radio",
      "route": "/admin/live"
    },
    {
      "title": "Staff Manager",
      "icon": "user",
      "route": "/admin/staff"
    },
    {
      "title": "Calendar",
      "icon": "calendar",
      "route": "/admin/calendar"
    },
    {
      "title": "Leads",
      "icon": "headset",
      "route": "/admin/leads"
    },
    {
      "title": "Help Desk",
      "icon": "help-circle",
      "route": "/admin/help"
    },
    {
      "title": "Settings",
      "icon": "settings",
      "route": "/admin/settings"
    }
];

export type TRoutes = typeof Routes;

export const IconMap = {
    "layout-dashboard":   LayoutDashboard,
    "users":              Users,
    "calendar-check":     CalendarCheck,
    "layers":             Layers,
    "radio":              Radio,
    "user":               User,
    "calendar":           Calendar,
    "headset":            Headset,
    "help-circle":        HelpCircle,
    "settings":           Settings,
    "log-out":            LogOut,
    "default":            LayoutDashboard // Fallback Icon
};

export type TIconKey = keyof typeof IconMap;
