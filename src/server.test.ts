const mongoose = require("mongoose");
import e from "express";
import express from "express";

jest.mock("./routers/users", () => {
    return jest.fn(() => undefined);
});

jest.mock("./routers/livestocks", () => {
    return jest.fn(() => undefined);
});

jest.mock("./routers/slaughters", () => {
    return jest.fn(() => undefined);
});

jest.mock("./routers/blockchains", () => {
    return jest.fn(() => undefined);
});

jest.mock("./routers/reports", () => {
    return jest.fn(() => undefined);
});

const mockUse = jest.fn();
const mockListen = jest.fn().mockImplementationOnce((port, cb) => cb(jest.fn()));
const jsonSpy = jest.fn();
const connectSpy = jest.fn().mockImplementation(() => Promise.resolve());
const mOpen = jest.fn().mockImplementation((event, cb) => cb(jest.fn()));

jest.mock("express", () => {
    return () => ({
        listen: mockListen,
        use: mockUse,
    });
});

express.json = jsonSpy;

mongoose.connect = connectSpy;
mongoose.connection.once = mOpen;
process.env.PORT = '';

describe("should test server configuration", () => {
    it("should run server completely", () => {
        require("./server.ts");
        expect(connectSpy).toHaveBeenCalled();
        expect(mOpen).toHaveBeenCalledWith('open', expect.any(Function));
        expect(mockUse).toHaveBeenCalledWith("/users", undefined);
        expect(mockUse).toHaveBeenCalledWith("/livestocks", undefined);
        expect(mockUse).toHaveBeenCalledWith("/slaughters", undefined);
        expect(mockUse).toHaveBeenCalledWith("/blockchains", undefined);
        expect(mockUse).toHaveBeenCalledWith("/reports", undefined);
        if (process.env.PORT !== '') expect(mockListen).toHaveBeenCalledWith(process.env.PORT, expect.any(Function));
        else expect(mockListen).toHaveBeenCalledWith(5000, expect.any(Function));

    });
});