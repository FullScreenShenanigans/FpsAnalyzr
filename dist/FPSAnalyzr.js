define("IFPSAnalyzr", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("FPSAnalyzr", ["require", "exports"], function (require, exports) {
    "use strict";
    var FPSAnalyzr = (function () {
        function FPSAnalyzr(settings) {
            if (settings === void 0) { settings = {}; }
            this.maxKept = settings.maxKept || 35;
            this.numRecorded = 0;
            this.ticker = -1;
            this.measurements = [];
            if (typeof settings.getTimestamp === "undefined") {
                if (typeof performance === "undefined") {
                    this.getTimestamp = function () {
                        return Date.now();
                    };
                }
                else {
                    this.getTimestamp = (performance.now
                        || performance.webkitNow
                        || performance.mozNow
                        || performance.msNow
                        || performance.oNow).bind(performance);
                }
            }
            else {
                this.getTimestamp = settings.getTimestamp;
            }
        }
        FPSAnalyzr.prototype.measure = function (time) {
            if (time === void 0) { time = this.getTimestamp(); }
            if (this.timeCurrent) {
                this.addFPS(1000 / (time - this.timeCurrent));
            }
            this.timeCurrent = time;
        };
        FPSAnalyzr.prototype.addFPS = function (fps) {
            this.ticker = (this.ticker += 1) % this.maxKept;
            this.measurements[this.ticker] = fps;
            this.numRecorded += 1;
        };
        FPSAnalyzr.prototype.getMaxKept = function () {
            return this.maxKept;
        };
        FPSAnalyzr.prototype.getNumRecorded = function () {
            return this.numRecorded;
        };
        FPSAnalyzr.prototype.getTimeCurrent = function () {
            return this.timeCurrent;
        };
        FPSAnalyzr.prototype.getTicker = function () {
            return this.ticker;
        };
        FPSAnalyzr.prototype.getMeasurements = function (getAll) {
            return getAll
                ? this.measurements
                : this.measurements.slice(0, Math.min(this.maxKept, this.numRecorded));
        };
        FPSAnalyzr.prototype.getDifferences = function () {
            var copy = this.getMeasurements();
            for (var i = 0; i < copy.length; i += 1) {
                copy[i] = 1000 / copy[i];
            }
            return copy;
        };
        FPSAnalyzr.prototype.getAverage = function () {
            var max = Math.min(this.maxKept, this.numRecorded);
            var total = 0;
            for (var i = 0; i < max; i += 1) {
                total += this.measurements[i];
            }
            return total / max;
        };
        FPSAnalyzr.prototype.getMedian = function () {
            var copy = this.getMeasurementsSorted();
            var fpsKeptReal = copy.length;
            var fpsKeptHalf = Math.floor(fpsKeptReal / 2);
            if (copy.length % 2 === 0) {
                return copy[fpsKeptHalf];
            }
            else {
                return (copy[fpsKeptHalf - 2] + copy[fpsKeptHalf]) / 2;
            }
        };
        FPSAnalyzr.prototype.getExtremes = function () {
            var max = Math.min(this.maxKept, this.numRecorded);
            var lowest = this.measurements[0];
            var highest = lowest;
            for (var i = 0; i < max; i += 1) {
                var fps = this.measurements[i];
                if (fps > highest) {
                    highest = fps;
                }
                else if (fps < lowest) {
                    lowest = fps;
                }
            }
            return [lowest, highest];
        };
        FPSAnalyzr.prototype.getRange = function () {
            var extremes = this.getExtremes();
            return extremes[1] - extremes[0];
        };
        FPSAnalyzr.prototype.getMeasurementsSorted = function () {
            var copy = this.measurements.slice().sort();
            if (this.numRecorded < this.maxKept) {
                copy.length = this.numRecorded;
            }
            return copy.sort();
        };
        return FPSAnalyzr;
    }());
    exports.FPSAnalyzr = FPSAnalyzr;
});
