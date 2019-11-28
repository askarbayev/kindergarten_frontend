import React, { Component } from "react";
import { Tree, Icon } from "antd";
//import "./style.css";
import { graphqlQuery } from "../../actions";
import { connect } from "react-redux";

import {
  GET_DOCCONTENT_PENDING,
  GET_DOCCONTENT_SUCCESS,
  GET_DOCCONTENT_FAILURE
} from "../../constants/actionTypes";

const { TreeNode } = Tree;

class DocContent extends Component {
  componentDidMount() {
    const query = `{
        getDocContent(docID:"5db51b587f490453fb6c6de9"){
            title
            sections{
                title
                subSections{
                    title
                }
               
            }
        }
    }`;
    this.props.graphqlQuery(
      query,
      GET_DOCCONTENT_PENDING,
      GET_DOCCONTENT_SUCCESS,
      GET_DOCCONTENT_FAILURE
    );
  }
  render() {
    console.log("PROPS", this.props);

    if (!this.props.content) {
      return <div>Loading...</div>;
    }
    const { title, sections } = this.props.content;
    return (
      <div>
        Doc Content
        <Tree showLine defaultExpandedKeys={["0-0-0"]} onSelect={this.onSelect}>
          <TreeNode title={`${title}`} key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
              <TreeNode title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="leaf" key="0-0-1-0" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2">
              <TreeNode title="leaf" key="0-0-2-0" />
              <TreeNode title="leaf" key="0-0-2-1" />
            </TreeNode>
            {sections.map((section, sec_index) => {
              return (
                <TreeNode title={section.title} key={`0-0-${sec_index}`}>
                  {section.subSections.map((subSection, sub_index) => {
                    return (
                      <TreeNode
                        title={subSection.title}
                        key={`0-0-${sec_index}-${sub_index}`}
                      />
                    );
                  })}
                </TreeNode>
              );
            })}
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE", state);
  return {
    content: state.document.data
  };
};

export default connect(
  mapStateToProps,
  { graphqlQuery }
)(DocContent);
