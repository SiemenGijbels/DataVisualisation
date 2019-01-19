var d3;

var naamfilter = "Siemen";

d3.csv("namen_belgie.csv", function (csv_data) {

    var nestedByProvince = d3.nest()
        .key(function (d) {
            return d.provincie;
        })
        .key(function (d) {
            return d.voornaam;
        })
        .rollup(function (v) {
            return d3.sum(v, function (d) {
                return d.hoeveelheid;
            });
        })
        .entries(csv_data)
    ;

    var totalArray = [];

    for (var i = 0; i < nestedByProvince.length; i++) {
        var obj = nestedByProvince[i];
        console.log(obj.key);
        for (var j = 0; j < obj.values.length; j++) {
            if (obj.values[j].key === naamfilter) {
//                                console.log(obj.values[j].key);
                console.log(obj.values[j].value);
                totalArray.push(obj.values[j].value);
            }

        }
    }

    var arraySum = function (arr) {
        return arr.reduce(function (a, b) {
            return a + b;
        }, 0);
    };

    console.log("Totaal aantal " + naamfilter + ": " + arraySum(totalArray));
});
