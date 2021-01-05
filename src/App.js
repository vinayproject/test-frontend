import React, { Component } from "react";
import Questions from "./Components/Questions";
import axios from "./Utils/interceptor";
import "./style.scss";
import { Spin } from "antd";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      isModal: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get("/").then((res) => {
      if (res.data.status === "OK") {
        this.setState({
          resData: res.data.payLoad,
        });
      }
    });
  };

  updateList = (data) => {
    let { resData } = this.state;
    if (data.msg === "added") {
      resData.push(data.payLoad);
      this.setState({
        resData,
      });
    } else {
      let index = resData.findIndex((i) => data.payLoad.id === i.id);
      if (index !== -1) {
        resData.splice(index, 1, data.payLoad);
        this.setState(resData);
      }
    }
  };

  render() {
    let { resData } = this.state;
    return (
      <div className="home-wrapper">
        <div className="content">
          {resData === null ? (
            <Spin />
          ) : (
            <Questions
              updateList={this.updateList}
              openModal={this.openModal}
              data={resData}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
