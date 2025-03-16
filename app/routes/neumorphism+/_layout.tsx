import { Outlet } from "react-router";
import { useTheme } from "~/context";
import { cn } from "~/utils/css";
import styles from "../.layout/_layout.module.css";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
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
			</header>
			<nav
				className={cn(
					"bg-background backdrop-blur-sm",
					"border-r border-border/50",
					styles.sidebar,
				)}
			>
				<div className={styles.sidebarHeader}>
					<h2 className={styles.sidebarTitle}>GebKit</h2>
				</div>
			</nav>
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}
