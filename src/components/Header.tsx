import { Layout, Space, Typography, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { language } from "../translation/translationSlice";
const { Header } = Layout;
const { Title } = Typography;
const { Option } = Select;
type SwitchProps = {
  condition: string;
};
const HederCompo = () => {
  const { t, i18n } = useTranslation();
  const getLanguage = useSelector((state: RootState) => state.language.value);
  const dispatch = useDispatch();
  const getHeader = useSelector((state: RootState) => state.header.value);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(language(lng));
  };

  const SwitchConditionRender: React.FC<SwitchProps> = ({ condition }) => {
    switch (condition) {
      case "home":
        return <div></div>;
      case "shape":
        return <div> {t("exTile1Des")}</div>;
      case "form":
        return <div>{t("exTile2Des")}</div>;
      default:
        return <div></div>;
    }
  };

  return (
    <Header className="header">
      <Title level={2}>
        <SwitchConditionRender condition={getHeader} />
      </Title>
      <Select
        value={getLanguage}
        style={{ width: 100 }}
        onChange={changeLanguage}
      >
        <Option value="en">{t("BtnEN")}</Option>
        <Option value="th">{t("BtnTH")}</Option>
      </Select>
    </Header>
  );
};

export default HederCompo;
