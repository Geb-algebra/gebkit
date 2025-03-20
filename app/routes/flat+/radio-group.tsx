import fs from "node:fs";
import path from "node:path";
import { Label } from "~/components/flat/label";
import { RadioGroup, RadioGroupItem } from "~/components/flat/radio-group";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/radio-group";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/radio-group.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-radio-group"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Radio Group" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				<div>
					<h4 className="mb-4 text-sm font-medium">Payment Method</h4>
					<RadioGroup defaultValue="card">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="card" id="card" />
							<Label htmlFor="card">Card</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="paypal" id="paypal" />
							<Label htmlFor="paypal">PayPal</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="apple" id="apple" />
							<Label htmlFor="apple">Apple Pay</Label>
						</div>
					</RadioGroup>
				</div>

				<div>
					<h4 className="mb-4 text-sm font-medium">Delivery Method</h4>
					<RadioGroup defaultValue="express" className="grid grid-cols-3 gap-4">
						<div>
							<RadioGroupItem value="standard" id="standard" className="peer sr-only" />
							<Label
								htmlFor="standard"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<span className="text-sm font-medium">Standard</span>
								<span className="text-sm text-muted-foreground">Free</span>
							</Label>
						</div>
						<div>
							<RadioGroupItem value="express" id="express" className="peer sr-only" />
							<Label
								htmlFor="express"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<span className="text-sm font-medium">Express</span>
								<span className="text-sm text-muted-foreground">$5.99</span>
							</Label>
						</div>
						<div>
							<RadioGroupItem value="next-day" id="next-day" className="peer sr-only" />
							<Label
								htmlFor="next-day"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<span className="text-sm font-medium">Next Day</span>
								<span className="text-sm text-muted-foreground">$12.99</span>
							</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
		</ComponentPage>
	);
}
