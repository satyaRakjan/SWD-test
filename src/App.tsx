import { useEffect } from "react";
import "./translation/i18n";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import MoveShape from "./pages/moveShape";
import Home from "./pages/home";
import FormTable from "./pages/formTable";
import { Routes, Route } from "react-router-dom";
import { Layout, Space } from "antd";
import Header from "./components/Header";
import { headerText } from "./components/headerSlice";
const { Content } = Layout;

// interface LayoutItem {
//   index: number;
//   justify: "start" | "end" | "center" | "space-around" | "space-between";
// }
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBackButton = () => {
      // Perform your desired action when the back button is clicked
      dispatch(headerText("home"));
      console.log("Back button clicked");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", height: "auto" }}
      size={[0, 48]}
    >
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shape" element={<MoveShape />} />
          <Route path="/form" element={<FormTable />} />
        </Routes>
      </Layout>
    </Space>
  );
}

export default App;
