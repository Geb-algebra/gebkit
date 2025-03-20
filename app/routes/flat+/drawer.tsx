import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Button } from "~/components/flat/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/flat/drawer";
import { Input } from "~/components/flat/input";
import { Label } from "~/components/flat/label";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/drawer";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/drawer.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["vaul"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [position, setPosition] = React.useState("bottom");

	return (
		<ComponentPage name="Drawer" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-col items-center gap-4">
				<div className="flex gap-4">
					<Button
						variant="outline"
						onClick={() => setPosition("left")}
						className={position === "left" ? "border-primary" : ""}
					>
						Left
					</Button>
					<Button
						variant="outline"
						onClick={() => setPosition("top")}
						className={position === "top" ? "border-primary" : ""}
					>
						Top
					</Button>
					<Button
						variant="outline"
						onClick={() => setPosition("bottom")}
						className={position === "bottom" ? "border-primary" : ""}
					>
						Bottom
					</Button>
					<Button
						variant="outline"
						onClick={() => setPosition("right")}
						className={position === "right" ? "border-primary" : ""}
					>
						Right
					</Button>
				</div>

				<Drawer direction={position as "top" | "bottom" | "left" | "right"}>
					<DrawerTrigger asChild>
						<Button variant="outline">Open Drawer</Button>
					</DrawerTrigger>
					<DrawerContent>
						<div
							className={`${position === "top" || position === "bottom" ? "max-w-md mx-auto" : "h-full max-h-svh"}`}
						>
							<DrawerHeader>
								<DrawerTitle>Edit profile</DrawerTitle>
								<DrawerDescription>
									Make changes to your profile here. Click save when you're done.
								</DrawerDescription>
							</DrawerHeader>
							<div
								className={`p-4 pb-0 ${position === "left" || position === "right" ? "h-[85%] overflow-y-auto" : ""}`}
							>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Name
										</Label>
										<Input id="name" value="Pedro Duarte" className="col-span-3" />
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-right">
											Username
										</Label>
										<Input id="username" value="@peduarte" className="col-span-3" />
									</div>
								</div>
							</div>
							<DrawerFooter>
								<Button>Save changes</Button>
								<DrawerClose asChild>
									<Button variant="outline">Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</ComponentPage>
	);
}
