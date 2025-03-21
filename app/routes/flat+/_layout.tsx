import { MoonIcon, SunIcon } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Button } from "~/components/flat/button";
import { Switch } from "~/components/flat/switch";
import { cn } from "~/utils/css";
import { useTheme } from "../../context";
import styles from "../.layout/_layout.module.css";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

function StyledNavLink(props: { name: string }) {
	const linkName = props.name.toLowerCase().replace(/ /g, "-");
	return (
		<NavLink
			to={`/flat/${linkName}`}
			className={({ isActive }) =>
				cn(
					isActive && "bg-accent",
					"active:bg-accent/50 w-full h-10 rounded-md grid items-center px-4",
				)
			}
		>
			{props.name}
		</NavLink>
	);
}

const components = [
	"Accordion",
	"Alert",
	"Aspect Ratio",
	"Avatar",
	"Badge",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Carousel",
	"Checkbox",
	"Collapsible",
	"Command",
	"Context Menu",
	"Dialog",
	"Drawer",
	"Dropdown Menu",
	"Hover Card",
	"Input",
	"Input OTP",
	"Menubar",
	"Navigation Menu",
	"Pagination",
	"Popover",
	"Radio Group",
	"Scroll Area",
	"Select",
	"Separator",
	"Sheet",
	"Skeleton",
	"Slider",
	"Sonner",
	"Switch",
	"Table",
	"Tabs",
	"Textarea",
	"Toggle",
	"Tooltip",
];

export default function Home() {
	const location = useLocation();
	const { theme, setTheme } = useTheme();
	return (
		<div className={cn(styles.layout, "w-full h-full", theme === "dark" && "dark")}>
			<header
				className={cn(
					"bg-background backdrop-blur-sm",
					"border-b border-border/50",
					"px-4 sm:px-6",
					styles.header,
				)}
			>
				<h1 className={cn("text-lg font-semibold", styles.title)}>GebKit</h1>
				<Button variant="ghost" asChild>
					<Link to={location.pathname.split("flat").join("neumorphic")}>Neumorphic</Link>
				</Button>
				<div className="flex items-center space-x-2">
					<SunIcon size={16} />
					<Switch
						id="airplane-mode"
						checked={theme === "dark"}
						onCheckedChange={(checked) => {
							setTheme(checked ? "dark" : "light");
						}}
					/>
					<MoonIcon size={16} />
				</div>
			</header>
			<nav
				className={cn(
					"bg-background backdrop-blur-sm w-42 p-2 overflow-auto",
					"border-r border-border",
					styles.sidebar,
				)}
			>
				{components.map((component) => (
					<StyledNavLink key={component} name={component} />
				))}
			</nav>
			<main className={cn(styles.main, "overflow-auto")}>
				<Outlet />
			</main>
		</div>
	);
}
