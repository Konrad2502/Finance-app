import Container from "./components/Container/Container";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview/Overview";
import Transactions from "./pages/Transactions/Transactions";
import Budgets from "./pages/Budgets/Budgets";
import Pots from "./pages/Pots/Pots";
import Bills from "./pages/Bills/Bills";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="pots" element={<Pots />} />
          <Route path="bills" element={<Bills />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
