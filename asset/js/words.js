var Words = Collection.extend({
  constructor: function(a) {
    this.base();
    forEach(a.match(WORDS), this.add, this);
    this.encode()
  },
  add: function(a) {
    if (!this.has(a)) this.base(a);
    a = this.get(a);
    a.count++;
    return a
  },
  encode: function() {
    this.sort(function(a, b) {
      return b.count - a.count
    });
    eval("var a=62,e=" + Packer.ENCODE62);
    var c = e;
    var d = new Collection;
    var f = this.size();
    for (var i = 0; i < f; i++) {
      d.put(c(i), i)
    }
    var g = function() {
      return ""
    };
    var h = 0;
    forEach(this, function(a) {
      if (d.has(a)) {
        a.index = d.get(a);
        a.toString = g
      } else {
        while (this.has(c(h))) h++;
        a.index = h++
      }
      a.encoded = c(a.index)
    }, this);
    this.sort(function(a, b) {
      return a.index - b.index
    })
  },
  toString: function() {
    return this.getValues().join("|")
  }
}, {
  Item: {
    constructor: function(a) {
      this.toString = function() {
        return a
      }
    },
    count: 0,
    encoded: "",
    index: -1
  }
});