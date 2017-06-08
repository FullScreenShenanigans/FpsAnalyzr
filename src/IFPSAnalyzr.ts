/**
 * A Function to generate a current timestamp, such as performance.now.
 */
export interface ITimestampGetter {
    (): number;
}

/**
 * Settings to initialize a new IFPSAnalyzr.
 */
export interface IFPSAnalyzrSettings {
    /**
     * How many FPS measurements to keep at any given time, at most.
     */
    maxKept?: number;

    /**
     * A Function to generate a current timestamp, such as performance.now.
     */
    getTimestamp?: any;
}

/**
 * Storage and analysis for framerate measurements.
 */
export interface IFPSAnalyzr {
    /**
     * Function to generate a current timestamp, commonly performance.now.
     */
    getTimestamp: ITimestampGetter;

    /**
     * Standard public measurement function.
     * Marks the current timestamp as timeCurrent, and adds an FPS measurement
     * if there was a previous timeCurrent.
     *
     * @param [time]   An optional timestamp (by default, getTimestamp() is used).
     */
    measure(time?: number): void;

    /**
     * Adds an FPS measurement to measurements, and increments the associated
     * count variables.
     *
     * @param fps   An FPS calculated as the difference between two timestamps.
     */
    addFPS(fps: number): void;

    /**
     * @returns The number of FPS measurements to keep.
     */
    getMaxKept(): number;

    /**
     * @returns The actual number of FPS measurements currently known.
     */
    getNumRecorded(): number;

    /**
     * @returns The most recent performance.now timestamp.
     */
    getTimeCurrent(): number;

    /**
     * @returns The current position in measurements.
     */
    getTicker(): number;

    /**
     * @param getAll   Whether all measurements should be returned, rather than
     *                 the most recent.
     * @returns The stored FPS measurements.
     */
    getMeasurements(getAll: boolean): number[];

    /**
     * Get function for a copy of the measurements listing, but with the FPS
     * measurements transformed back into time differences
     *
     * @returns A container of the most recent FPS time differences.
     */
    getDifferences(): number[];

    /**
     * @returns The average recorded FPS measurement.
     */
    getAverage(): number;

    /**
     * @returns The median recorded FPS measurement.
     * @remarks This is O(n*log(n)), where n is the size of the history,
     *          as it creates a copy of the history and sorts it.
     */
    getMedian(): number;

    /**
     * @returns Array containing the lowest and highest recorded FPS
     *          measurements, in that order.
     */
    getExtremes(): [number, number];

    /**
     * @returns The range of recorded FPS measurements.
     */
    getRange(): number;
}
