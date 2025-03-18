import fs from "node:fs";
import path from "node:path";
import { Switch } from "~/components/neumorphic/switch";
import ComponentPage from "~/components/page/ComponentPageNeumo";
import type { Route } from "./+types/switch";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/neumorphic/switch.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-switch"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Switch" dependencies={loaderData.dependencies} code={loaderData.code}>
			<Switch />
		</ComponentPage>
	);
}
