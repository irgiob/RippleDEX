import * as React from 'react';
interface IFunnelChartProps {
    data: any;
    title?: string;
    showValues: boolean;
    showNames: boolean;
    pallette: string[];
    showRunningTotal: boolean;
    heightRelativeToValue: boolean;
    chartHeight?: number;
    chartWidth?: number;
    style?: any;
    getRowStyle?: (row: any) => any;
    getRowNameStyle?: (row: any) => any;
    getRowValueStyle?: (row: any) => any;
    getToolTip?: (row: any) => string;
    onRowClick?: (row: any) => void;
}
interface IFunnelChartState {
}
declare class FunnelChart extends React.Component<IFunnelChartProps, IFunnelChartState> {
    static defaultProps: {
        showValues: boolean;
        showNames: boolean;
        pallette: string[];
        showRunningTotal: boolean;
        heightRelativeToValue: boolean;
    };
    constructor(props: IFunnelChartProps);
    setFunnelRows(): JSX.Element[];
    getTotalValue(): number;
    render(): JSX.Element;
}
export default FunnelChart;
