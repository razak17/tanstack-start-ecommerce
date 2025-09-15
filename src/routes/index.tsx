import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <h1 className="font-bold text-3xl underline">Hello world!</h1>
    </div>
  );
}
