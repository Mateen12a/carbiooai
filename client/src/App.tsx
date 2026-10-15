import { Switch, Route, Redirect } from "wouter";
import Maritime from "@/pages/maritime";

// Carbioo AI is now maritime carbon intelligence. The earlier construction-era pages
// (about, pricing, case studies, investor, API, waitlist verification) are retired and
// send visitors to the new home page.
function Router() {
  return (
    <Switch>
      <Route path="/" component={Maritime} />
      <Route path="/about"><Redirect to="/" /></Route>
      <Route path="/investor"><Redirect to="/" /></Route>
      <Route path="/pricing"><Redirect to="/#ratings" /></Route>
      <Route path="/contact"><Redirect to="/#contact" /></Route>
      <Route path="/case-studies"><Redirect to="/" /></Route>
      <Route path="/api"><Redirect to="/" /></Route>
      <Route path="/verify"><Redirect to="/" /></Route>
      <Route><Redirect to="/" /></Route>
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
