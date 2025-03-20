import fs from "node:fs";
import path from "node:path";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "~/components/neumorphic/select";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/select";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/neumorphic/select.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Select" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-6">
				<div className="flex items-center gap-4">
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="orange">Orange</SelectItem>
							</SelectGroup>
							<SelectSeparator />
							<SelectGroup>
								<SelectLabel>Vegetables</SelectLabel>
								<SelectItem value="carrot">Carrot</SelectItem>
								<SelectItem value="cucumber">Cucumber</SelectItem>
								<SelectItem value="lettuce">Lettuce</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select disabled>
						<SelectTrigger>
							<SelectValue placeholder="Disabled" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Option 1</SelectItem>
							<SelectItem value="2">Option 2</SelectItem>
							<SelectItem value="3">Option 3</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</ComponentPage>
	);
}
