import fs from "node:fs";
import path from "node:path";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "~/components/flat/menubar";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/menubar";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/menubar.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-menubar"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Menubar" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div>
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								New Tab <MenubarShortcut>⌘T</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								New Window <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem disabled>New Incognito Window</MenubarItem>
							<MenubarSeparator />
							<MenubarSub>
								<MenubarSubTrigger>Share</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Email link</MenubarItem>
									<MenubarItem>Messages</MenubarItem>
									<MenubarItem>Notes</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator />
							<MenubarItem>
								Print... <MenubarShortcut>⌘P</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								Cut <MenubarShortcut>⌘X</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Copy <MenubarShortcut>⌘C</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Paste <MenubarShortcut>⌘V</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								Select All <MenubarShortcut>⌘A</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
							<MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarItem inset>
								Reload <MenubarShortcut>⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarItem disabled inset>
								Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem inset>Toggle Fullscreen</MenubarItem>
							<MenubarSeparator />
							<MenubarItem inset>Hide Sidebar</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Profiles</MenubarTrigger>
						<MenubarContent>
							<MenubarRadioGroup value="benoit">
								<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
								<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
								<MenubarRadioItem value="luis">Luis</MenubarRadioItem>
							</MenubarRadioGroup>
							<MenubarSeparator />
							<MenubarItem inset>Edit...</MenubarItem>
							<MenubarSeparator />
							<MenubarItem inset>Add Profile...</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</div>
		</ComponentPage>
	);
}
