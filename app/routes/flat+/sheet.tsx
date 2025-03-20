import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Button } from "~/components/flat/button";
import { Input } from "~/components/flat/input";
import { Label } from "~/components/flat/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/flat/sheet";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/sheet";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/sheet.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-dialog"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [side, setSide] = React.useState<"top" | "right" | "bottom" | "left">("right");

	return (
		<ComponentPage name="Sheet" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-wrap items-center gap-2">
					<Button
						variant="outline"
						onClick={() => setSide("top")}
						className={side === "top" ? "border-primary" : ""}
					>
						Top
					</Button>
					<Button
						variant="outline"
						onClick={() => setSide("right")}
						className={side === "right" ? "border-primary" : ""}
					>
						Right
					</Button>
					<Button
						variant="outline"
						onClick={() => setSide("bottom")}
						className={side === "bottom" ? "border-primary" : ""}
					>
						Bottom
					</Button>
					<Button
						variant="outline"
						onClick={() => setSide("left")}
						className={side === "left" ? "border-primary" : ""}
					>
						Left
					</Button>
				</div>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline">Open {side} sheet</Button>
					</SheetTrigger>
					<SheetContent side={side}>
						<SheetHeader>
							<SheetTitle>Edit profile</SheetTitle>
							<SheetDescription>
								Make changes to your profile here. Click save when you're done.
							</SheetDescription>
						</SheetHeader>
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
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit">Save changes</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</ComponentPage>
	);
}
