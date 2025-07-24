import { MainProviders } from "./providers";
import { AppRouter } from "./router";

function App() {
  return (
    <MainProviders>
      <AppRouter />
    </MainProviders>
  );
}

export default App;
