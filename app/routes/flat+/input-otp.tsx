import fs from "node:fs";
import path from "node:path";
import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/components/flat/input-otp";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/input-otp";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/input-otp.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@hookform/resolvers/zod", "react-hook-form", "zod"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [value, setValue] = React.useState("");

	return (
		<ComponentPage name="Input OTP" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-col items-center gap-8">
				<div>
					<h4 className="mb-2 text-center text-sm font-medium">Numerical input</h4>
					<InputOTP maxLength={6} value={value} onChange={setValue}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<p className="mt-2 text-center text-sm text-muted-foreground">Value: {value || "None"}</p>
				</div>

				<div>
					<h4 className="mb-2 text-center text-sm font-medium">Alphanumeric input</h4>
					<InputOTP pattern="^[a-zA-Z0-9]+$" maxLength={4}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
						</InputOTPGroup>
					</InputOTP>
				</div>

				<div>
					<h4 className="mb-2 text-center text-sm font-medium">Separator</h4>
					<InputOTP maxLength={6}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<span className="mx-2 text-muted-foreground">-</span>
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
				</div>
			</div>
		</ComponentPage>
	);
}
