var React = require("react")

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass
  subClass.__proto__ = superClass
}

var styles = {
  "funnel-pipeline-chart": "_1WnkD",
  "funnel-pipeline-chart-row": "_1JWHC",
  "funnel-pipeline-chart-title": "_3tM6f",
}

var initialState = {}

var FunnelChart = /*#__PURE__*/ (function (_React$Component) {
  _inheritsLoose(FunnelChart, _React$Component)

  function FunnelChart(props) {
    var _this

    _this = _React$Component.call(this, props) || this
    _this.state = initialState
    return _this
  }

  var _proto = FunnelChart.prototype

  _proto.setFunnelRows = function setFunnelRows() {
    var _this2 = this

    var _this$props = this.props,
      data = _this$props.data,
      showNames = _this$props.showNames,
      showValues = _this$props.showValues,
      showRunningTotal = _this$props.showRunningTotal,
      heightRelativeToValue = _this$props.heightRelativeToValue,
      chartHeight = _this$props.chartHeight,
      getRowStyle = _this$props.getRowStyle,
      getRowNameStyle = _this$props.getRowNameStyle,
      getRowValueStyle = _this$props.getRowValueStyle,
      getToolTip = _this$props.getToolTip,
      onRowClick = _this$props.onRowClick
    var rows = []
    var totalValue = this.getTotalValue()
    var sizePerValue = 0

    if (heightRelativeToValue && totalValue > 0) {
      var totalHeight = chartHeight

      if (!totalHeight) {
        totalHeight = 500

        if (window.innerWidth < 500) {
          totalHeight = 300
        }
      }

      sizePerValue = totalHeight / totalValue
    }

    var runningTotal = totalValue

    if (data) {
      var _loop = function _loop() {
        var thisRow = data[i1]
        var showTitle = true
        var showValue = true

        if (thisRow.value > 0) {
          var rowStyle = {}
          var rowTitleStyle = {}
          var rowValueStyle = {}

          if (typeof getRowStyle === "function") {
            rowStyle = getRowStyle(thisRow)
          }

          if (typeof getRowNameStyle === "function") {
            rowTitleStyle = getRowNameStyle(thisRow)
          }

          if (typeof getRowValueStyle === "function") {
            rowValueStyle = getRowValueStyle(thisRow)
          }

          if (heightRelativeToValue) {
            var size = sizePerValue * thisRow.value
            rowStyle.height = size + "px"
            rowStyle.maxHeight = size + "px"

            if (size < 65) {
              showValue = false
            }

            if (size < 40) {
              showTitle = false
            }
          }

          if (thisRow.backgroundColor) {
            rowStyle.backgroundColor = thisRow.backgroundColor
          }

          if (!rowStyle.backgroundColor) {
            rowStyle.backgroundColor =
              _this2.props.pallette[i1 % _this2.props.pallette.length]
          }

          if (!showNames) {
            showTitle = false
          }

          if (!showValues) {
            showValue = false
          }

          var toolTip = thisRow.name + "\n" + runningTotal

          if (typeof getToolTip === "function") {
            toolTip = getToolTip(thisRow)
          }

          if (typeof onRowClick === "function") {
            rowStyle.cursor = "pointer"
          }

          rows.push(
            React.createElement(
              "div",
              {
                key: "funnel-pipeline-chart-row-" + thisRow.name,
                className: styles["funnel-pipeline-chart-row"],
                style: rowStyle,
                title: toolTip,
                onClick:
                  typeof onRowClick === "function"
                    ? function () {
                        return onRowClick(thisRow)
                      }
                    : undefined,
              },
              React.createElement(
                "div",
                null,
                showTitle
                  ? React.createElement(
                      "div",
                      {
                        className: styles["funnel-pipeline-chart-title"],
                        style: rowTitleStyle,
                      },
                      thisRow.name
                    )
                  : null,
                showValue
                  ? React.createElement(
                      "div",
                      {
                        className: styles["funnel-pipeline-chart-value"],
                        style: rowValueStyle,
                      },
                      showRunningTotal
                        ? `$ ${runningTotal}`
                        : `$ ${thisRow.value}`
                    )
                  : null
              )
            )
          )
        }

        runningTotal = runningTotal - thisRow.value
      }

      for (var i1 = 0; i1 < data.length; i1++) {
        _loop()
      }
    }

    return rows
  }

  _proto.getTotalValue = function getTotalValue() {
    var data = this.props.data
    var dataTotal = 0

    if (data) {
      for (var i1 = 0; i1 < data.length; i1++) {
        dataTotal += data[i1].value
      }
    }

    return dataTotal
  }

  _proto.render = function render() {
    var _this$props2 = this.props,
      title = _this$props2.title,
      style = _this$props2.style
    var chartStyles = {}

    if (style) {
      Object.assign(chartStyles, style)
    }

    if (this.props.chartWidth) {
      chartStyles.maxWidth = this.props.chartWidth
    }

    return React.createElement(
      "div",
      {
        className: styles["funnel-pipeline-chart"],
        style: chartStyles,
      },
      title
        ? React.createElement(
            "h2",
            {
              style: {
                marginBottom: "30px",
              },
            },
            title
          )
        : null,
      this.setFunnelRows()
    )
  }

  return FunnelChart
})(React.Component)

FunnelChart.defaultProps = {
  showValues: true,
  showNames: true,
  pallette: ["#f14c14", "#f39c35", "#68BC00", "#1d7b63", "#4e97a8", "#4466a3"],
  showRunningTotal: false,
  heightRelativeToValue: false,
}

exports.FunnelChart = FunnelChart
//# sourceMappingURL=index.js.map
