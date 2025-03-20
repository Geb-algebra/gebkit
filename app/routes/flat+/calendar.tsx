import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Calendar } from "~/components/flat/calendar";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/calendar";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/calendar.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["react-day-picker", "date-fns"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<ComponentPage name="Calendar" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex justify-center">
				<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
			</div>
		</ComponentPage>
	);
}
