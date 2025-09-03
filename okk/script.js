// Directly embed JSON data here
const data = {
  "keys": {
    "n": 4,
    "k": 3
  },
  "1": {
    "base": "10",
    "value": "4"
  },
  "2": {
    "base": "2",
    "value": "111"
  },
  "3": {
    "base": "10",
    "value": "12"
  },
  "6": {
    "base": "4",
    "value": "213"
  }
};

function baseToDecimal(value, base) {
  return BigInt(parseInt(value, base));
}

function findConstant(points) {
  let c = 0n;
  for (let i = 0; i < points.length; i++) {
    let { x: xi, y: yi } = points[i];
    yi = BigInt(yi);

    let num = 1n, den = 1n;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let { x: xj } = points[j];
        num *= BigInt(-xj);
        den *= BigInt(xi - xj);
      }
    }
    c += yi * (num / den);
  }
  return c;
}

function main() {
  const k = data.keys.k;

  const points = Object.keys(data)
    .filter(key => key !== "keys")
    .slice(0, k) // only first k roots
    .map(key => ({
      x: Number(key),
      y: baseToDecimal(data[key].value, Number(data[key].base))
    }));

  console.log(findConstant(points).toString());
}

main();
