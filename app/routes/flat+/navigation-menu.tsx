import fs from "node:fs";
import path from "node:path";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "~/components/flat/navigation-menu";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/navigation-menu";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/navigation-menu.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-navigation-menu", "class-variance-authority", "lucide-react"],
	};
}

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description: "For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Textarea" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<NavigationMenu>
					<NavigationMenuList>
						{components.map((component) => (
							<NavigationMenuItem key={component.title}>
								<NavigationMenuTrigger>{component.title}</NavigationMenuTrigger>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</ComponentPage>
	);
}
