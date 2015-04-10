module.exports = React.createClass({
  render: function() {
    return (
      <div>
        Am I working? <strong>{this.props.working}</strong>
      </div>
    )
  }
});
