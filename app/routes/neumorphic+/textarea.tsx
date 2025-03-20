import fs from "node:fs";
import path from "node:path";
import { Textarea } from "~/components/neumorphic/textarea";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/textarea";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/neumorphic/textarea.tsx"),
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
			<div className="grid gap-6">
				<Textarea placeholder="Type your message here..." />
				<Textarea placeholder="Disabled textarea" disabled />
				<Textarea placeholder="Larger textarea with more rows" className="min-h-32" />
				<Textarea defaultValue="This textarea comes with default content to show how text appears within the neumorphic design" />
			</div>
		</ComponentPage>
	);
}
