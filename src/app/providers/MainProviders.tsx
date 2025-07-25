import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";

import { store } from "../store";
import { Fallback } from "../../shared";

export const MainProviders = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
};
