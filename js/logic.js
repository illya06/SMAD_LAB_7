

const run = () => {
    x = (document.getElementById('data1').value).split(" ").map(Number).filter(Boolean);
    y = (document.getElementById('data2').value).split(" ").map(Number).filter(Boolean);
    setParameters()
    setChart_1_Params()
    buildCharts("chart_1")
    setChart_2_Params()
    buildCharts("chart_2")

}

const setChart_1_Params = () => {
    let temp = 0

    //for x => y
    let d = x.length * Sum(x, 2) - Math.pow(Sum(x), 2)

    for (let i = 0; i < x.length; i++)
        temp += x[i] * y[i]

    let d_a = Sum(x, 2) * Sum(y) - Sum(x) * temp
    let d_b = temp * x.length - Sum(x) * Sum(y)

    a_1 = d_a / d
    b_1 = d_b / d

    //for y => x
    d_ = y.length * Sum(y, 2) - Math.pow(Sum(y), 2)
    d_a_ = Sum(y, 2) * Sum(x) - Sum(y) * temp
    d_b_ = temp * y.length - Sum(y) * Sum(x)

    a_2 = d_a_ / d_
    b_2 = d_b_ / d_
}

const setChart_2_Params = () => {
    let temp = 0

    //for x => y
    a_1 = Avg(y) - Avg(x) * K / Sx
    b_1 = K / (Sx * Sx)
    
    //for y => x
    a_2 = Avg(x) - Avg(y) * K / Sy
    b_2 = K / (Sy * Sy)

}

const setParameters = () => {
    Sx = calcMidStat(x)
    Sy = calcMidStat(y)
    K = calcKovariation(x, y)
    R = K / (Sx * Sy)

    //print results
    document.getElementById('a_K').innerHTML =
        `<kbd>${K.toFixed(4)}</kbd>`;

    document.getElementById('a_Sx').innerHTML =
        `<kbd>${Sx.toFixed(4)}</kbd>`;

    document.getElementById('a_Sy').innerHTML =
        `<kbd>${Sy.toFixed(4)}</kbd>`;

    document.getElementById('a_r').innerHTML =
        `<kbd>${R.toFixed(4)}</kbd>`;
}



const calcMidStat = (data) => {
    let sum = 0
    let len = data.length
    let avg = Avg(data)
    for (let i = 0; i < len; i++)
        sum += Math.pow(data[i] - avg, 2)

    return Math.sqrt(sum / len)
}

const calcKovariation = (data1, data2) => {
    let sum = 0
    let len = data1.length
    let avg1 = Avg(data1)
    let avg2 = Avg(data2)

    for (let i = 0; i < len; i++)
        sum += Math.pow((data1[i] - avg1) * (data2[i] - avg2), 2)

    return sum / len
}

//helper funcs

const Sum = (data, step = 1) => {
    let ret = 0
    for (let i = 0; i < data.length; i++)
        ret += Math.pow(data[i], step)
    return ret
}

const Avg = (data) => data.reduce((a, b) => a + b) / data.length