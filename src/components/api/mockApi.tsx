import MockAdapter from "axios-mock-adapter";
import api from "./axios";
import { visitors } from "../visitorsList/VisitorsData";

const mock = new MockAdapter(api);

mock.onGet("/api/visitors").reply(200, visitors);
