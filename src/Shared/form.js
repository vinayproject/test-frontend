import React from "react";
import { Button, Input, message, Radio } from "antd";
import axios from "../Utils/interceptor";

import "./style.scss";
const { TextArea } = Input;

class Choiceform extends React.Component {
  state = {
    choice0: null,
    choice1: null,
    choice2: null,
    answer: null,
    question: null,
  };

  componentDidMount() {
    let { formData } = this.props;
    if (formData !== null) {
      let _choice = JSON.parse(formData.options);
      this.setState({
        choice0: _choice[0],
        choice1: _choice[1],
        choice2: _choice[2],
        answer: formData.answer,
        question: formData.question,
      });
    }
  }

  onRadioTextChange = (e, a) => {
    if (a === 0) {
      this.setState({
        choice0: {
          id: a,
          name: e.target.value,
        },
      });
    } else if (a === 1) {
      this.setState({
        choice1: {
          id: a,
          name: e.target.value,
        },
      });
    } else if (a === 2) {
      this.setState({
        choice2: {
          id: a,
          name: e.target.value,
        },
      });
    }
  };

  onChoiceSelect = (a) => this.setState({ answer: a.target.value });

  onQuestionChange = (a) => {
    this.setState({ question: a.target.value });
  };

  submit = () => {
    let { question, answer, choice0, choice1, choice2 } = this.state;
    let { formData } = this.props;
    let reqObj = {
      question,
      options: [choice0, choice1, choice2],
      answer,
    };
    console.log(reqObj);
    let flag = reqObj.options.every((i) => i !== null && i.name.length !== 0);
    if (answer !== null && flag) {
      axios
        .post(formData !== null ? `/edit/${formData.id}` : "/save", {
          ...reqObj,
        })
        .then((res) => {
          if (res.data.status === "OK") {
            this.props.updateList(res.data);
            this.props.openModal();
          }
        })
        .catch((rej) => console.log("error", rej));
    } else {
      message.error("Kindly fill all the fields");
    }
  };
  render() {
    let { formData } = this.props;
    return (
      <div className="form-wrapper">
        <TextArea
          rows={4}
          placeholder="Enter the question......."
          onChange={this.onQuestionChange}
          defaultValue={formData !== null ? formData.question : null}
        />
        <div className="radio-section">
          <Radio.Group onChange={this.onChoiceSelect} value={this.state.answer}>
            {formData !== null ? (
              JSON.parse(formData.options).map((i) => (
                <Radio className="radio-button" value={i.id}>
                  <Input
                    defaultValue={i.name}
                    onChange={(e) => this.onRadioTextChange(e, i.id)}
                  />
                </Radio>
              ))
            ) : (
              <>
                <Radio className="radio-button" value={0}>
                  <Input
                    placeholder="choice 1"
                    onChange={(e) => this.onRadioTextChange(e, 0)}
                  />
                </Radio>
                <Radio className="radio-button" value={1}>
                  <Input
                    placeholder="choice 2"
                    onChange={(e) => this.onRadioTextChange(e, 1)}
                  />
                </Radio>
                <Radio className="radio-button" value={2}>
                  <Input
                    placeholder="choice 3"
                    onChange={(e) => this.onRadioTextChange(e, 2)}
                  />
                </Radio>
              </>
            )}
          </Radio.Group>
          <Button style={{ marginTop: "1rem" }} onClick={this.submit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Choiceform;
