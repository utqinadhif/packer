var packer = new Packer;
new base2.JSB.RuleList({
  "#form": {
    ondocumentready: function() {
      this.removeClass("disabled");
      output.value = "";
      this.ready()
    },
    ready: function() {
      message.write("ready");
      input.focus()
    }
  },
  "#input": {
    disabled: false,
    spellcheck: false,
  },
  "#output": {
    disabled: false,
    spellcheck: false,
    onfocus: function() {
      this.select()
    }
  },
  "#clear-all": {
    disabled: false,
    onclick: function() {
      input.value = "";
      output.value = "";
      uploadScript.style.display = "";
      loadScript.style.display = "";
      uploadScript.disabled = true;
      saveScript.disabled = false;
      form.ready()
    }
  },
  "#pack-script": {
    disabled: false,
    onclick: function() {
      try {
        output.value = "";
        if (input.value) {
          var a = packer.pack(input.value, base62.checked, shrink.checked);
          output.value = a;
          message.update()
        }
      } catch (error) {
        message.error("error packing script", error)
      } finally {}
    }
  },
  "#load-script": {
    disabled: false,
    onclick: function() {
      uploadScript.style.display = "inline";
      uploadScript.disabled = false;
      this.style.display = "none"
    }
  },
  "#decode-script": {
    onclick: function() {
      try {
        if (input.value) {
          var a = new Date;
          eval("var value=String" + input.value.slice(4));
          var b = new Date;
          output.value = beautify(value);
          message.update("unpacked in " + (b - a) + " milliseconds")
        }
      } catch (error) {
        message.error("error decoding script", error)
      } finally {}
    }
  },
  "#base62,#shrink": {
    disabled: false
  },
  "#message": {
    error: function(a, b) {
      this.write(a + ": " + b.message, "error")
    },
    update: function(a) {
      var b = input.value.length;
      if (!/\r/.test(input.value)) {
        b += match(input.value, /\n/g).length
      }
      var c = output.value.length + "/" + b;
      var d = (output.value.length / b).toFixed(3);
      this.write((a ? a + ", " : "") + format("compression ratio: %1=%2", c, d))
    },
    write: function(a, b) {
      this.innerHTML = a;
      this.className = b || ""
    }
  }
});
if (!(0).toFixed) Number.prototype.toFixed = function(n) {
  var e = Math.pow(10, n);
  var r = String(Math.round(this * e));
  if (r == 0)
    for (var i = 0; i < n; i++) r += "0";
  return r.slice(0, r.length - n) + "." + r.slice(r.length - n)
};
var on_progress = false;

function beautify(a, b) {
  if (on_progress) return;
  on_progress = true;
  var c, opts = {};
  opts.indent_size = 2;
  opts.indent_char = ' ';
  c = js_beautify(a, opts);
  on_progress = false;
  return c
}