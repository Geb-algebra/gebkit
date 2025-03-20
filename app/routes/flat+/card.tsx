import fs from "node:fs";
import path from "node:path";
import { Button } from "~/components/flat/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/flat/card";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/card";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/card.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Card" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<Button variant="outline">Cancel</Button>
						<Button>Submit</Button>
					</CardFooter>
				</Card>

				<Card className="max-w-md">
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>You have 3 unread messages.</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Recent notifications will appear here.</p>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline">Mark all as read</Button>
						<Button>View all</Button>
					</CardFooter>
				</Card>
			</div>
		</ComponentPage>
	);
}
