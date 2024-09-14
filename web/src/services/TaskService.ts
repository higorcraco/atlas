import axios from "axios";
import API_BASE_URL from "../config/ApiConfig";
import { Task } from "../types";

const resource = `${API_BASE_URL}/api/tasks`;

export const findAll = (sort?: string) =>
  axios.get(resource, { params: { sort: sort } });

export const save = (task: Task) => axios.post(resource, task);

export const deleteById = (id: string) => axios.delete(`${resource}/${id}`);
