import { Link } from "react-router";
import { Button as FlatButton } from "~/components/flat/button";
import { Button as NeumorphismButton } from "~/components/neumorphism/button";
import { cn } from "~/utils/css";

export async function loader() {
	console.log("hello from loader");
	return null;
}

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div className={cn("w-full h-full grid grid-flow-col place-content-center gap-8")}>
			<FlatButton type="button" asChild className={cn("w-64 h-24 text-3xl")}>
				<Link to="flat">Flat</Link>
			</FlatButton>
			<NeumorphismButton type="button" asChild className={cn("w-64 h-24 text-3xl")}>
				<Link to="neumorphism">Neumorphism</Link>
			</NeumorphismButton>
		</div>
	);
}
