import fs from "node:fs";
import path from "node:path";
import { toast } from "sonner";
import { Button } from "~/components/flat/button";
import { Label } from "~/components/flat/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/flat/select";
import { Toaster } from "~/components/flat/sonner";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/sonner";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/sonner.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["sonner"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Sonner" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4 max-w-xl mx-auto">
				<Toaster />

				<div className="grid gap-2">
					<h4 className="text-sm font-medium">Basic Toasts</h4>
					<div className="flex flex-wrap gap-2">
						<Button variant="outline" onClick={() => toast("Default notification")}>
							Default Toast
						</Button>

						<Button
							variant="outline"
							onClick={() =>
								toast.success("Success notification", {
									description: "Your action was completed successfully.",
								})
							}
						>
							Success Toast
						</Button>

						<Button
							variant="outline"
							onClick={() =>
								toast.error("Error notification", {
									description: "Something went wrong.",
								})
							}
						>
							Error Toast
						</Button>

						<Button
							variant="outline"
							onClick={() =>
								toast.info("Info notification", {
									description: "Here's some information you might want to know.",
								})
							}
						>
							Info Toast
						</Button>

						<Button
							variant="outline"
							onClick={() =>
								toast.warning("Warning notification", {
									description: "Please be careful with this action.",
								})
							}
						>
							Warning Toast
						</Button>
					</div>
				</div>

				<div className="grid gap-2">
					<h4 className="text-sm font-medium">Interactive Toasts</h4>
					<div className="flex flex-wrap gap-2">
						<Button
							variant="outline"
							onClick={() => {
								toast("Do you want to continue?", {
									action: {
										label: "Yes",
										onClick: () => toast.success("Action confirmed!"),
									},
									cancel: {
										label: "No",
										onClick: () => toast.error("Action cancelled"),
									},
								});
							}}
						>
							Interactive Toast
						</Button>

						<Button
							variant="outline"
							onClick={() => {
								toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
									loading: "Loading...",
									success: "Promise resolved!",
									error: "Promise rejected!",
								});
							}}
						>
							Promise Toast
						</Button>

						<Button
							variant="outline"
							onClick={() => {
								toast.custom((id) => (
									<div className="p-4 bg-card border rounded-lg shadow-lg">
										<div className="text-sm font-medium mb-2">Custom notification</div>
										<div className="text-sm text-muted-foreground mb-4">
											This is a completely custom notification.
										</div>
										<div className="flex gap-2">
											<Button size="sm" onClick={() => toast.dismiss(id)}>
												Dismiss
											</Button>
											<Button
												size="sm"
												variant="destructive"
												onClick={() => {
													toast.dismiss(id);
													toast.error("Something went wrong!");
												}}
											>
												Error
											</Button>
										</div>
									</div>
								));
							}}
						>
							Custom Toast
						</Button>
					</div>
				</div>

				<div className="grid gap-4 border rounded-lg p-4">
					<h4 className="text-sm font-medium">Toast Position</h4>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="position">Position</Label>
							<Select
								defaultValue="top-right"
								onValueChange={(value) => {
									document
										.querySelector("[data-sonner-toaster]")
										?.setAttribute("data-position", value);
									toast(`Position set to: ${value}`, {
										description: "The position of the toasts will be updated.",
									});
								}}
							>
								<SelectTrigger id="position">
									<SelectValue placeholder="Select a position" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="top-left">Top Left</SelectItem>
									<SelectItem value="top-center">Top Center</SelectItem>
									<SelectItem value="top-right">Top Right</SelectItem>
									<SelectItem value="bottom-left">Bottom Left</SelectItem>
									<SelectItem value="bottom-center">Bottom Center</SelectItem>
									<SelectItem value="bottom-right">Bottom Right</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Button
						onClick={() =>
							toast("This is a notification", {
								description: "This will appear in the selected position.",
							})
						}
					>
						Show Toast
					</Button>
				</div>
			</div>
		</ComponentPage>
	);
}
