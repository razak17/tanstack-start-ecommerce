import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const routerState = useRouterState();

  const isAuthPage = ["/sign-in", "/sign-up"].includes(
    routerState.location.pathname,
  );

  console.error("DefaultCatchBoundary triggered:", error);
  console.log("Current route:", routerState.location.pathname);
  console.log("Is auth page:", isAuthPage);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            router.invalidate();
          }}
          className={`rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`}
        >
          Try Again
        </button>
        {isAuthPage ? (
          <Link
            to="/"
            className={`rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`}
          >
            Home
          </Link>
        ) : (
          <Link
            to="/shop"
            className={`rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700`}
          >
            Browse Songs
          </Link>
        )}
      </div>
    </div>
  );
}
