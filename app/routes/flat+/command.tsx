import {
	CalendarIcon,
	FileIcon,
	LaptopIcon,
	MailIcon,
	SettingsIcon,
	SmileIcon,
	UserIcon,
} from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Button } from "~/components/flat/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "~/components/flat/command";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/command";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/command.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["cmdk"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<ComponentPage name="Command" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-col items-start gap-6">
				<p className="text-sm text-muted-foreground">
					Press{" "}
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>K
					</kbd>{" "}
					to open the command menu
				</p>

				<Button
					onClick={() => setOpen(true)}
					className="w-60 justify-between text-sm text-muted-foreground"
				>
					<span>Search documentation...</span>
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>K
					</kbd>
				</Button>

				<div className="border p-4 rounded-md w-full max-w-sm">
					<Command className="rounded-lg border shadow-md">
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading="Suggestions">
								<CommandItem>
									<CalendarIcon className="mr-2 h-4 w-4" />
									<span>Calendar</span>
								</CommandItem>
								<CommandItem>
									<SmileIcon className="mr-2 h-4 w-4" />
									<span>Search Emoji</span>
								</CommandItem>
								<CommandItem>
									<LaptopIcon className="mr-2 h-4 w-4" />
									<span>Calculator</span>
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Settings">
								<CommandItem>
									<UserIcon className="mr-2 h-4 w-4" />
									<span>Profile</span>
									<CommandShortcut>⌘P</CommandShortcut>
								</CommandItem>
								<CommandItem>
									<MailIcon className="mr-2 h-4 w-4" />
									<span>Mail</span>
									<CommandShortcut>⌘B</CommandShortcut>
								</CommandItem>
								<CommandItem>
									<SettingsIcon className="mr-2 h-4 w-4" />
									<span>Settings</span>
									<CommandShortcut>⌘S</CommandShortcut>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			</div>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<CalendarIcon className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<SmileIcon className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<LaptopIcon className="mr-2 h-4 w-4" />
							<span>System</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<UserIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<FileIcon className="mr-2 h-4 w-4" />
							<span>Documents</span>
							<CommandShortcut>⌘D</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<SettingsIcon className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</ComponentPage>
	);
}
