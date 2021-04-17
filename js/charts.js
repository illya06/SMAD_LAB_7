function buildCharts(id) {
    let ctx = document.getElementById(id);
    let data = {
        labels: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: `f(x) = ${a_1.toFixed(2)}x + ${b_1.toFixed(2)}`,
            function: (x) => a_1 * x + b_1,
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false
        },
        {
            label: `f(у) = ${a_2.toFixed(2)}y + ${b_2.toFixed(2)}`,
            function: (x) => a_2 * x + b_2,
            borderColor: "rgba(153, 102, 255, 1)",
            data: [],
            fill: false
        }]
    }

    Chart.register({
        id: 'a',
        beforeInit: function (chart) {
            let data = chart.config.data;
            for (let i = 0; i < data.datasets.length; i++) {
                for (let j = 0; j < data.labels.length; j++) {
                    let fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    })

    let myBarChart = new Chart(ctx, {
        type: 'line',
        data: data
    })
}