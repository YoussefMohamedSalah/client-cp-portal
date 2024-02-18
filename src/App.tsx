import { Suspense, lazy } from 'react';

const SessionLayout = lazy(() => import("./layouts/SessionLayout"));

function App() {
  return (
    <div id="mytask-layout" className="theme-indigo">
      <Suspense fallback={null}>
        <SessionLayout />
      </Suspense>
    </div>
  );
}
// comment
export default App;
