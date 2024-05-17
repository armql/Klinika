import ReactApexChart from "react-apexcharts";
import {HandleMetrics} from "../__dashboard.ts";

function UsersTraffic() {
    const {metricsState} = HandleMetrics();

    const series = metricsState ? [{
        name: "Metrics",
        data: metricsState.map(metric => metric.value)
    }] : [];

    const options = {
        series: series,
        chart: {
            type: 'area' as const,
            stacked: false,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'User Registration Traffic',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [40, 200, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val: number) {
                    return val.toFixed(0);
                },
            },
            title: {
                text: 'Value'
            },
        },
        xaxis: {
            type: 'datetime',
            categories: metricsState ? metricsState.map(metric => new Date(metric.creationDate).toISOString()) : []
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val: number) {
                    return val.toFixed(0)
                }
            }
        }
    };

    return (
        <ReactApexChart options={options} series={series} type="area" height={300}
                        width={600}
        />
    );
}

export default UsersTraffic;