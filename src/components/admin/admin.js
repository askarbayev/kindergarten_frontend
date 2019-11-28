import React, { Component } from "react";
import "./style.css";
import { Input, Popover, Button, Icon } from "antd";
import { connect } from "react-redux";
import { graphqlQuery } from "../../actions";
import {
  DOC_CREATE_PENDING,
  DOC_CREATE_SUCCESS,
  DOC_CREATE_FAILURE
} from "../../constants/actionTypes";

const { TextArea } = Input;

class Admin extends Component {
  state = {
    title: null,
    typeTitle: true,
    summary: null,
    typeSummary: false,
    text: null,
    typeText: false,
    sections: []
  };

  docSave = () => {
    console.log("Save", this.state);
    const { title, summary, sections } = this.state;
    let querySections = [];
    for (let section of sections) {
      let querySubSections = [];
      for (let subSection of section.subSections) {
        querySubSections.push({
          title: subSection.title,
          text: subSection.text
        });
      }
      querySections.push({
        title: section.title,
        text: section.text,
        subSections: querySubSections
      });
    }
    const query = `mutation{
            createDoc(input: {
                title:${title},
                summary:${summary},
                sections:${JSON.stringify(querySections)}
            })
        }`;

    this.props.graphqlQuery(
      query,
      DOC_CREATE_PENDING,
      DOC_CREATE_SUCCESS,
      DOC_CREATE_FAILURE
    );
  };

  updateState = (blockType, data, section_num, subSection_num) => {
    let sections = [...this.state.sections];

    if (blockType === "main") {
      this.setState({ ...data });
    } else if (blockType === "section") {
      sections[section_num] = { ...sections[section_num], ...data };
      this.setState({
        sections
      });
    } else if (blockType === "subSection") {
      let section = sections[section_num];
      let subSections = [...section.subSections];
      let subSection = { ...subSections[subSection_num], ...data };
      subSections[subSection_num] = subSection;
      section = { ...section, subSections };
      sections[section_num] = section;
      this.setState({
        sections
      });
    }
  };

  textChange = (
    e,
    blockType,
    actionType,
    textType,
    section_num,
    subSection_num
  ) => {
    let value = e.target.value;

    console.log("Summary", blockType, actionType);
    if (actionType === "change") {
      if (textType === "title") var data = { title: value };
      else if (textType === "text") var data = { text: value };
      else if (textType === "summary") var data = { summary: value };
    } else if (actionType === "finish") {
      if (textType === "title") var data = { typeTitle: false };
      else if (textType === "text") var data = { typeText: false };
      else if (textType === "summary") var data = { typeSummary: false };
    }

    this.updateState(blockType, data, section_num, subSection_num);
  };

  clickAddText = (blockType, section_num, subSection_num) => {
    let data = { typeText: true };
    this.updateState(blockType, data, section_num, subSection_num);
  };

  clickAddSection = () => {
    let sections = [
      ...this.state.sections,
      {
        title: null,
        typeTitle: true,
        text: null,
        typeText: false,
        subSections: []
      }
    ];
    this.setState({
      sections
    });
  };

  clickAddSubSection = section_num => {
    let sections = [...this.state.sections];
    let section = sections[section_num];

    let subSections = [
      ...section.subSections,
      { title: null, typeTitle: true, text: null, typeText: false }
    ];
    sections[section_num] = { ...section, subSections };

    this.setState({ sections });
  };

  clickAddSummary = () => {
    this.setState({ typeSummary: true });
  };

  inputTitle = (title, type, section_num, subSection_num, typeTitle) => {
    console.log("State", this.state);
    if (!typeTitle) return null;
    return (
      <div className="inputElement">
        <Input
          value={title}
          placeholder="Title"
          onChange={e =>
            this.textChange(
              e,
              type,
              "change",
              "title",
              section_num,
              subSection_num
            )
          }
          onPressEnter={e =>
            this.textChange(
              e,
              type,
              "finish",
              "title",
              section_num,
              subSection_num
            )
          }
        />
      </div>
    );
  };

  inputText = (type, section_num, typeText, text, subSection_num) => {
    if (!typeText) return null;
    return (
      <div className="inputElement">
        <TextArea
          rows="4"
          autoSize={true}
          placeholder="add text"
          value={text}
          onChange={e =>
            this.textChange(
              e,
              type,
              "change",
              "text",
              section_num,
              subSection_num
            )
          }
          onPressEnter={e =>
            this.textChange(
              e,
              type,
              "finish",
              "text",
              section_num,
              subSection_num
            )
          }
        />
      </div>
    );
  };

  inputSummary = (blockType, summary, typeSummary) => {
    if (!typeSummary) return null;
    return (
      <div className="inputElement">
        <TextArea
          rows="4"
          autoSize={true}
          placeholder="add summary"
          onChange={e => this.textChange(e, blockType, "change", "summary")}
          onPressEnter={e => this.textChange(e, blockType, "finish", "summary")}
        />
      </div>
    );
  };

  inputSubSection = (section_num, subSection_num) => {
    const { title, typeTitle, text, typeText } = this.state.sections[
      section_num
    ].subSections[subSection_num];
    const { sections } = this.state;

    let section = sections[section_num];
    const toggle_title_wrap = !typeTitle && title ? "toggle-doc-wrap" : "";
    const toggle_text_wrap = !typeText && text ? "toggle-doc-wrap" : "";

    return (
      <div className="sub-section-wrap ">
        Sub Section {subSection_num + 1}
        <div className={`doc-wrap ${toggle_title_wrap}`}>
          {!typeTitle ? <h2>Title: {title}</h2> : null}
          {this.docActions("subSection", "title", section_num, subSection_num)}
        </div>
        {this.inputTitle(
          title,
          "subSection",
          section_num,
          subSection_num,
          typeTitle
        )}
        <div className={`doc-wrap ${toggle_text_wrap}`}>
          {!typeText ? <p>Text: {text}</p> : null}
          {this.docActions("subSection", "text", section_num, subSection_num)}
        </div>
        {this.inputText(
          "subSection",
          section_num,
          typeText,
          text,
          subSection_num
        )}
        <div className="s">
          {this.inputAddContent("subSection", section_num, subSection_num)}
        </div>
      </div>
    );
  };

  inputSection = section_num => {
    const {
      title,
      typeTitle,
      text,
      typeText,
      subSections
    } = this.state.sections[section_num];
    const toggle_title_wrap = !typeTitle && title ? "toggle-doc-wrap" : "";
    const toggle_text_wrap = !typeText && text ? "toggle-doc-wrap" : "";
    console.log("Section Add", typeTitle);
    return (
      <div className="section-wrap" onHover>
        Section {section_num + 1}
        <div className={`doc-wrap ${toggle_title_wrap}`}>
          {!typeTitle ? <h2>Title: {title}</h2> : null}
          {this.docActions("section", "title", section_num)}
        </div>
        {this.inputTitle(title, "section", section_num, null, typeTitle)}
        <div className={`doc-wrap ${toggle_text_wrap}`}>
          {!typeText ? <p>Text: {text}</p> : null}
          {this.docActions("section", "text", section_num)}
        </div>
        {this.inputText("section", section_num, typeText, text)}
        {subSections.map((_, index) =>
          this.inputSubSection(section_num, index)
        )}
        <div className="s">{this.inputAddContent("section", section_num)}</div>
      </div>
    );
  };

  inputAddContent = (type, section_num, subSection_num) => {
    if (type === "main") {
      var select = (
        <div>
          <a className="popoverAdd" onClick={e => this.clickAddText("main")}>
            Text
          </a>
          <br />
          <a className="popoverAdd" onClick={this.clickAddSection}>
            Section
          </a>
          <br />
          <a className="popoverAdd" onClick={this.clickAddSummary}>
            Summary
          </a>
        </div>
      );
    } else if (type === "section") {
      var select = (
        <div>
          <a
            className="popoverAdd"
            onClick={e => this.clickAddText("section", section_num)}
          >
            Text
          </a>
          <br />
          <a
            className="popoverAdd"
            onClick={e => this.clickAddSubSection(section_num)}
          >
            Sub Section
          </a>
          <br />
        </div>
      );
    } else if (type === "subSection") {
      var select = (
        <div>
          <a
            className="popoverAdd"
            onClick={e =>
              this.clickAddText("subSection", section_num, subSection_num)
            }
          >
            Text
          </a>
          <br />
        </div>
      );
    }
    return (
      <Popover content={select} trigger="click">
        <Button type="primary" style={{ borderRadius: "50%" }}>
          <Icon type="plus" />
        </Button>
      </Popover>
    );
  };

  actionClick = (
    blockType,
    actionType,
    textType,
    section_num,
    subSection_num
  ) => {
    if (actionType === "edit") {
      if (textType === "title") var data = { typeTitle: true };
      else if (textType === "text") var data = { typeText: true };
      else if (textType === "summary") var data = { typeSummary: true };
    } else if (actionType === "delete") {
      if (textType === "title") var data = { title: null, typeTitle: true };
      else if (textType === "text") var data = { text: null };
      else if (textType === "summary") var data = { summary: null };
    }

    this.updateState(blockType, data, section_num, subSection_num);
  };

  docActions = (type, textType, section_num, subSection_num) => {
    return (
      <div className="text-actions">
        <Icon
          className="editIcon"
          type="edit"
          onClick={() =>
            this.actionClick(
              type,
              "edit",
              textType,
              section_num,
              subSection_num
            )
          }
        />
        <Icon
          className="deleteIcon"
          type="delete"
          onClick={() =>
            this.actionClick(
              type,
              "delete",
              textType,
              section_num,
              subSection_num
            )
          }
        />
      </div>
    );
  };

  render() {
    console.log("PROPS", this.props);
    const {
      title,
      text,
      sections,
      typeText,
      summary,
      typeSummary,
      typeTitle
    } = this.state;
    const toggle_title_wrap = !typeTitle ? "toggle-doc-wrap" : "";
    const toggle_text_wrap = !typeText && text ? "toggle-doc-wrap" : "";
    const toggle_summary_wrap =
      !typeSummary && summary ? "toggle-doc-wrap" : "";

    return (
      <div className="admin-page">
        <div className="doc-list">Lists</div>
        <div className="centerContent">
          <div className="doc-header">
            <div className="admin-header">
              <Button type="primary" onClick={this.docSave}>
                Save
              </Button>
            </div>
          </div>

          <div className="doc-layout">
            <div className={`doc-wrap ${toggle_title_wrap}`}>
              {!typeTitle ? (
                <h4 className="doc-title">Title: {title}</h4>
              ) : null}
              {this.docActions("main", "title")}
            </div>
            {this.inputTitle(title, "main", null, null, typeTitle)}

            <div className={`doc-wrap ${toggle_text_wrap}`}>
              {!typeText ? <p>Text: {text}</p> : null}
              {this.docActions("main", "text")}
            </div>

            {this.inputText("main", null, typeText, text)}

            {sections.map((_, index) => this.inputSection(index))}

            <div className={`doc-wrap ${toggle_summary_wrap}`}>
              {!typeSummary ? <p>Summary: {summary}</p> : null}
              {this.docActions("main", "summary")}
            </div>
            {this.inputSummary("main", summary, typeSummary)}

            <div className="ds">{this.inputAddContent("main")}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE", state);
  return state;
};

export default connect(
  mapStateToProps,
  { graphqlQuery }
)(Admin);
