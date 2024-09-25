import axios from "axios";
import API_BASE_URL from "../config/ApiConfig";
import { Task } from "../types";

const resource = `${API_BASE_URL}/api/tasks`;

export const findAll = (search?: string, sort?: string) =>
  axios.get(resource, { params: { sort, search } });

export const save = (task: Task) => axios.post(resource, task);

export const deleteById = (id: number) => axios.delete(`${resource}/${id}`);
