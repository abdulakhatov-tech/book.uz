import { Button } from "./components/ui/button";

const App: React.FC = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold underline text-[crimson]">
				Hello world!
			</h1>
			<Button variant="default">Login</Button>
			<Button variant="destructive">Login</Button>
			<Button variant="ghost">Login</Button>
			<Button variant="link">Login</Button>
			<Button variant="outline">Login</Button>
			<Button variant="secondary">Login</Button>
		</div>
	);
};

export default App;
