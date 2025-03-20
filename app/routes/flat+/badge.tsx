import fs from "node:fs";
import path from "node:path";
import { Badge } from "~/components/flat/badge";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/badge";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/badge.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["class-variance-authority"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Badge" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-wrap gap-2">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="destructive">Destructive</Badge>
			</div>
		</ComponentPage>
	);
}
