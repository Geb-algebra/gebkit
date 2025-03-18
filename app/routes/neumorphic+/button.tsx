import { BookmarkIcon, EyeIcon, InfoIcon, LinkIcon, SendIcon, Trash2Icon } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Label } from "~/components/flat/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/flat/select";
import { Button } from "~/components/neumorphic/button";
import ComponentPage from "~/components/page/ComponentPageNeumo";
import type { Route } from "./+types/button";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/neumorphic/button.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [args, setArgs] = React.useState<{
		size: "default" | "sm" | "lg" | "icon";
	}>({
		size: "default",
	});

	const isIconSize = args.size === "icon";

	function ArgsSetter() {
		return (
			<div className="flex flex-col gap-y-2">
				<Label>Size</Label>
				<Select
					value={args.size}
					onValueChange={(value) =>
						setArgs({ ...args, size: value as "default" | "sm" | "lg" | "icon" })
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a size" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="default">Default</SelectItem>
						<SelectItem value="sm">Small</SelectItem>
						<SelectItem value="lg">Large</SelectItem>
						<SelectItem value="icon">Icon</SelectItem>
					</SelectContent>
				</Select>
			</div>
		);
	}

	return (
		<ComponentPage
			name="Button"
			dependencies={loaderData.dependencies}
			code={loaderData.code}
			ArgsSetter={<ArgsSetter />}
		>
			<div className="grid grid-cols-2 gap-y-6 gap-x-4">
				<Button size={args.size} variant="default">
					{isIconSize ? <SendIcon className="h-4 w-4" /> : "Default Button"}
				</Button>
				<Button size={args.size} variant="default" disabled>
					{isIconSize ? <SendIcon className="h-4 w-4" /> : "Default Button"}
				</Button>
				<Button size={args.size} variant="destructive">
					{isIconSize ? <Trash2Icon className="h-4 w-4" /> : "Destructive Button"}
				</Button>
				<Button size={args.size} variant="destructive" disabled>
					{isIconSize ? <Trash2Icon className="h-4 w-4" /> : "Destructive Button"}
				</Button>
				<Button size={args.size} variant="outline">
					{isIconSize ? <BookmarkIcon className="h-4 w-4" /> : "Outline Button"}
				</Button>
				<Button size={args.size} variant="outline" disabled>
					{isIconSize ? <BookmarkIcon className="h-4 w-4" /> : "Outline Button"}
				</Button>
				<Button size={args.size} variant="secondary">
					{isIconSize ? <InfoIcon className="h-4 w-4" /> : "Secondary Button"}
				</Button>
				<Button size={args.size} variant="secondary" disabled>
					{isIconSize ? <InfoIcon className="h-4 w-4" /> : "Secondary Button"}
				</Button>
				<Button size={args.size} variant="ghost">
					{isIconSize ? <EyeIcon className="h-4 w-4" /> : "Ghost Button"}
				</Button>
				<Button size={args.size} variant="ghost" disabled>
					{isIconSize ? <EyeIcon className="h-4 w-4" /> : "Ghost Button"}
				</Button>
				<Button size={args.size} variant="link">
					{isIconSize ? <LinkIcon className="h-4 w-4" /> : "Link Button"}
				</Button>
				<Button size={args.size} variant="link" disabled>
					{isIconSize ? <LinkIcon className="h-4 w-4" /> : "Link Button"}
				</Button>
			</div>
		</ComponentPage>
	);
}
