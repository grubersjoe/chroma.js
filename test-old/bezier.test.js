require("es6-shim");
const vows = require("vows");
const assert = require("assert");
const chroma = require("../index");

vows
  .describe("Testing bezier interpolation")

  .addBatch({


    "using bezier in a chroma.scale": {
      topic: {
        f: chroma
          .scale(
            chroma.bezier([
              "darkred",
              "orange",
              "snow",
              "lightgreen",
              "royalblue",
            ])
          )
          .domain([0, 1], 5)
          .out("hex"),
      },
      "starts from darkred"(topic) {
        assert.equal(topic.f(0), "#8b0000");
      },
      "ends in royalblue"(topic) {
        assert.equal(topic.f(1), "#4169e1");
      },
      "center is snow"(topic) {
        assert.equal(topic.f(0.5), "#dfcb98");
      },
      "1st quarter"(topic) {
        assert.equal(topic.f(0.25), "#dd8d49");
      },
      "3rd quarter"(topic) {
        assert.equal(topic.f(0.75), "#a7c1bd");
      },
    },
  })
  .export(module);
