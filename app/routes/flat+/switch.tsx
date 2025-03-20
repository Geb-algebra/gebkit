import fs from "node:fs";
import path from "node:path";
import { Switch } from "~/components/flat/switch";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/switch";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/switch.tsx"),
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
			<div className="grid gap-4">
				<div className="flex items-center space-x-2">
					<Switch id="airplane-mode" />
					<label
						htmlFor="airplane-mode"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Airplane Mode
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch id="default-checked" defaultChecked />
					<label
						htmlFor="default-checked"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Default Checked
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch id="disabled-switch" disabled />
					<label
						htmlFor="disabled-switch"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Disabled
					</label>
				</div>
			</div>
		</ComponentPage>
	);
}
