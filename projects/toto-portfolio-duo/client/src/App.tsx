/** Constraint Ledger and System Viewer routes: distinct normal and showcase portfolio experiences. */
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
const Home = lazy(() => import("./pages/Home"));
const Showcase = lazy(() => import("./pages/Showcase"));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<main className="route-loading">Loading the system…</main>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/showcase" component={Showcase} />
          <Route component={Home} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}
