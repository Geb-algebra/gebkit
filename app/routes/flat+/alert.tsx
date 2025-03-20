import fs from "node:fs";
import path from "node:path";
import { Alert, AlertDescription, AlertTitle } from "~/components/flat/alert";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/alert";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/alert.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["class-variance-authority"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Alert" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<Alert>
					<AlertTitle>Default Alert</AlertTitle>
					<AlertDescription>This is a default alert component example.</AlertDescription>
				</Alert>

				<Alert variant="destructive">
					<AlertTitle>Destructive Alert</AlertTitle>
					<AlertDescription>This is a destructive alert component example.</AlertDescription>
				</Alert>
			</div>
		</ComponentPage>
	);
}
