var React = require("react")
class PostComp extends React.Component {
  render () {
    return (
      <div>
        <div>Title: {this.props.title}</div>
        <div>Published: {this.props.published}</div>
      </div>
    );
  }
}

module.exports = PostComp
