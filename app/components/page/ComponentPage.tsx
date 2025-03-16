import { cn } from "~/utils/css";
import { Button } from "../flat/button";
import styles from "./ComponentPage.module.css";

export default function ComponentPage(props: {
	name: string;
	dependencies: string[];
	code: string;
	ArgsSetter: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className={cn(styles.layout, "max-w-3xl mx-auto")}>
			<h1 className={cn(styles.title, "text-4xl font-bold")}>{props.name}</h1>
			<Button variant="outline" className={styles.copyInstallCommand}>
				Copy Dependencies Install Command
			</Button>
			<Button variant="outline" className={styles.copyCode}>
				Copy Code
			</Button>
			<div className={styles.argsSetter}>{props.ArgsSetter}</div>
			<div className={cn(styles.description, "w-full h-fit grid place-items-center")}>
				{props.children}
			</div>
		</div>
	);
}
