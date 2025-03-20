import fs from "node:fs";
import path from "node:path";
import { Textarea } from "~/components/flat/textarea";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/textarea";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/textarea.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Textarea" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<Textarea />
				<Textarea placeholder="Placeholder" />
				<Textarea disabled />
			</div>
		</ComponentPage>
	);
}
