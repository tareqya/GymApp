import MainNavigation from "./src/routes/MainNavigation";
import { AuthContext, ThemeContext } from "./src/context";

export default function App() {
  return (
    <AuthContext.Provider>
      <ThemeContext.Provider>
        <MainNavigation />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
