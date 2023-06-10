import { Col, Row, Button, Divider, Space, Layout, Tag } from "antd";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

interface Shape {
  order: number;
  shape: string;
}

const MoveShape = () => {
  const shape_ObjArr = [
    { order: 1, shape: "square" },
    { order: 2, shape: "circle" },
    { order: 3, shape: "oval" },
    { order: 4, shape: "trapezoid" },
    { order: 5, shape: "rectangle" },
    { order: 6, shape: "parallelogram" },
  ];

  const [isGrid1OnTop, setGrid1OnTop] = useState(true);
  const [shape, setShape] = useState<Shape[]>(shape_ObjArr);
  useEffect(() => {
    setShape(shape_ObjArr);
  }, []);
  const handleSwitchLayout = () => {
    setGrid1OnTop((prevIsGrid1OnTop) => !prevIsGrid1OnTop);
  };

  const handleMoveLeft = () => {
    setShape((prevShapes) => {
      if (prevShapes.length <= 1) return prevShapes;

      const updatedShapes = [...prevShapes];
      const firstShape = updatedShapes.shift();
      if (firstShape) {
        updatedShapes.push(firstShape);
      }
      return updatedShapes;
    });
  };
  const handleMoveRight = () => {
    setShape((prevShapes) => {
      if (prevShapes.length <= 1) return prevShapes;

      const updatedShapes = [...prevShapes];
      const lastShape = updatedShapes.pop();
      if (lastShape) {
        updatedShapes.unshift(lastShape);
      }
      return updatedShapes;
    });
  };
  const handleSwitchPositions = () => {
    const shuffledItems = [...shape];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [
        shuffledItems[j],
        shuffledItems[i],
      ];
    }
    setShape(shuffledItems);
  };

  const { t, i18n } = useTranslation();

  return (
    <Content className="content">
      <Space size={8}>
        <Button className="btn" onClick={handleMoveLeft}>
          <div className="triangle-left" key={uuidv4()} />
          <Tag color="#6eda78">{t("moveShape")}</Tag>
        </Button>
        <Button className="btnTwo" onClick={handleSwitchLayout}>
          <div className="triangle-up" key={uuidv4()}></div>
          <Tag color="#6eda78">{t("movePosition")}</Tag>

          <div className="triangle-down" key={uuidv4()}></div>
        </Button>
        <Button className="btn" onClick={handleMoveRight}>
          <div className="triangle-right" key={uuidv4()}></div>
          <Tag color="#6eda78">{t("moveShape")}</Tag>
        </Button>
      </Space>
      <Divider></Divider>

      {isGrid1OnTop ? (
        <div>
          <div className="first-grid">
            <Row justify="end" align="bottom" key={uuidv4()} gutter={48}>
              {shape.map((item, index) => {
                if (index <= 2)
                  return (
                    <Col
                      span={3}
                      key={uuidv4()}
                      style={{ marginRight: "0px", marginLeft: "auto" }}
                    >
                      <Button
                        className="btn"
                        onClick={handleSwitchPositions}
                        key={uuidv4()}
                      >
                        <div className={item.shape} key={uuidv4()}></div>
                      </Button>
                    </Col>
                  );
              })}
            </Row>
          </div>
          <span style={{ marginLeft: 8 }}></span>
          <div className="second-grid">
            <Row justify="center" align="bottom" key={uuidv4()} gutter={48}>
              {shape.map((item, index) => {
                if (index >= 3)
                  return (
                    <Col
                      span={3}
                      key={uuidv4()}
                      style={{ marginRight: "auto", marginLeft: "0px" }}
                    >
                      <Button
                        className="btn"
                        onClick={handleSwitchPositions}
                        key={uuidv4()}
                      >
                        <div className={item.shape} key={uuidv4()}></div>
                      </Button>
                    </Col>
                  );
              })}
            </Row>
          </div>
        </div>
      ) : (
        <div>
          <div className="first-grid">
            <Row justify="center" align="bottom" key={uuidv4()} gutter={48}>
              {shape.map((item, index) => {
                if (index >= 3)
                  return (
                    <Col
                      span={3}
                      key={uuidv4()}
                      style={{ marginRight: "auto", marginLeft: "0px" }}
                    >
                      <Button
                        className="btn"
                        onClick={handleSwitchPositions}
                        key={uuidv4()}
                      >
                        <div className={item.shape} key={uuidv4()}></div>
                      </Button>
                    </Col>
                  );
              })}
            </Row>
          </div>
          <span style={{ marginLeft: 8 }}></span>
          <div className="second-grid">
            <Row justify="end" align="bottom" gutter={48}>
              {shape.map((item, index) => {
                if (index <= 2)
                  return (
                    <Col
                      span={3}
                      style={{ marginRight: "0px", marginLeft: "auto" }}
                    >
                      <Button className="btn" onClick={handleSwitchPositions}>
                        <div className={item.shape}></div>
                      </Button>
                    </Col>
                  );
              })}
            </Row>
          </div>
        </div>
      )}
    </Content>
  );
};
export default MoveShape;
