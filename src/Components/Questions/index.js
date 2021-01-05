import React, { Component, useEffect, useState } from "react";
import { Row, Col, Button, Tabs, Radio, Modal, Divider } from "antd";
import ChoiceForm from "./../../Shared/form";

import "./style.scss";
const { TabPane } = Tabs;
const radioStyle = {
  height: "30px",
  lineHeight: "30px",
  backgroundColor: "white",
  width: "100%",
  padding: "1.5rem",
  borderRadius: "1rem",
  margin: "0.5rem",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
};

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isModal: false,
      mode: null,
    };
  }

  nextQuestion = () => this.setState({ count: this.state.count + 1 });
  prevQuestion = () => this.setState({ count: this.state.count - 1 });
  openModal = (a) => {
    this.setState({ isModal: !this.state.isModal, mode: a });
  };
  render() {
    let { data, updateList } = this.props;
    let { count, isModal, mode } = this.state;
    return (
      <div className="question-wrapper">
        {data.length === 0 ? (
          <Button onClick={() => this.openModal("ADD")} type="primary">
            ADD
          </Button>
        ) : (
          <>
            <Row className="question">
              <Row>
                <Col span={4}>
                  <Button
                    disabled={count === 0 ? true : false}
                    onClick={this.prevQuestion}
                    type="primary"
                  >
                    PREVIOUS
                  </Button>
                </Col>
                <Col span={3}>
                  <Button onClick={() => this.openModal("ADD")} type="primary">
                    ADD
                  </Button>
                </Col>
                <Col span={11} style={{ textAlign: "center" }}>
                  <h1>
                    Question No: {count + 1}/{data.length}
                  </h1>
                </Col>
                <Col span={2}>
                  <Button onClick={() => this.openModal("EDIT")} type="primary">
                    Edit
                  </Button>
                </Col>
                <Col span={2}>
                  <Button
                    disabled={data.length === count + 1 ? true : false}
                    onClick={this.nextQuestion}
                    type="primary"
                  >
                    Next
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row style={{ margin: "3rem", textAlign: "center" }}>
                <h1>{data[count].question}</h1>
              </Row>
            </Row>
            <Row className="tab-section">
              <Tabs type="card">
                <TabPane tab="Choice / Options" key="1">
                  <Choice data={data[count]} type="choice" />
                </TabPane>
                <TabPane tab="Answer Keys" key="2">
                  <Choice data={data[count]} type="answer" />
                </TabPane>
              </Tabs>
            </Row>
          </>
        )}
        <Modal
          title="Add / Edit"
          visible={isModal}
          onCancel={this.openModal}
          footer={null}
          destroyOnClose={true}
          width="fit-content"
        >
          <ChoiceForm
            updateList={updateList}
            openModal={this.openModal}
            formData={mode === "EDIT" ? data[count] : null}
          />
        </Modal>
      </div>
    );
  }
}

export default Questions;

const Choice = ({ data, type }) => {
  let [selectedData, setData] = useState(null);
  useEffect(() => {
    if (type === "answer") {
      setData(data.answer);
    }
  }, [type, data.answer]);
  return (
    <Radio.Group onChange={(e) => setData(e.target.value)} value={selectedData}>
      {data &&
        JSON.parse(data.options).map((val) => (
          <Radio style={radioStyle} key={val.id} value={val.id}>
            {val.name}
          </Radio>
        ))}
    </Radio.Group>
  );
};
