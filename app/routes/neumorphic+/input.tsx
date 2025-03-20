import fs from "node:fs";
import path from "node:path";
import { Input } from "~/components/neumorphic/input";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/input";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/neumorphic/input.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Input" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-6">
				<Input placeholder="Standard input" />
				<Input placeholder="Disabled input" disabled />
				<Input type="password" placeholder="Password input" />
				<Input type="email" placeholder="Email input" />
				<Input type="file" />
				<Input type="number" placeholder="Number input" />
				<Input type="date" />
				<Input type="search" placeholder="Search..." />
			</div>
		</ComponentPage>
	);
}
