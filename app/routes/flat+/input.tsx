import fs from "node:fs";
import path from "node:path";
import { Input } from "~/components/flat/input";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/input";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/input.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Button" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<Input />
				<Input placeholder="Placeholder" />
				<Input disabled />
				<Input type="password" />
				<Input type="email" />
				<Input type="file" />
			</div>
		</ComponentPage>
	);
}
