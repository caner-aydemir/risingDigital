"use client"
import React, {useEffect,useState} from 'react';

import Chart, {Props} from 'react-apexcharts';


const options: Props['options'] = {
    chart:{
        height: 20,
        zoom: {
            enabled: false
        }
    },
    xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    fill: {
        colors: ['#FFFFFF']
    },

    colors:['#000000'],
    dataLabels: {
        enabled: false,
        },
    yaxis: {
        show: true,
        showAlways: false,
        showForNullSeries: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        logBase: 10,
        tickAmount: undefined,
        min: undefined,
        max: undefined,
        stepSize: undefined,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (val) => {
                const yaxis = [1,3,5,10]
                if (yaxis.includes(val) === true)
                        return val + "GB"
                    }
        },


    }


};
const series = [
    {
        name: "GB",
        data: [0.6, 1.3,0.8,1.7,1.5,1.7,1.6, 2.8, 4.7, 10]
    },
];


function Charts() {

    return (

        <div  className="w-full  flex justify-center mx-auto items-center flex-col overflow-hidden border-2  bg-white rounded-2xl p-3">
            <div className=" w-2/3 overflow-hidden object-contain">
                <p className="w-full text-start font-black">Data usage per network</p>
                {typeof window !== "undefined" &&
                    <Chart

                        options={options}
                        series={series}
                        type="area"

                    />
                }

            </div>
        </div>
    );
}

export default Charts;