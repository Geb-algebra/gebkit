import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Skeleton } from "~/components/flat/skeleton";
import { Switch } from "~/components/flat/switch";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/skeleton";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/skeleton.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [loading, setLoading] = React.useState(true);

	return (
		<ComponentPage name="Skeleton" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				<div className="flex items-center space-x-4 mb-6">
					<Switch id="toggle-loading" checked={loading} onCheckedChange={setLoading} />
					<label htmlFor="toggle-loading" className="text-sm font-medium">
						Show loading state
					</label>
				</div>

				{/* Basic skeleton examples */}
				<div className="grid gap-4">
					<h4 className="text-sm font-medium">Basic Examples</h4>
					<div className="flex flex-col space-y-3">
						<Skeleton className="h-[25px] w-[100px]" />
						<Skeleton className="h-[15px] w-[250px]" />
						<Skeleton className="h-[15px] w-[200px]" />
						<Skeleton className="h-[15px] w-[180px]" />
					</div>
				</div>

				{/* Card skeleton */}
				<div className="grid gap-4">
					<h4 className="text-sm font-medium">Card Skeleton</h4>
					<div className="space-y-2">
						{loading ? (
							<div className="flex flex-col space-y-3">
								<Skeleton className="h-[125px] w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						) : (
							<div className="flex flex-col space-y-3">
								<div className="h-[125px] w-full rounded-xl bg-primary/20 flex items-center justify-center">
									<span className="text-sm">Image Content</span>
								</div>
								<div className="space-y-2">
									<div className="h-4 w-[250px] bg-secondary rounded">Card Title</div>
									<div className="h-4 w-[200px] text-muted-foreground rounded">
										Card Description
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Profile skeleton */}
				<div className="grid gap-4">
					<h4 className="text-sm font-medium">Profile Skeleton</h4>
					<div className="flex items-center space-x-4">
						{loading ? (
							<>
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[150px]" />
									<Skeleton className="h-4 w-[100px]" />
								</div>
							</>
						) : (
							<>
								<div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
									<span className="text-xs">Avatar</span>
								</div>
								<div className="space-y-2">
									<div className="h-4 w-[150px] bg-secondary rounded">John Doe</div>
									<div className="h-4 w-[100px] text-muted-foreground rounded">@johndoe</div>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Table skeleton */}
				<div className="grid gap-4">
					<h4 className="text-sm font-medium">Table Skeleton</h4>
					<div className="rounded-md border">
						<div className="border-b p-4 h-12 flex items-center bg-muted/40">
							{loading ? (
								<div className="flex items-center justify-between w-full">
									<Skeleton className="h-4 w-[100px]" />
									<Skeleton className="h-4 w-[100px]" />
									<Skeleton className="h-4 w-[100px]" />
								</div>
							) : (
								<div className="flex items-center justify-between w-full">
									<div className="font-medium">Name</div>
									<div className="font-medium">Status</div>
									<div className="font-medium">Actions</div>
								</div>
							)}
						</div>
						{loading
							? Array.from({ length: 3 }).map((_, i) => (
									<div key={`row-${i}`} className="p-4 flex items-center justify-between">
										<Skeleton className="h-4 w-[200px]" />
										<Skeleton className="h-4 w-[100px]" />
										<Skeleton className="h-8 w-[80px]" />
									</div>
								))
							: Array.from({ length: 3 }).map((_, i) => (
									<div key={`row-${i}`} className="p-4 flex items-center justify-between">
										<div>User {i + 1}</div>
										<div>Active</div>
										<div className="h-8 w-[80px] bg-primary/20 flex items-center justify-center rounded">
											<span className="text-xs">Button</span>
										</div>
									</div>
								))}
					</div>
				</div>
			</div>
		</ComponentPage>
	);
}
