import { CopyIcon, GlobeIcon, MoonIcon, SunIcon } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "~/components/flat/context-menu";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/context-menu";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/context-menu.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-context-menu"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
	const [urlsChecked, setUrlsChecked] = React.useState(false);
	const [theme, setTheme] = React.useState("system");

	return (
		<ComponentPage
			name="Context Menu"
			dependencies={loaderData.dependencies}
			code={loaderData.code}
		>
			<div className="flex justify-center">
				<ContextMenu>
					<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
						Right click here
					</ContextMenuTrigger>
					<ContextMenuContent className="w-64">
						<ContextMenuItem inset>
							Back
							<ContextMenuShortcut>⌘[</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuItem inset disabled>
							Forward
							<ContextMenuShortcut>⌘]</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuItem inset>
							Reload
							<ContextMenuShortcut>⌘R</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuSub>
							<ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
							<ContextMenuSubContent className="w-48">
								<ContextMenuItem>
									<CopyIcon className="mr-2 h-4 w-4" />
									Copy
									<ContextMenuShortcut>⌘C</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem>
									<GlobeIcon className="mr-2 h-4 w-4" />
									View Page Source
									<ContextMenuShortcut>⌘U</ContextMenuShortcut>
								</ContextMenuItem>
							</ContextMenuSubContent>
						</ContextMenuSub>
						<ContextMenuSeparator />
						<ContextMenuCheckboxItem
							checked={bookmarksChecked}
							onCheckedChange={setBookmarksChecked}
						>
							Show Bookmarks
							<ContextMenuShortcut>⌘B</ContextMenuShortcut>
						</ContextMenuCheckboxItem>
						<ContextMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
							Show Full URLs
						</ContextMenuCheckboxItem>
						<ContextMenuSeparator />
						<ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
							<ContextMenuLabel inset>Theme</ContextMenuLabel>
							<ContextMenuRadioItem value="system">
								<SunIcon className="mr-2 h-4 w-4" />
								System
							</ContextMenuRadioItem>
							<ContextMenuRadioItem value="light">
								<SunIcon className="mr-2 h-4 w-4" />
								Light
							</ContextMenuRadioItem>
							<ContextMenuRadioItem value="dark">
								<MoonIcon className="mr-2 h-4 w-4" />
								Dark
							</ContextMenuRadioItem>
						</ContextMenuRadioGroup>
					</ContextMenuContent>
				</ContextMenu>
			</div>
		</ComponentPage>
	);
}
