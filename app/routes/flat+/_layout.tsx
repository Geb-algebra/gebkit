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

export default function Home() {
	const location = useLocation();
	const { theme, setTheme } = useTheme();
	return (
		<div className={cn(styles.layout, "w-full h-full bg-background", theme === "dark" && "dark")}>
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
					<Link to={location.pathname.split("flat").join("neumorphism")}>Neumorphic</Link>
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
					"bg-background backdrop-blur-sm",
					"border-r border-border/50",
					styles.sidebar,
				)}
			>
				<NavLink to="/flat/button">Button</NavLink>
			</nav>
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}
