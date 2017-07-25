(function() {
  var isObject = (obj) => obj !== null && typeof obj === 'object';
  var combineKeys = (...keys) => keys.filter((x) => x).join('.');
  var flattenObjectKeys = (obj, baseKey) =>
    Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      const fullKey = combineKeys(baseKey, key);
      const toExtend = isObject(value) ? flattenObjectKeys(value, fullKey) : { [fullKey]: value };
      return Object.assign(acc, toExtend);
    }, {});

  var processJSON = (json, multiplier) => {
    var flattenedKeys = flattenObjectKeys(json)
    return Object.keys(flattenedKeys).map((key) => {
      const val = flattenedKeys[key]
      const oldLength = val.length
      const newLength = Math.floor(val.length * multiplier)
      return { key, oldLength, newLength }
    })
  }

  var app = new Vue({
    el: '#app',
    data: {
      input: null,
      output: null,
      multiplier: 1.15,
    },
    methods: {
      processJSON: function () {
        if (!this.input) return alert('The input cannot be empty!')
        try {
          this.output = processJSON(JSON.parse(this.input), this.multiplier)
        } catch (error) {
          alert(`
            There was an error!!!
            ${error}
          `)
        }
      }
    }
  })

})()
