const mongoose = require("mongoose");
import express from "express";
import { connect } from "http2";

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
const mockListen = jest.fn();
const jsonSpy = jest.fn();
const connectSpy = jest.fn().mockImplementation(() => Promise.resolve());

jest.mock("express", () => {
    return () => ({
        listen: mockListen,
        use: mockUse,
    });
});

express.json = jsonSpy;

mongoose.connect = connectSpy;

describe("should test server configuration", () => {
    it("should run server completely", () => {
        require("./server.ts");
        expect(connectSpy).toHaveBeenCalled();
        expect(mockUse).toHaveBeenCalledWith("/users", undefined);
        expect(mockUse).toHaveBeenCalledWith("/livestocks", undefined);
        expect(mockUse).toHaveBeenCalledWith("/slaughters", undefined);
        expect(mockUse).toHaveBeenCalledWith("/blockchains", undefined);
        expect(mockUse).toHaveBeenCalledWith("/reports", undefined);
        expect(mockListen).toHaveBeenCalled();
    });
});