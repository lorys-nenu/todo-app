"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("./db"));
const bodyParser = __importStar(require("body-parser"));
const express = require('express');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield db.getTasks();
        res.send(tasks);
    }
    catch (err) {
        res.status(500).send({ error: 'Failed to read tasks' });
    }
}));
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.postTask(req.body);
        res.send({ success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to write task' });
    }
}));
app.patch('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.patchTask(req.params.id, req.body);
        res.send({ success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to update task' });
    }
}));
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.deleteTask(req.params.id);
        res.send({ success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to delete task' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
