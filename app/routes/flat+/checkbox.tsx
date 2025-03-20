import fs from "node:fs";
import path from "node:path";
import { Checkbox } from "~/components/flat/checkbox";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/checkbox";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/checkbox.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-checkbox"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Checkbox" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Accept terms and conditions
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id="disabled" disabled />
					<label
						htmlFor="disabled"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Disabled checkbox
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id="checked" defaultChecked />
					<label
						htmlFor="checked"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Checked by default
					</label>
				</div>
			</div>
		</ComponentPage>
	);
}
