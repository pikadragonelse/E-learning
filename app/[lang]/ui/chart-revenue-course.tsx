import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { apiInstance } from "@/plugin/apiInstance";
import { useTokenStore } from "../lib/store/userInfo";
import { RevenueByCourse } from "../lib/model/revenueByCourse";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RevenueCourseInstructorChart {}

const RevenueCourseInstructorChart: React.FC<
    RevenueCourseInstructorChart
> = ({}) => {
    const [data, setData] = useState<RevenueByCourse[]>([]);
    const { userInfo } = useTokenStore();
    const chartData = {
        labels: data.map((item) => item.title),
        datasets: [
            {
                label: "Revenue course",
                data: data.map((item) => item.total_price.toFixed(2)),
                borderColor: "rgba(227, 49, 29, 1)",
                backgroundColor: "rgba(227, 49, 29, 0.2)",
                borderWidth: 1,
                maxBarThickness: 50,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Statistics of the revenue by course",
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value: any) {
                        return new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(value);
                    },
                },
            },
        },
    };

    const getData = () => {
        apiInstance
            .get("statistical/statistical-revenue-by-course", {
                headers: { Authorization: "Bear " + userInfo.accessToken },
                params: {
                    orderPrice: "ASC",
                },
            })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return <Bar data={chartData} options={options} />;
};

export default RevenueCourseInstructorChart;
