import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Label } from "~/components/flat/label";
import { Slider } from "~/components/flat/slider";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/slider";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/slider.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-slider"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [volume, setVolume] = React.useState(50);
	const [range, setRange] = React.useState([30, 70]);
	const [temperature, setTemperature] = React.useState(22);

	return (
		<ComponentPage name="Slider" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-10 max-w-xl mx-auto">
				{/* Default Slider */}
				<div className="grid gap-2">
					<h4 className="text-sm font-medium">Default Slider</h4>
					<Slider defaultValue={[33]} max={100} step={1} className="w-full" />
				</div>

				{/* Volume Control */}
				<div className="grid gap-3">
					<div className="flex justify-between">
						<Label htmlFor="volume">Volume: {volume}%</Label>
					</div>
					<Slider
						id="volume"
						value={[volume]}
						max={100}
						step={1}
						className="w-full"
						onValueChange={(value) => setVolume(value[0])}
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>0%</span>
						<span>50%</span>
						<span>100%</span>
					</div>
				</div>

				{/* Range Slider */}
				<div className="grid gap-3">
					<div className="flex justify-between">
						<Label htmlFor="range">
							Range: {range[0]}% - {range[1]}%
						</Label>
					</div>
					<Slider
						id="range"
						value={range}
						max={100}
						step={1}
						className="w-full"
						onValueChange={(value) => setRange([value[0], value[1]])}
					/>
				</div>

				{/* Temperature Control */}
				<div className="grid gap-3">
					<div className="flex justify-between">
						<Label htmlFor="temperature">Temperature: {temperature}°C</Label>
					</div>
					<Slider
						id="temperature"
						value={[temperature]}
						min={16}
						max={32}
						step={0.5}
						className="w-full"
						onValueChange={(value) => setTemperature(value[0])}
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>16°C</span>
						<span>24°C</span>
						<span>32°C</span>
					</div>
				</div>

				{/* Disabled Slider */}
				<div className="grid gap-2">
					<h4 className="text-sm font-medium">Disabled Slider</h4>
					<Slider defaultValue={[50]} max={100} step={1} disabled className="w-full" />
				</div>

				{/* Vertical Slider */}
				<div className="grid gap-2">
					<h4 className="text-sm font-medium">
						Vertical Slider (Note: This uses CSS to make a horizontal slider look vertical)
					</h4>
					<div className="flex items-center justify-center h-48">
						<Slider
							defaultValue={[50]}
							max={100}
							step={1}
							orientation="vertical"
							className="h-full"
						/>
					</div>
				</div>
			</div>
		</ComponentPage>
	);
}
