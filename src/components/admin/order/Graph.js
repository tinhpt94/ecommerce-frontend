import React from 'react';


export const CustomizedAxisTick = () => ({
  render () {
    const {x, y, payload, reports} = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={3} textAnchor="end" fill="#666" transform="rotate(-90)"
              className="graph-axis-label">{String(reports[payload.value].report_date).substring(0,5)}</text>
      </g>
    );
  }
});