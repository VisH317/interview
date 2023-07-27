export const chartConfig = {
    chart: {
        height: 350,
        type: "line",
    },
    stroke: {
        width: 3,
        curve: "smooth",
    },
    title: {
        text: "Your Scores",
        align: "left",
        style: {
            fontSize: "16px",
            color: "#94a3b8",
            fontWeight: "light",
            fontFamily: "'Inter', sans-serif",
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            gradientToColors: ["#f9a8d4", "#93c5fd"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100],
        },
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        axisTicks: {
            show: true,
            borderType: "solid",
            color: "#64748b",
            height: 6,
            offsetX: 0,
            offsetY: 0,
        },
        axisBorder: {
            show: true,
            color: "#64748b",
            offsetX: 0,
            offsetY: 0,
        },
        title: {
            text: "Score",
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#94a3b8",
                fontSize: "12px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
            },
        },
        labels: {
            show: true,
            align: "right",
            minWidth: 0,
            maxWidth: 160,
            style: {
                colors: ["#64748b"],
                fontSize: "12px",
                fontFamily: "'Inter', sans-serif'",
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            // formatter: (value) => {
            //     return val
            // },
        },
    },
    grid: {
        show: true,
        position: "back", // you can either change hear to disable all grids
        xaxis: {
            lines: {
                show: false, // or just here to disable only x axis grids
            },
        },
        yaxis: {
            lines: {
                show: false, // or just here to disable only y axis
            },
        },
        row: {
            opacity: 0.2,
        },
    },
    markers: {
        size: 0,
        colors: "white",
        hover: {
            size: undefined,
            sizeOffset: 3,
        },
    },
    colors: ["#93c5fd"],
}