import { Col, Row, Button, Space, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { headerText } from "../components/headerSlice";
const { Content } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const onNavigation = (pamas: string) => {
    navigate("/" + pamas);
    dispatch(headerText(pamas));
  };
  return (
    <Content className="content">
      <Row justify="space-between" gutter={{ xs: 4, sm: 4, md: 4, lg: 32 }}>
        <Col>
          <Button className="mainBtn" onClick={() => onNavigation("shape")}>
            <Space direction="vertical" align="start">
              <h4>{t("exTile1")}</h4>
              <p>{t("exTile1Des")}</p>
            </Space>
          </Button>
        </Col>
        <Col>
          <Button className="mainBtn" onClick={() => onNavigation("form")}>
            <Space direction="vertical" align="start">
              <h4>{t("exTile2")}</h4>
              <p>{t("exTile2Des")}</p>
            </Space>
          </Button>
        </Col>
      </Row>
    </Content>
  );
};
export default Home;
