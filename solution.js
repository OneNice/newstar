const solution = function(graph, start, finish)  {
    const length = Object.keys(graph).length;
    var mass = [], key = [], coast = [];
    for(let i in graph)
    {
        key.push(i);    //Получили все точки
        mass[key.indexOf(i)] = [];
        coast[key.indexOf(i)] = [0];
    }
    coast[0][1] = [0];
    for(var i in graph)
    {
        for(var y in graph[i])  //составили таблицу смежности
        {
            mass[key.indexOf(i)][key.indexOf(y)] = graph[i][y];
            //mass[key.indexOf(y)][key.indexOf(i)] = graph[i][y];
        }
    }
    var vector= [], vector_buf = [0];
    var min = 999, dist = 999, dist_buf=0;
    help(0, 0);

    function help(i, next) {
        if(i!==(length)) {
            mass[i].forEach(function (val, index) {
                if (index != length ) {
                    if(i!=next) {

                        if(coast[index][0] == 0 || coast[index][0] > coast[i][0] + val) {
                            coast[index][0] = coast[i][0] + val;
                            coast[index][1] = coast[i][1].slice();
                            (coast[index][1]).push(index);
                        }

                            //пред  //новый
                        help(next, index);
                    }
                    else{
                        //console.log("i = " + i + "| index = " + index);
                        help(i, index);
                    }
                }
                //console.log(i + " → " + val + "|" + index);
            });
        }
    }

    //console.log(coast[0][1]);
    console.log(coast);
    //console.log(mass);
    var path_o = [];
    coast[length-1][1].forEach(function (val) {
        path_o.push(key[val]);
    });

    return {
        distance: coast[length-1][0],
        path: path_o
    }
}
